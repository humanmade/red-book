<?php
/**
 * Entrypoint for the theme.
 */

namespace RedBook;

use REST_Sessions\Session_Controller;
use WP_CLI;
use WP_Customize_Image_Control;
use WP_REST_Attachments_Controller;
use WP_REST_Posts_Controller;
use WP_REST_Request;
use WP_REST_Server;

function bootstrap() {
	add_action( 'after_setup_theme', __NAMESPACE__ . '\\setup_theme' );
	add_action( 'init', __NAMESPACE__ . '\\register_menus' );
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_assets' );
	add_action( 'customize_register', __NAMESPACE__ . '\\register_customizer_controls' );

	API\bootstrap();
	Contents\bootstrap();

	if ( class_exists( '\\WordPressdotorg\Markdown\Importer' ) ) {
		require __DIR__ . '/class-content-importer.php';
		Content_Importer::instance()->init();
	}

	if ( defined( 'WP_CLI' ) ) {
		require __DIR__ . '/class-cli-import.php';
		WP_CLI::add_command( 'redbook', __NAMESPACE__ . '\\CLI_Import' );
	}

	add_filter( 'redbook.contents.anchor_html', function ( $anchor, $item ) {
		return sprintf(
			' <a href="#%1$s" class="anchor"><span aria-hidden="true">#</span><span class="screen-reader-text">%2$s</span></a>',
			$item->id,
			esc_html( $item->title )
		);
	}, 10, 2 );

	add_filter( 'the_content', function ( $content ) {
		$searcher = "\n<hr />\n\n<ul>\n<li>.+\n{:toc}</li>\n</ul>\n\n<hr />\n";
		if ( preg_match( '#' . $searcher . '#', $content ) === false ) {
			var_dump( $content );
			exit;
			return $content;
		}

		$content = preg_replace( '#' . $searcher . '#', '', $content );
		return $content;
	}, 0 );
}

function setup_theme() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
}

function enqueue_assets() {
	wp_register_script(
		'redbook-typekit',
		'https://use.typekit.net/qly7hgx.js'
	);
	wp_add_inline_script(
		'redbook-typekit',
		'try{Typekit.load({ async: true });}catch(e){}'
	);

	$deps = [
		'redbook-typekit',
	];

	Assets\enqueue_assets( get_stylesheet_directory(), [
		'handle'  => SCRIPT_ID,
		'scripts' => $deps,
	] );
	wp_localize_script( SCRIPT_ID, 'RedBookData', get_script_data() );
}

function register_menus() {
	register_nav_menu(
		'primary-navigation',
		'Primary (Header) Navigation'
	);
	register_nav_menu(
		'handbooks',
		'Handbook Links (Footer)'
	);
	register_nav_menu(
		'documentation',
		'Documentation Links (Footer)'
	);
}

function get_script_data() {
	global $wp_query;
	$has_sessions = class_exists( '\\REST_Sessions\\Session_Controller' );
	$current_path = trim( explode( '?', $_SERVER['REQUEST_URI'] )[0], '/' );

	return [
		'home'  => home_url(),
		'name'  => get_bloginfo( 'name' ),
		'api'   => rest_url(),
		'nonce' => wp_create_nonce( 'wp_rest' ),
		'auth_nonce' => $has_sessions ? Session_Controller::get_nonce() : null,
		'home_page' => get_home_page_data(),
		'pages' => get_type_data( $current_path, new WP_REST_Posts_Controller( 'page' ), $wp_query ),
		'menus' => [
			'primary' => get_menu_data( 'primary-navigation' ),
			'handbooks' => get_menu_data( 'handbooks' ),
			'documentation' => get_menu_data( 'documentation' ),
		],
		'sections' => get_section_data(),
		'user'     => get_user_data(),
	];
}

function get_home_page_data() {
	$data = [
		'id' => (int) get_option( 'page_on_front' ),
		'hero' => [
			'image' => null,
			'title' => get_theme_mod( 'redbook_home_hero_title', null ),
			'title_with_logo' => get_theme_mod( 'redbook_home_hero_title_with_logo', false ),
			'text' => get_theme_mod( 'redbook_home_hero_text', null ),
		],
	];

	$hero_image_url = get_theme_mod( 'redbook_home_hero_image', null );
	if ( ! $hero_image_url ) {
		return $data;
	}


	$hero_image = attachment_url_to_postid( $hero_image_url );
	if ( empty( $hero_image ) ) {
		return $data;
	}

	$post = get_post( $hero_image );
	$controller = new WP_REST_Attachments_Controller( 'attachment' );
	$request = new WP_REST_Request();
	$response = $controller->prepare_item_for_response( $post, $request );

	if ( ! $response || is_wp_error( $response ) || $response->is_error() ) {
		return $data;
	}

	$data['hero']['image'] = rest_get_server()->response_to_data( $response, false );
	return $data;
}

function get_menu_data( $location ) {
	$locations = get_nav_menu_locations();
	if ( ! isset( $locations[ $location ] ) ) {
		return null;
	}

	$items = wp_get_nav_menu_items( $locations[ $location ] );

	// Walk and get a threaded array.
	$walker = new Array_Walker_Nav_Menu();
	$threaded = $walker->walk( $items, 0, [] );
	if ( empty( $threaded ) ) {
		return null;
	}

	// Build data to pass back.
	$format_item = function ( $item ) use ( &$format_item ) {
		$data = [
			'id'    => $item['id'],
			'title' => $item['title'],
			'href'  => $item['url'],
			'items' => [],
		];
		if ( ! empty( $item['children'] ) ) {
			$data['items'] = array_map( $format_item, $item['children'] );
		}
		return $data;
	};
	$data = array_map( $format_item, $threaded );
	return $data;
}

