# Xibo Modules #


## Webpage ##

### How to fit webpages correctly on different resolutions? ###

1. Set the `Options` to `Manual Position`
2. Set the following settings to `0`:
    * `Page Width`
    * `Page Height`
    * `Offset Top`
    * `Offset Left`
3. Set the `Scale Percentage` setting to `100`

## Forecast ##

### How to add new languages? ###

1. Go to <https://developer.forecast.io/docs/v2#options> to check for supported
   languages.
2. Within the Xibo install location, edit the file `modules/forecastio.module.php`
3. Search for the `supportedLanguages()` function
4. Add a new entry to the returned array in the format of:
    * `array('id' => '{lang_code}', 'value' => __('{lang_name}'))`,
5. For example, to add Norwegian Bokmål:
    * `array('id' => 'nb', 'value' => __('Norwegian Bokmaal'))`
