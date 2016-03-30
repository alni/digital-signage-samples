<?php

/**
 * # API Responses as Feeds result #
 * 
 * Get the "flickr.photos.search" API method as Feeds Result
 * 
 * Can be used with software that uses a Media Feed to provide an image gallery
 * and/or an image slideshow (for example the Xibo Ticker Module)
 * 
 * Original example from:
 * <https://code.flickr.net/2008/08/25/api-responses-as-feeds/>
 */

$API_KEY = "<change_me>";

$protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET["TAGS"])) {

    $base_url = "https://api.flickr.com/services/";

    $tags = $_GET["TAGS"];

    $params = array(
        'method' => "flickr.photos.search",
        'api_key' => $API_KEY,
        'tags' => $tags,
        'tag_mode' => "all",
        'format' => "feed-atom_10", // As Feeds result
        'content_type' => '1', // photos only
        'media' => 'photos', // Do not include videos
        'license' => join(",", array( // Commercial use allowed
            4, // Attribution License
            5, // Attribution-ShareAlike License
            6, // Attribution-NoDerivs License
            9, // Public Domain Dedication (CC0)
            10 // Public Domain Mark
        )),
        'sort' => "date-posted-desc",
        'extras' => "owner_name,date_taken"
    );

    $content = file_get_contents($base_url . "rest/?" . http_build_query($params));
    header("Content-Type: text/xml; utf-8");
    die($content);
} else {
    header($protocol . ' 405 Method Not Allowed');
}
