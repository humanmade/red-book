<?php

namespace RedBook;

use WP_CLI;
use WP_CLI_Command;

class CLI_Import extends WP_CLI_Command {
	public function import_manifest() {
		Content_Importer::instance()->import_manifest();
	}

	public function import_content() {
		Content_Importer::instance()->import_all_markdown();
	}

	public function sync( $args ) {
		$id = (int) $args[0];
		$result = Content_Importer::instance()->update_post_from_markdown_source( $id );
		if ( is_wp_error( $result ) ) {
			WP_CLI::error( $result->get_error_message() );
		}

		if ( false === $result ) {
			WP_CLI::log( "No updates for {$id}" );
		} else {
			WP_CLI::log( "Updated {$id} from markdown source" );
		}
	}
}
