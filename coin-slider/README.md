# Flickr slide show gallery #

Provides a customizable, nice, slide show gallery that uses images from Flickr.

The slide show can be customized with

* searching for images with the Flickr Feed Service
* tags to use with the image search
* the slide interval between images
* maximum number of items to fetch from Flickr
* a title/header to use for the slide show
* a language to use slide show texts (like “Images from Flickr”, and “by owner”)
* a Flickr API Key to use the Flickr Photos Search API instead the Feed Service
  for more fine-grained filtering

## Supported URI Query Parameters ##

Supports the following URI Query Parameters:

* `TAGS` : (required) the tags to use to search for images (separated by commas
  ("%2C" when URI encoded))
    * Default : `wild`
* `INTERVAL` : (optional) the slide interval in seconds
    * Default : `3`
* `NUM_ITEMS` : (optional) the number of images to include with the slide show
    * Default : `10`
* `TITLE` : (optional) the title to use for the slide show
* `LANG` : (optional) the language to use for slide show text (like the
    "Images from Flickr" and "by {ownername}" texts)
    * "en" - English (Default)
    * "nb" - Norwegian Bokmål
    * "nn" - Norwegian Nynorsk
* `API_KEY` : (optional) a Flickr API Key. Specify this if more fine-grained
  filtering is required (like only "Commercial use allowed")
    * Uses the `flickr.photos.search` API instead of the Feed Service
* `COLOR_THEME` : (optional) the color variant of the styles.
    * `green` : a green-like color variant
    * `red` : a red-like color variant
    * `variant-b` : a nice pink-like color variant
    * Default : none (a blue-like color variant)
