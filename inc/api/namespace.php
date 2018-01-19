<?php

namespace RedBook\API;

use WP_Post;
use WP_REST_Response;

const LINK_NAMESPACE = 'https://redbook.hm';

function bootstrap() {
	add_filter( 'rest_response_link_curies', __NAMESPACE__ . '\\register_curie' );
	add_filter( 'rest_prepare_page', __NAMESPACE__ . '\\add_links', 10, 2 );
}

function register_curie( $curies ) {
	$curies[] = [
		'name'      => 'redbook',
		'href'      => LINK_NAMESPACE . '/{rel}',
		'templated' => true,
	];
	return $curies;
}

function add_links( WP_REST_Response $response, WP_Post $post ) {
	if ( current_user_can( 'edit_post', $post->ID ) ) {
		$response->add_link( LINK_NAMESPACE . '/edit', get_edit_post_link( $post ) );
	}

	return $response;
}
