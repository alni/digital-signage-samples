# Weather Forecast #

Provides a project that displays weather forecast page with data powered by 
Forecast.io.

The page can be customized with

* client-side coordinates for a location to get forecast for
* client-side language supported by Forecast
* client-side units of measure supported by Forecast
* client-side custom page title
* a server-side Forecast API Key

## Supported URI Query Parameters ##

* `LATITUDE` - (required) the latitude coordinate for the location to get 
  weather forecast for
* `LONGITUDE` - (required) the longitude coordinate for the location
* `LANG` - (optional) the language to get the weather forecast in (must be a
  language supported by Forecast)
* `UNITS` - (optional) the units of measure to get the weather forecast in (must
  be units supported by Forecast - defaults to `auto`)
* `TITLE` - (optional) the custom page title to use as caption for the table 
* `API_KEY` - (optional/required) a Forecast API key (only required when there
  is no API key provided on the server-side)
