/*!
 * Shows a Calendar Task List with public events from the Google Calendar.
 * 
 * Can also be used to mark a calendar event as (un)finished from other 
 * applications.
 * 
 * Can be run as the Script Owner with public anonymous access to allow Digital
 * Signage/Kiosk applications to view and mark public events as (un)finished.
 * 
 * @author Alexander Nilsen <alexander.nilsen.no@gmail.com>
 * 
 * ---------------------------------------------------------------------------
 * <https://github.com/alni/digital-signage-samples>
 */

// PLEASE CHANGE ME! :)
var SECRET_KEY = "WDYAkNWlfBdnSW0isQyTrUx1b3haSXRL5HgpZyrPcSs5T3woAqKUo5EMRR9zoCyv";

function myFunction() {

}

/**
 * Called with HTTP GET Requests. Either sets the done state of a calendar task
 * event, OR shows a Calendar Task List.
 * 
 * @param {object} e.parameter - the URI query parameters
 * @param {string} e.parameter.SECRET_KEY - (required) the secret key of the
 *     script. This must be exactly the same as the "SECRET_KEY" on the top of
 *     this file.
 * @param {string} e.parameter.CALENDAR_ID - (required) the Calendar ID
 * @param {string} e.parameter.EVENT_ID - (required(1)) the calendar Event ID.
 *     *Required when setting the done state of a calendar task event. If not
 *      included a Calendar Task List is shown instead.
 * @param {string} e.parameter.START_DT - (required(1)) the calendar Event Start
 *     date time.
 *     *Required when setting the done state of a calendar task event.
 * @param {string} e.parameter.IS_DONE - (optional(1)) the done state of the 
 *     calendar event.
 *     *If included sets the done state of a calendar task event to finished.
 *      Otherwise sets the done state to unfinished.
 * @param e.parameter.LANG - (optional(2)) the language to use with Moment.js
 *     Default : `nb` (Norwegian Bokmaal)
 * @param e.parameter.FA_ICON - (optional(2)) the Font Awesome icon to use 
 *     together with the Title/Header block. This could be any name or alias of
 *     an icon that is included with Font Awesome 4.5.0 (like "calendar").
 * 
 * (1): Used when setting the done state of a calendar task event.
 * (2): Used when showing a Calendar Task List.
 * 
 * @returns {TextOutput|HtmlOutput|void} returns JSONP TextOutput when 
 *     "EVENT_ID" is specified(1). Otherwise returns a HtmlOutput Event 
 *     Calendar List(2). 
 * 
 *     For either of those to be returned then "SECRET_KEY" must also be
 *     specified. Otherwise nothing is returned.
 */
function doGet(e) {
    var params = e.parameter;
    if (params.SECRET_KEY && params.SECRET_KEY === SECRET_KEY) {
        var CALENDAR_ID = params.CALENDAR_ID;
        if (params.EVENT_ID) {
            var EVENT_ID = params.EVENT_ID;
            var START_DT = params.START_DT;
            var IS_DONE = params.IS_DONE || false;
            var evnt = setTaskDoneState(EVENT_ID, IS_DONE, CALENDAR_ID, START_DT);
            return ContentService.createTextOutput(params.callback +
                '(' + JSON.stringify(evnt) + ')');
        } else {
            var LANG = params.LANG || "nb";
            var FA_ICON = params.FA_ICON || null;
            setUserProperty("LANG", LANG);
            var t = HtmlService.createTemplateFromFile('tasks');
            t.CALENDAR_ID = CALENDAR_ID + "";
            t.LANG = LANG;
            t.FA_ICON = FA_ICON;
            return t.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
        }
    }
}

function getScriptProperty(key) {
    var scriptProperties = PropertiesService.getScriptProperties();
    return scriptProperties.getProperty(key);
}

function getUserProperty(key) {
    var userProperties = PropertiesService.getUserProperties();
    return userProperties.getProperty(key);
}

function setUserProperty(key, value) {
    var userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty(key, value);
}

