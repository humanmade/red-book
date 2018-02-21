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

	/**
	 * Retrieve the markdown source URL for a given post.
	 */
	public function get_markdown_download_source( $source, $post_id ) {
		// Send requests to the GH REST API, with our token.
		$source = preg_replace( '#https?://github\.com/([^/]+/[^/]+)/blob/([^/]+)/(.+)#', 'https://api.github.com/repos/$1/contents/$3?ref=$2', $source );
		$source = add_query_arg( 'access_token', REDBOOK_ACCESS_TOKEN, $source );
		return $source;
	}

	protected function get_markdown_source_headers( $id ) {
		return [
			'Accept' => 'application/vnd.github.v3.raw',
		];
	}

	protected function get_manifest_url() {
		$base = sprintf(
			'https://api.github.com/repos/%s/contents/%s',
			'humanmade/Engineering',
			'bin/manifest.json'
		);
		$url = add_query_arg( [
			'ref'          => 'master',
			'access_token' => REDBOOK_ACCESS_TOKEN,
		], $base );
		return $url;
	}

	protected function get_manifest_headers() {
		return [
			'Accept' => 'application/vnd.github.v3.raw',
		];
	}

	public function get_post_type() {
		return 'page';
	}

	public function init() {
		// add_filter( 'cron_schedules', array( $this, 'filter_cron_schedules' ) );
		// add_action( 'init', array( $this, 'register_cron_jobs' ) );
		// add_action( 'devhub_restapi_import_manifest', array( $this, 'import_manifest' ) );
		// add_action( 'devhub_restapi_import_all_markdown', array( $this, 'import_all_markdown' ) );

		$editor = new Editor( $this );
		$editor->init();
	}

	/**
	 * Filter cron schedules to add a 15 minute schedule, if there isn't one.
	 */
	public function filter_cron_schedules( $schedules ) {
		if ( empty( $schedules['15_minutes'] ) ) {
			$schedules['15_minutes'] = array(
				'interval' => 15 * MINUTE_IN_SECONDS,
				'display'  => '15 minutes'
			);
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
