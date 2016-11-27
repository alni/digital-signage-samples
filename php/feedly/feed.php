<?php

/**
 * # RSS Feed as Feedly Stream Content #
 * 
 * Get RSS Feed from the Feedly Stream Content API method.
 * 
 */

$API_KEY = "<change_me>";


function safeHtml($text) {
    return strip_tags($text, "<b><strong><i><em><small><mark><del><ins><sub><sup>");
}


$protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET["URL"])) {

    // Base URL for Feedly API
    $base_url = "http://cloud.feedly.com/";

    $url = $_GET["URL"]; // The URL path to the RSS Feed
    $count = 10; // Default number of entries to return from Feedly
    if (isset($_GET["COUNT"])) {
        // If the "COUNT" URI query parameter is set, use it as the number of
        // entries to return from Feedly
        $count = intval($_GET["COUNT"]);
    }

    $safeHtml = FALSE;
    if (isset($_GET["SAFE_HTML"])) {
        $safeHtml = TRUE;
    }

    // The URI query parameters to include with the request to Feedly
    $params = array(
        'streamId' => "feed/$url",
        //'api_key' => $API_KEY,
        'count' => $count
    );

    // Call the Feedly Stream Content API endpoint with the necessary parameters
    $content = file_get_contents($base_url . "v3/streams/contents?" . http_build_query($params));
    //$_content = json_decode($content, True); // Decode as JSON as PHP array

    //$items = array(); // the gCal events list
    // Loop through each item returned from Feedly
    /*foreach ($_content["items"] as $item) {
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
        if ($safeHtml) {
            $content = safeHtml($content);
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
    }*/
    /*$title = $_content["title"]; // Use the Feed title as the default title
    if (isset($_GET["CUSTOM_TITLE"])) {
        // If the "CUSTOM_TITLE" URI query parameter is provided then use it as
        // the title instead
        $title = $_GET["CUSTOM_TITLE"];
    }*/
    // The Google Calendar Events List array object
    /*$content2 = array(
        "summary" => $title, // Use the title as the summary
        "updated" => date("c"), // Use the current time as the default
        "items" => $items // Use the items as the Event Items list
    );*/
    /*if (isset($_content["updated"])) {
        // If the Feed as an "updated" state then use it as the "updated" state
        // for the gCal Events List object
        $content2["updated"] = date("c", $_content["updated"] / 1000);
    }*/

    header("Content-Type: application/json; utf-8"); // Use JSON as content type
    //$_content2 = json_encode($content2); // Encode the array as a JSON string
    if (isset($_GET["callback"])) {
        // If the "callback" URI query parameter is provided (e.x. by using
        // "jQuery.getJSON()") then add the function name around the JSON string
        //$_content2 = $_GET["callback"] . "(" . $_content2 . ")";
        $content = $_GET["callback"] . "(" . $content . ")";
    }
    die($content); // Return the JSON string
    //die($_content2); // Return the JSON string
} else {
    header($protocol . ' 405 Method Not Allowed');
}
