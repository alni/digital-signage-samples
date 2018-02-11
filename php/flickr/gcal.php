<?php

/**
 * # Flickr API Response as gCal Events List #
 * 
 * Get the "flickr.photos.search" API method as as Google Calendar Event List.
 * 
 * Can be used with software that uses a Google Calendar Event List URL to 
 * provide image gallery (for example with the gCalFlow Image project).
 */

$API_KEY = "<change_me>";

$protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET["URL"])) {

    // Base URL for Feedly API
    $base_url = "https://api.flickr.com/services/";

    $tags = $_GET["TAGS"];
    $params = array(
        'method' => "flickr.photos.search",
        'api_key' => $API_KEY,
        'tags' => $tags,
        'tag_mode' => "all",
        'format' => "json", // As Feeds result
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

    // Call the "flickr.photos.search" API endpoint with the necessary parameters
    $content = file_get_contents($base_url . "?" . http_build_query($params));
    $_content = json_decode($content, True); // Decode as JSON as PHP array

    $items = array(); // the gCal events list
    // Loop through each item returned from Feedly
    foreach ($_content["items"] as $item) {
        $content = ""; // Default content (gCal event description)
        if (isset($item["content"]) && isset($item["content"]["content"])) {
            // If the item has a "content" with "content" then use it as the
            // gCal event description
            $content = $item["content"]["content"];
        } else if (isset($item["summary"]) && isset($item["summary"]["content"])) {
            // Otherwise, if the item as a "summary" with content then use it
            // instead as the gCal event description
            $content = $item["summary"]["content"];
        }
        $updated = null; // Default updated value
        if (isset($item["updated"])) {
            // If the item as an "updated" state, then use it as the
            // updated timestamp
            $updated = $item["updated"];
        } else {
            // Otherwise, use the "published" state as the updated timestamp
            $updated = $item["published"];
        }
        array_push($items, array(
            "summary" => $item["title"], // Use the title as the event summary
            // Format as 8601 date and divide it by 1000 (use seconds)
            "updated" => date("c", $updated / 1000),
            "start" => array(
                // Use the "published" timestamp as the start dateTime and 
                // format as 8601 date and divide it by 1000 (use seconds)
                "dateTime" => date("c", $item["published"] / 1000)
            ),
            "end" => array(
                // Use the "published" timestamp as the end dateTime and format
                // as 8601 date and divide it by 1000 (use seconds)
                "dateTime" => date("c", $item["published"] / 1000)
            ),
            "description" => $content // Use the content/summary
        ));
    }
    $title = $_content["title"]; // Use the Feed title as the default title
    if (isset($_GET["CUSTOM_TITLE"])) {
        // If the "CUSTOM_TITLE" URI query parameter is provided then use it as
        // the title instead
        $title = $_GET["CUSTOM_TITLE"];
    }
    // The Google Calendar Events List array object
    $content2 = array(
        "summary" => $title, // Use the title as the summary
        "updated" => date("c"), // Use the current time as the default
        "items" => $items // Use the items as the Event Items list
    );
    if (isset($_content["updated"])) {
        // If the Feed as an "updated" state then use it as the "updated" state
        // for the gCal Events List object
        $content2["updated"] = date("c", $_content["updated"] / 1000);
    }

    header("Content-Type: application/json; utf-8"); // Use JSON as content type
    $_content2 = json_encode($content2); // Encode the array as a JSON string
    if (isset($_GET["callback"])) {
        // If the "callback" URI query parameter is provided (e.x. by using
        // "jQuery.getJSON()") then add the function name around the JSON string
        $_content2 = $_GET["callback"] . "(" . $_content2 . ")";
    }
    die($_content2); // Return the JSON string
} else {
    header($protocol . ' 405 Method Not Allowed');
}
