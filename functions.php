<?php
/**
 * Entrypoint for the theme.
 */

namespace RedBook;

const SCRIPT_ID = 'redbook';

require __DIR__ . '/vendor/react-wp-ssr/namespace.php';

require __DIR__ . '/inc/api/namespace.php';
require __DIR__ . '/inc/assets/namespace.php';
require __DIR__ . '/inc/contents/namespace.php';
require __DIR__ . '/inc/class-array-walker-nav-menu.php';
require __DIR__ . '/inc/namespace.php';

bootstrap();
