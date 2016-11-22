<?php

/**
 * # Weather Forecast #
 * 
 * Displays weather forecast page with data powered by Forecast.io.
 */

$API_KEY = "<change_me>";

$LANG = "en"; 
$TITLE = "Weather Forecast";
$poweredBy = "Powered by Dark Sky";

$poweredByImageUrls = array(
    "forecast" => "https://darksky.net/dev/img/attribution/poweredby-oneline.png",
    "current" => "https://darksky.net/dev/img/attribution/poweredby.png"
);

$poweredByImageUrl = "";

$TITLES = array(
    "en" => "Weather Forecast",
    "nb" => "Værvarsel"
);

$TYPE = "forecast";

$TYPES = array(
    "forecast", "current"
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
    $base_url = "https://api.darksky.net/forecast/";

    $LATITUDE = $_GET["LATITUDE"];
    $LONGITUDE = $_GET["LONGITUDE"];

    $containerClasses = "container";
    $themeClass = "";
    if (isset($_GET["THEME"])) {
        $themeClass = "theme-" . $_GET["THEME"];
        if (in_array($_GET["THEME"], array("dark", "variant-c"))) {
            $poweredByImageUrls["forecast"] = "https://darksky.net/dev/img/attribution/poweredby-oneline-darkbackground.png";
            $poweredByImageUrls["current"] = "https://darksky.net/dev/img/attribution/poweredby-darkbackground.png";
        }
        $containerClasses = "$containerClasses $themeClass";
    }

    $days = 7;
    if (isset($_GET["NUM_DAYS"])) {
        $days = intval($_GET["NUM_DAYS"]);
    }

    if ($days < 1) {
        $days = 1;
    } else if ($days > 7) {
        $days = 7;
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

    if (isset($_GET["TYPE"]) && in_array($_GET["TYPE"], $TYPES)) {
        $TYPE = $_GET["TYPE"];
    }
    $poweredByImageUrl = $poweredByImageUrls[$TYPE];
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

?>
<!doctype html>
<html lang="en" class="no-js <?php echo $TYPE ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href='//fonts.googleapis.com/css?family=PT+Sans:400,700' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link href='weather-icons-2.0.10/css/weather-icons.min.css' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <title><?php echo $TITLE ?></title>
</head>
<body>
<?php if ($TYPE == "forecast") { ?>
<table class="<?php echo $containerClasses ?>">

    <caption>&nbsp;<i class="fa fa-sun-o">&nbsp;</i> <?php echo $TITLE ?></caption>
    <tbody class="daily-forecast">
<?php 
$weekdays_short_num = array(
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
);

$weekdays_long_num = array(
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
);

for ($i = 0; $i < 7; $i++) {
    if ($i > $days) {
        break;
    }
    $dayData = $jsonObj["daily"]["data"][$i];
    $classes = "day";
    if ($i == 0) {
        $classes = "$classes currentDay";
    }
    $wicon = "wi-na";
    if (isset($dayData["icon"]) && isset($weather_icons[$dayData["icon"]])) {
        $wicon = $weather_icons[$dayData["icon"]];
    }
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
            <td colspan="5" class="powered-by">
                <img title="<?php echo $poweredBy; ?>" src="<?php echo $poweredByImageUrl; ?>" />
            </td>
        </tr>
    </tfoot>
</table>
<?php } else if ($TYPE == "current") { ?>
<?php

$wicon = "wi-na";
if (isset($jsonObj["currently"]["icon"]) && isset($weather_icons[$jsonObj["currently"]["icon"]])) {
    $wicon = $weather_icons[$jsonObj["currently"]["icon"]];
}
$temperatureFloor = floor($jsonObj["currently"]["temperature"]);
$summary = $jsonObj["currently"]["summary"];
?>
<h1 class="title <?php echo $themeClass ?>">&nbsp;<i class="fa fa-sun-o">&nbsp;</i> <?php echo $TITLE ?></h1>
<div class="container">
    <div class="icon"><i class="font-icon wi <?php echo $wicon ?>"></i> <?php echo $temperatureFloor ?><i class="wi wi-degrees"></i></div>
    <div class="desc"><?php echo $summary ?></div>
    <div class="powered-by">
        <img title="<?php echo $poweredBy; ?>" src="<?php echo $poweredByImageUrl; ?>" />
    </div>
</div>
<?php } ?>
<script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment-with-locales.min.js"></script>
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script>
    var LANG = "<?php echo $LANG ?>";
</script>
<script src="code.js"></script>
</body>
</html>