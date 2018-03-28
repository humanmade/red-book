<?php

get_header();

ReactWPSSR\render(
	get_stylesheet_directory(),
	[
		'handle' => \RedBook\SCRIPT_ID,
	]
);

get_footer();
