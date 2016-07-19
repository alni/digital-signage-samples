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

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET["URL"])) {

    $base_url = "http://cloud.feedly.com/";

    $url = $_GET["URL"];
    $count = 10;
    if (isset($_GET["COUNT"])) {
        $count = intval($_GET["COUNT"]);
    }

    $params = array(
        'streamId' => "feed/$url",
        //'api_key' => $API_KEY,
        'count' => $count
    );

    $content = file_get_contents($base_url . "v3/streams/contents?" . http_build_query($params));
    $_content = json_decode($content, True);

    $items = array();
    foreach ($_content["items"] as $item) {
        $content = "";
        if (isset($item["content"]) && isset($item["content"]["content"])) {
            $content = $item["content"]["content"];
        } else if (isset($item["summary"]) && isset($item["summary"]["content"])) {
            $content = $item["summary"]["content"];
        }
        $updated = null;
        if (isset($item["updated"])) {
            $updated = $item["updated"];
        } else {
            $updated = $item["published"];
        }
        array_push($items, array(
            "summary" => $item["title"],
            "updated" => date("c", $updated),
            "start" => array(
                "dateTime" => date("c", $item["published"])
            ),
            "description" => $content
        ));
    }
    $title = $_content["title"];
    if (isset($_GET["CUSTOM_TITLE"])) {
        $title = $_GET["CUSTOM_TITLE"];
    }
    $content2 = array(
        "summary" => $title,
        "updated" => date("c", $_content["updated"]),
        "items" => $items
    );

    header("Content-Type: application/json; utf-8");
    $_content2 = json_encode($content2);
    if (isset($_GET["callback"])) {
        $_content2 = $_GET["callback"] . "(" . $_content2 . ")";
    }
    die($_content2);
} else {
    header($protocol . ' 405 Method Not Allowed');
}
