<?php

/**
 * # API Responses as Feeds result #
 * 
 * Get the "flickr.photos.search" API method as Feeds Result
 * 
 * <https://code.flickr.net/2008/08/25/api-responses-as-feeds/>
 */

$API_KEY = "<change_me>";

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

die($content);


