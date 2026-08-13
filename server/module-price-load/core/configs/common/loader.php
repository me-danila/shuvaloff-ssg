<?php declare(strict_types=1);

/* undefined curl const */

if (!defined('CURLMOPT_MAX_HOST_CONNECTIONS')) {
    define('CURLMOPT_MAX_HOST_CONNECTIONS', 7);
}

if (!defined('CURLMOPT_MAX_TOTAL_CONNECTIONS')) {
    define('CURLMOPT_MAX_TOTAL_CONNECTIONS', 13);
}

if (!defined('CURLOPT_PIPEWAIT')) {
    define('CURLOPT_PIPEWAIT', 237);
}
