<?php
/**
 * Dynamic robots.txt proxy for cPanel
 * Fetches live robots.txt from the CMS API with short cache
 */
header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: public, max-age=60, s-maxage=60');

$apiUrl = 'https://api.bardiaecofriendlyhomestay.com/robots.txt';

$context = stream_context_create([
    'http' => [
        'timeout' => 4,
        'header'  => "User-Agent: Bardia-Frontend-Proxy\r\n"
    ]
]);

$robotsContent = @file_get_contents($apiUrl, false, $context);

if ($robotsContent && strlen(trim($robotsContent)) > 0) {
    echo $robotsContent;
} else {
    echo "User-agent: *\nAllow: /\n\nSitemap: https://www.bardiaecofriendlyhomestay.com/sitemap.xml\n";
}
exit;
