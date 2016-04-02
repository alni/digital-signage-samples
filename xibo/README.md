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

### The styles need to be half the displayed scale! ###

The Forecast is rendered at 2x the scale. Therefor, the style dimensions need 
to be at half of the needed dimensions/scale.

For example, if the preferred font size is at `48px`, the font size need to 
actually be set at `24px` to make it be rendered at the correct size.

This is easy when using `LESS` (or `SCSS/SASS`) stylesheets and 
compiling them into `CSS` stylesheets.

#### Alernative (better) solution: ###

Create a override style and set the `#content` zoom to `1.0`:

```css
#content {
    zoom: 1.0 !important;
}
```

With that change, the preferred dimensions (font sizes etc.) does not need to 
be halved to appear correctly on the screen.

### How to add new languages? ###

1. Go to <https://developer.forecast.io/docs/v2#options> to check for supported
   languages.
2. Within the Xibo install location, edit the file `modules/forecastio.module.php`
3. Search for the `supportedLanguages()` function
4. Add a new entry to the returned array in the format of:
    * `array('id' => '{lang_code}', 'value' => __('{lang_name}'))`,
5. For example, to add Norwegian Bokmål:
    * `array('id' => 'nb', 'value' => __('Norwegian Bokmaal'))`
