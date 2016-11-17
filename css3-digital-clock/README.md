# CSS3 Digital Clock #

A CSS3 animated digital clock using common shared styles for this repository.

Switches between displaying time and date, showing each for 10 seconds.

> Original code from tutorial by [Alessio Atzeni](http://www.alessioatzeni.com/): [CSS3 Digital Clock with jQuery](http://www.alessioatzeni.com/blog/css3-digital-clock-with-jquery/).

### URI Query Parameters ###

The Digital Clock supports the following URI Query Parameters:

* `DATE_FORMAT` : (optional) the Moment.js format to use with the date
    * Default : `ddd, DD MMM`
* `LANG` : (optional) the language to use with Moment.js
    * Default : `nb` (Norwegian Bokmaal)
* `INTERVAL` : (optional) the interval in seconds between showing the time and
  the date 
    * If it is less or equal to `0` then the default value is used
    * Default : `10`
* `COLOR_THEME` : (optional) the color variant of the styles.
    * `green` : a green-like color variant
    * `red` : a red-like color variant
    * `variant-b` : a nice pink-like color variant
    * Default : none (a blue-like color variant)