/**
 * Get Public Events from a Calendar for date (day)
 * 
 * @param {Calendar} cal - the calendar object to get events from
 * @param {Date} date - the day to get events for
 */
function getPublicEventsForDay(cal, date) {
    var calEvents = cal.getEventsForDay(date);
    return calEvents && calEvents.filter(function (calEvent) {
        return calEvent.getVisibility() == CalendarApp.Visibility.PUBLIC;
    });
}

/**
 * Set the Done state of the task event. (Only sets the done state of public 
 * events)
 * 
 * @param {string} eventId - (required) the ID of the Event
 * @param {boolean} isDone - (optional) is the event finished or UNfinished?
 * @param {string} calendarId - (required) the ID of the Calendar to get the 
 *     Event from.
 * @param {string} start_dt - (required) the start date time string of the 
 *     event. Used as a starting point of the time frame to search for events
 *     from the Calendar to limit the results.
 * @param {string} end_dt - (optional) the end date time string of the event.
 *     Used as a ending point of the time frame to search for events from the
 *     Calendar to limit the results. 
 *     * If not specified defaults to "5" minutes after "start_dt"
 */
function setTaskDoneState(eventId, isDone, calendarId, start_dt, end_dt) {
    var cal = CalendarApp.getCalendarById(calendarId);
    //var calEventSeries = cal.getEventSeriesById(eventId);
    var start = moment(start_dt).toDate(); //new Date(start_dt);
    var end;
    if (end_dt) {
        end = moment(end_dt).toDate();
    } else {
        end = moment(start_dt).add(5, "minutes").toDate();
    }
    var calEvents = cal.getEvents(start, end);
    var calEvent = calEvents.filter(function (obj) {
        return obj.getId() === eventId &&
            // Only include event if it is PUBLIC
            obj.getVisibility() == CalendarApp.Visibility.PUBLIC;
    })[0];
    if (calEvent) {
        if (isDone) {
            calEvent.setTag("taskState", "done");
        } else {
            calEvent.setTag("taskState", "");
        }
    }
    return start.toLocaleString(); // TODO: Return an actual needed value
    /*return calEvents.map(function(obj) {
      return obj.getId();
    });*/
}

function daterange_formatter(start_d, end_d, allday_p, show_enddate) {
    moment.locale(getUserProperty("LANG") || "en");
    var DATE_FORMAT = "ddd, ll";
    var start, end;
    if (allday_p) {
        start = moment(start_d); //.format("ddd, ll");
        if (show_enddate && moment(end_d).diff(start, 'days') > 1) {
            // If the end_d is more than a day after start, then initialize end
            // from end_d and subtract 1 day from it (prevents overflow)
            end = moment(end_d).subtract(1, 'days'); //.format("ddd, ll");
        }
        // Check if event spans from the start of week to the end of week
        // (locale-aware)
        if (start.weekday() == 0 && (end && end.weekday() == 6)) {
            // If the start is at the first weekday and the end is initialized
            // and at the last weekday then return a string with the current 
            // (locale aware) week number
            return "<span class=\"week\">" + start.week() + "</span>"; //"Uke " + start.week();
        } else {
            // Otherwise format the start and the end
            start = start.format(DATE_FORMAT);
            // Only format the end if it is actually initialized
            end = end && end.format(DATE_FORMAT);
        }
        // Return a string in the format "<start> - <end>" if both start and 
        // end is set to a value.
        // If end is not set to a value only return "<start>"
        return start + (end ? " - " + end : "");
        //+ " - " + moment(end_d).subtract(1, 'days').format("ddd, ll");
    } else if (moment(start_d).diff(moment(), 'days') >= 6) {
        // If the event is not all day and the start_d is more than 5 days in
        // the future, then return a formatted date string
        return moment(start_d).format(DATE_FORMAT);
    } else {
        if (show_enddate) {
            end = moment(end_d).format("LT");
        }
        // Otherwise return a calendar formatted start_d + a locale aware time 
        // formatted end_d in the form of "<start_d> - <end>"
        return moment(start_d).calendar() + (end ? " - " + end : "");
    }
}
