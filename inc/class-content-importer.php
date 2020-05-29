<?php

namespace RedBook;

use WordPressdotorg\Markdown\Editor;
use WordPressdotorg\Markdown\Importer;

class Content_Importer extends Importer {
	/**
	 * Singleton instance.
	 *
	 * @var static
	 */
	protected static $instance;

	/**
	 * Get the singleton instance, or create if needed.
	 *
	 * @return static
	 */
	public static function instance() {
		if ( empty( static::$instance ) ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	protected function get_base() {
		return home_url( '/' );
	}

	protected function get_access_token() {
		$access_token = get_theme_mod( 'redbook_access_token' );
		return $access_token ?: null;
	}

	/**
	 * Retrieve the markdown source URL for a given post.
	 */
	public function get_markdown_download_source( $source, $post_id ) {
		// Send requests to the GH REST API, with our token.
		$source = preg_replace( '#https?://github\.com/([^/]+/[^/]+)/blob/([^/]+)/(.+)#', 'https://api.github.com/repos/$1/contents/$3?ref=$2', $source );

		return $source;
	}

	protected function get_markdown_source_headers( $id ) {
		$headers = [
			'Accept' => 'application/vnd.github.v3.raw',
		];
		$token = $this->get_access_token();
		if ( $token ) {
			$headers['Authorization'] = sprintf( 'token %s', $token );
		}
		return $headers;
	}

	protected function get_manifest_url() {
		$url = get_theme_mod( 'redbook_manifest_url' );
		if ( empty( $url ) ) {
			return null;
		}

		return $url;
	}

	protected function get_manifest_headers() {
		$headers = [
			'Accept' => 'application/vnd.github.v3.raw',
		];
		$token = $this->get_access_token();
		if ( $token ) {
			$headers['Authorization'] = sprintf( 'token %s', $token );
		}
		return $headers;
	}

	public function get_post_type() {
		return 'page';
	}

	public function init() {
		$manifest_url = get_theme_mod( 'redbook_manifest_url' );
		if ( empty( $manifest_url ) ) {
			return;
		}

		$has_permalinks = get_option( 'permalink_structure' );
		if ( empty( $has_permalinks ) ) {
			return;
		}

		add_filter( 'cron_schedules', [ $this, 'filter_cron_schedules' ] );
		add_action( 'init', [ $this, 'register_cron_jobs' ] );
		add_action( 'devhub_restapi_import_manifest', [ $this, 'import_manifest' ] );
		add_action( 'devhub_restapi_import_all_markdown', [ $this, 'import_all_markdown' ] );

		$editor = new Editor( $this );
		$editor->init();
	}

	/**
	 * Filter cron schedules to add a 15 minute schedule, if there isn't one.
	 */
	public function filter_cron_schedules( $schedules ) {
		if ( empty( $schedules['15_minutes'] ) ) {
			$schedules['15_minutes'] = [
				'interval' => 15 * MINUTE_IN_SECONDS,
				'display'  => '15 minutes'
			];
		}
		return $schedules;
	}

	public function register_cron_jobs() {
		if ( ! wp_next_scheduled( 'devhub_restapi_import_manifest' ) ) {
			wp_schedule_event( time(), '15_minutes', 'devhub_restapi_import_manifest' );
		}
		if ( ! wp_next_scheduled( 'devhub_restapi_import_all_markdown' ) ) {
			wp_schedule_event( time(), '15_minutes', 'devhub_restapi_import_all_markdown' );
		}
	}
}
