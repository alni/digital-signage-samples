# Weather Forecast #

Provides a project that displays weather forecast page with data powered by Dark Sky.

The page can be customized with

* client-side coordinates for a location to get forecast for
* client-side language supported by Dark Sky
* client-side units of measure supported by Dark Sky
* client-side custom page title
* a server-side Dark Sky API Key

## Supported URI Query Parameters ##

* `LATITUDE` - (required) the latitude coordinate for the location to get weather forecast for
* `LONGITUDE` - (required) the longitude coordinate for the location
* `LANG` - (optional) the language to get the weather forecast in (must be a language supported by Dark Sky)
* `UNITS` - (optional) the units of measure to get the weather forecast in (must be units supported by Dark Sky - defaults to `auto`)
* `TITLE` - (optional) the custom page title to use as caption for the table 
* `API_KEY` - (optional/required) a Dark Sky API key (only required when there is no API key provided on the server-side)
