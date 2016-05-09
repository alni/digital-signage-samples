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
$API_KEY = "34aad4a5eb747df27233c4cf11665b05";

$protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET["LATITUDE"]) && isset($_GET["LONGITUDE"])) {

    $base_url = "https://api.forecast.io/forecast/";

    $LATITUDE = $_GET["LATITUDE"];
    $LONGITUDE = $_GET["LONGITUDE"];

    $params = array(
        "units" => "auto" // Default units
    );
    if (isset($_GET["UNITS"])) {
        $params["units"] = $_GET["UNITS"];
    }
    if (isset($_GET["LANG"])) {
        $params["lang"] = $_GET["LANG"];
    }
    $url = $base_url . "$API_KEY/$LATITUDE,$LONGITUDE?" . http_build_query($params);

    $content = file_get_contents($url);
    $jsonObj = json_decode($content, true);
    header("Content-Type: text/html; utf-8");
} else {
    header($protocol . ' 405 Method Not Allowed');
    die();
}

?>
<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href='//fonts.googleapis.com/css?family=PT+Sans:400,700' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link href='weather_icons/weather-icons.min.css' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <script src="js/modernizr.js"></script> <!-- Modernizr -->
    <script src="../shared/code.js"></script>
    <title>Weather Forecast</title>
</head>
<body>
<table class="container">

    <caption>Værvarsel</caption>
    <tbody class="daily-forecast">
<?php 
$weekdays_short_num = array(
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
);

$weekdays_long_num = array(
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
);
$weather_icons = array(
    "clear-day" => "wi-day-sunny",
    "clear-night" => "wi-night-clear",
    "rain" => "wi-rain",
    "snow" => "wi-snow",
    "sleet" => "wi-hail",
    "wind" => "wi-windy",
    "fog" => "wi-fog",
    "cloudy" => "wi-cloudy",
    "partly-cloudy-day" => "wi-day-cloudy",
    "partly-cloudy-night" => "wi-night-partly-cloudy"
);
for ($i = 0; $i < 7; $i++) {
    $dayData = $jsonObj["daily"]["data"][$i];
    $classes = "day";
    if ($i == 0) {
        $classes = "$classes currentDay";
    }
    $wicon = $weather_icons[$dayData["icon"]];
    $dw = date( "w", $dayData["time"]);

    $dw_short = $weekdays_short_num[$dw];
    $dw_long = $weekdays_long_num[$dw];
    $temperatureMaxFloor = floor($dayData["temperatureMax"]);
    $summary = $dayData["summary"];
?>
        <tr class="<?php echo $classes ?>">
            <td class="weekday"><?php echo $dw_long ?></td>
            <td class="weekday-short"><?php echo $dw_short ?></td>
            <td class="day-icon"><i class="wi <?php echo $wicon ?>"></i></td>
            <td class="maxTemp"><span class="temp"><?php echo $temperatureMaxFloor ?></span>°<span class="unitTemp">[temperatureUnit]</span></td>
            <td class="desc"><?php echo $summary ?></td>
        </tr>
    <?php }?>
</tbody>
    <tfoot>
        <tr>
            <td colspan="5" class="powered-by">Powered by Forecast.</td>
        </tr>
    </tfoot>
</table>
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script>
    // Override forecast weekday names
    // can be used as a simple client-side translation when date
    // internationalization is not available on the server (for example when 
    // the "php5-intl" package is not available or cannot be installed)
    var weekdays = {
        "Sun": "søn",
        "Mon": "man",
        "Tue": "tirs",
        "Wed": "ons",
        "Thu": "tors",
        "Fri": "fre",
        "Sat": "lør",

        "Sunday": "søndag",
        "Monday": "mandag",
        "Tuesday": "tirsdag",
        "Wednesday": "onsdag",
        "Thursday": "torsdag",
        "Friday": "fredag",
        "Saturday": "lørdag"
    };

    // Loop through all elements with "weekday" or "weekday-short" classes
    $(".weekday, .weekday-short").each(function () {
        // Replace the text with the override from the "weekdays" above
        $(this).text(weekdays[$(this).text()]);
    });
    
</script>
</body>
</html>