function get_type_data( $archive_id, $controller, $query ) {
	$data = [
		'archives' => [],
		'posts'    => get_post_data( $controller, $query ),
	];
	$data['archives'][ $archive_id ] = wp_list_pluck( $data['posts'], 'id' );
	return $data;
}

function get_post_data( $controller, $query ) {
	$schema = $controller->get_item_schema();
	$post_type = $schema['title'];

	$data = [];

	$server = rest_get_server();
	$request = new WP_REST_Request();
	foreach ( $query->posts as $post ) {
		if ( $post->post_type !== $post_type ) {
			continue;
		}

		$response = $controller->prepare_item_for_response( $post, $request );

		if ( ! $response || is_wp_error( $response ) || $response->is_error() ) {
			continue;
		}

		$data[] = $server->response_to_data( $response, false );
	}

	return $data;
}

function get_section_data() {
	$pages = get_pages( [
		'sort_column'  => 'menu_order,post_title',
	] );
	if ( empty( $pages ) ) {
		return [];
	}

	$children = [];
	foreach ( (array) $pages as $p ) {
		$parent_id = intval( $p->post_parent );
		$children[ $parent_id ][] = $p;
	}
	$build_children = function ( $parent ) use ( $children, &$build_children ) {
		$data = [];
		foreach ( $children[ $parent ] as $page ) {
			if ( $page->post_name === '_content' ) {
				continue;
			}

			$item = [
				'id'    => $page->ID,
				'title' => html_entity_decode( $page->post_title ),
				'href'  => get_permalink( $page ),
			];
			if ( isset( $children[ $page->ID ] ) ) {
				$item['items'] = $build_children( $page->ID );
			}
			$data[] = $item;
		}
		return $data;
	};
	return $build_children( 0 );
}

function get_user_data() {
	$server = rest_get_server();
	$request = new WP_REST_Request( 'GET', '/wp/v2/users/me' );
	$response = rest_do_request( $request );
	if ( is_wp_error( $response ) || $response->is_error() ) {
		return null;
	}
	return $server->response_to_data( $response, false );
}

function register_customizer_controls() {
	global $wp_customize;
	// Settings.
	$wp_customize->add_setting( 'redbook_manifest_url', [
		'type'       => 'theme_mod',
		'capability' => 'edit_theme_options',
	] );
	$wp_customize->add_setting( 'redbook_access_token', [
		'type'       => 'theme_mod',
		'capability' => 'edit_theme_options',
	] );
	$wp_customize->add_setting( 'redbook_home_hero_image', [
		'type'       => 'theme_mod',
		'capability' => 'edit_theme_options',
	] );
	$wp_customize->add_setting( 'redbook_home_hero_title', [
		'type'       => 'theme_mod',
		'capability' => 'edit_theme_options',
	] );
	$wp_customize->add_setting( 'redbook_home_hero_title_with_logo', [
		'type'       => 'theme_mod',
		'capability' => 'edit_theme_options',
	] );
	$wp_customize->add_setting( 'redbook_home_hero_text', [
		'type'       => 'theme_mod',
		'capability' => 'edit_theme_options',
	] );

	// Controls.
	$wp_customize->add_section( 'redbook', array(
		'title'      => 'Red Book Settings',
		'capability' => 'edit_theme_options',
	) );
	$wp_customize->add_control( 'redbook_manifest_url', [
		'type'        => 'url',
		'section'     => 'redbook',
		'label'       => 'Manifest URL',
		'description' => 'URL for the Markdown JSON manifest.',
		'input_attrs' => [
			'placeholder' => 'https://api.github.com/repos/humanmade/Engineering/contents/bin/manifest.json',
		],
	] );
	$wp_customize->add_control( 'redbook_access_token', [
		'type'        => 'text',
		'section'     => 'redbook',
		'label'       => 'Access Token',
		'description' => 'GitHub personal access token (for private repositories)',
	] );

	// Homepage Hero Controls.
	$wp_customize->add_control( new WP_Customize_Image_Control(
		$wp_customize,
		'redbook_home_hero_image',
		[
			'section'     => 'static_front_page',
			'label'       => 'Hero Image',
			'description' => 'Image to display in the background of the hero',
		]
	) );
	$wp_customize->add_control( 'redbook_home_hero_title', [
		'type'        => 'text',
		'section'     => 'static_front_page',
		'label'       => 'Hero Title',
		'description' => 'Title to display in the homepage hero',
	] );
	$wp_customize->add_control( 'redbook_home_hero_title_with_logo', [
		'type'        => 'checkbox',
		'section'     => 'static_front_page',
		'label'       => 'Show logo before hero title?',
	] );
	$wp_customize->add_control( 'redbook_home_hero_text', [
		'type'        => 'textarea',
		'section'     => 'static_front_page',
		'label'       => 'Hero Text',
		'description' => 'Text to display in the homepage hero',
	] );
}
