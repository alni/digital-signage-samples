<?php

/**
 * # Weather Forecast #
 * 
 * Displays weather forecast page with data powered by Forecast.io.
 */

$API_KEY = "<change_me>";

$LANG = "en";
$TITLE = "Weather Forecast";

$TITLES = array(
    "en" => "Weather Forecast",
    "nb" => "Værvarsel"
);

$protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET["LATITUDE"]) && isset($_GET["LONGITUDE"])) {
    // Check the API Key is not defined or is still set to the default value
    if (!isset($API_KEY) || $API_KEY == "<change_me>") {
        // If so, the URI query parameter "API_KEY" *must* provide a valid
        // Forecast API Key
        if (isset($_GET["API_KEY"])) {
            // Set $API_KEY to the provided value
            $API_KEY = $_GET["API_KEY"];
        } else {
            // Otherwise return a '405' HTTP Status Code and return early from
            // the execution
            header($protocol . ' 405 Method Not Allowed');
            die('<h1>405 Method Not Allowed</h1>');
        }
    }
    $base_url = "https://api.forecast.io/forecast/";

    $LATITUDE = $_GET["LATITUDE"];
    $LONGITUDE = $_GET["LONGITUDE"];

    $containerClasses = "container";
    if (isset($_GET["THEME"])) {
        $containerClasses = $containerClasses . " theme-" . $_GET["THEME"];
    }

    $params = array(
        "units" => "auto" // Default units
    );
    if (isset($_GET["UNITS"])) {
        $params["units"] = $_GET["UNITS"];
    }
    if (isset($_GET["LANG"])) {
        $params["lang"] = $_GET["LANG"];
        $LANG = $_GET["LANG"];
    }
    if (isset($_GET["TITLE"])) {
        $TITLE = $_GET["TITLE"];
    } else if (isset($TITLES[$LANG])) {
        $TITLE = $TITLES[$LANG];
    }
    $url = $base_url . "$API_KEY/$LATITUDE,$LONGITUDE?" . http_build_query($params);

    if (($content = @file_get_contents($url)) === FALSE) {
        $error = error_get_last();
        header($protocol . ' 500 Internal Error');
        echo '<h1>500 Internal Error</h1>';
        die();
        //die("<pre>" . $error['message'] . "</pre>");
    } else {
        $jsonObj = json_decode($content, true);
        header("Content-Type: text/html; utf-8");
    }
} else {
    header($protocol . ' 405 Method Not Allowed');
    die('<h1>405 Method Not Allowed</h1>');
}

?>
<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href='//fonts.googleapis.com/css?family=PT+Sans:400,700' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link href='weather_icons/weather-icons.min.css' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <title><?php echo $TITLE ?></title>
</head>
<body>
<table class="<?php echo $containerClasses ?>">

    <caption><?php echo $TITLE ?></caption>
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
        <tr class="<?php echo $classes ?>" data-time="<?php echo $dayData["time"] ?>">
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
<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment-with-locales.min.js"></script>
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script>
    var LANG = "<?php echo $LANG ?>";
</script>
<script src="code.js"></script>
</body>
</html>