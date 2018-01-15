<?php
/**
 * Entrypoint for the theme.
 */

namespace RedBook;

use WP_CLI;
use WP_REST_Posts_Controller;
use WP_REST_Request;
use WP_REST_Server;

function bootstrap() {
	add_action( 'after_setup_theme', __NAMESPACE__ . '\\setup_theme' );
	add_action( 'init', __NAMESPACE__ . '\\register_menus' );
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_assets' );

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
		return sprintf( ' <a href="#%1$s" class="anchor"><span class="octicon-link">#</span></a>', $item->id );
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
}

function get_script_data() {
	return [
		'home'  => home_url(),
		'api'   => rest_url(),
		'posts' => get_post_data(),
		'menus' => [
			'primary' => get_menu_data( 'primary-navigation' ),
		],
		'sections' => get_section_data(),
	];
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

function get_post_data() {
	$query = $GLOBALS['wp_query'];
	$data = [];

	$server = rest_get_server();
	$request = new WP_REST_Request();
	$post_controller = new WP_REST_Posts_Controller( 'post' );
	$page_controller = new WP_REST_Posts_Controller( 'page' );
	foreach ( $query->posts as $post ) {
		switch ( $post->post_type ) {
			case 'post':
				$response = $post_controller->prepare_item_for_response( $post, $request );
				break;

			case 'page':
				$response = $page_controller->prepare_item_for_response( $post, $request );
				break;
		}

		if ( is_wp_error( $response ) || $response->is_error() ) {
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
				'title' => $page->post_title,
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
