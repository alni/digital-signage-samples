# Scrolling Agenda #

Provides a customizable scrolling agenda that uses data from Google Calendar.

The agenda can be used as

* a vertical scrolling agenda
* a vertical scrolling agenda with items grouped by the same start and end 
  times (two variants)
* a single line, vertical scrolling ticker
* a single line, horizontal scrolling ticker (marquee)
* a tasks/to-do list that saves the finished state of each item between each 
  session
* a date/event aware image slide show based images provided with Google 
  Calendar events

The agenda can be customized with

* custom date format and date language
* the scroll interval between event items
* maximum number of items to fetch from the calendar
* the number of days in the future to fetch events from the calendar
* a header icon from Font Awesome
* hiding individual event item parts, like the title/summary, location, start 
  and end dates and the description

## Agenda ##

* **File** : [`agenda.html`](agenda.html)

### URI Query Parameters ###

The Agenda supports the following URI Query Parameters:

* `CAL_ID` : (required) the ID of the Calendar from the Google Calendar Service
* `DATE_FORMAT` : (optional) the Moment.js format to use with the dates
    * Default : `ddd, ll`
* `LANG` : (optional) the language to use with Moment.js
    * Default : `nb` (Norwegian Bokmaal)
* `TYPE` : (optional) type of agenda (normal/grouped)
    * `normal` : normal agenda (default)
    * `grouped` : group agenda items by date range (supports only date + title)
    * `tasks` : use the agenda as a simple tasks/todo list (supports only date,
      title and location)
    * `grouped-alt` : an alternative `grouped` type with similar grouping 
      behaviour and styles as the `tasks` type
    * `ticker` : use the agenda as a news ticker (vertical scrolling, supports
      only date, title and location)
    * `ticker-marquee` : use the agenda as a news ticker (horizontal scrolling)
* `INTERVAL` : (optional) the scroll interval in seconds
    * If it is less or equal to `0` then auto-scrolling is disabled
    * If the `TYPE` is `ticker-marquee` then this is used as the speed of the
      marquee animation
    * Default : `10`
* `MAX_ITEMS` : (optional) the number of max items to fetch from the calendar
    * Default : `50`
* `NUM_DAYS` : (optional) the number of days in the future to fetch events from
  the calendar.
    - If this is not specified, then `MAX_ITEMS` is used instead.
    - The value must to be greater than `0`. If not, the value will be forced 
      to `1`
* `COLOR_THEME` : (optional) the color variant of the styles.
    * `green` : a green-like color variant
    * `red` : a red-like color variant
    * `dark` : a dark color variant of the default `blue` theme (only supported
      by the `ticker-marquee` type)
    * `variant-b` : a nice pink-like color variant
    * Default : none (a blue-like color variant)
* `FA_ICON` : (optional) the Font Awesome icon to use together with the 
  Title/Header block. This could be any name or alias of an icon that is 
  included with Font Awesome 4.5.0 (like `calendar`).
* `HIDE` : (optional) what event item parts should be hidden? A comma separated
  value list of parts to hide.
    * `scrollbars` : hide the scrollbars from the event item container + 
      disable scrolling
    * `title` : hide the event title/summary
    * `location` : hide the event location
    * `daterange` : hide the start and end date/time of the event
    * `enddate` : hide the end date of the event
    * `description` : hide the event description
    * Default : `description` (hide the description if not set)
* `ICON_ONLY` : (optional) should the Title/Header block show the icon only? 
  This is only used when also the `FA_ICON` parameter is also provided.

## Image Slideshow ##

* **File** : [`image.html`](image.html)

### Calendar Event Format ###

* **Title/Summary** : the short description of the image
* **Description** : **First line** = The Image URI.
    * The other lines are ignored

### URI Query Parameters ###

The Image Slideshow supports the following URI Query Parameters:

* `CAL_ID` : (required) the ID of the Calendar from the Google Calendar Service
* `INTERVAL` : (optional) the scroll interval in seconds
    * Default : `10`
* `MAX_ITEMS` : (optional) the number of max items to fetch from the calendar
    * Default : `2`
