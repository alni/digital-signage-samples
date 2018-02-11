# Responsive Tabbed Navigation #

## Credits ##

Original work from article by CodyHouse (<http://codyhouse.co/?p=346>). Please
see their terms at <http://codyhouse.co/terms/>.

## Description ##

Provides a responsive tabbed multi-view navigation container for other pages.

Each tab & view can be customized with

* tab title
* the page URI + query parameters of the page to serve with the view
* an unique ID for the view

### URI Query Parameters ###

The Responsive Tabbed Navigation supports the following URI Query Parameters:

* `CONFIG` : (required) path to the JSON configuration file
    * look inside the [`config/`](config/) folder for sample files

### Configuration File Format ###

* `pages` : `array` - the root element
* `pages[].id` : `string` - the unique ID to use with the view
* `pages[].title` : `string` - the title to use with the tab of the view
* `pages[].embed` : `string` - the URI of the page to serve with the view 
  (excluding query parameters)
* `pages[].params` : `object` - the query parameters to be used with the served
  page
