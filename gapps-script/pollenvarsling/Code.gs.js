/*!
 * Parse Pollen Alert emails from NAAF (The Norwegian Asthma and Allergy 
 * Association) and add the alert to the Google Calendar
 * 
 * @author Alexander Nilsen <alexander.nilsen.no@gmail.com>
 * 
 * ---------------------------------------------------------------------------
 * <https://github.com/alni/digital-signage-samples>
 */

/**
 * Use this with timed triggers
 */
function myFunction() {
    var emailThreads = getPollenvarslingEmails();
    var firstThread = emailThreads && emailThreads[0];
    var firstMessage = firstThread && firstThread.getMessages()[0];
    var obj = parsePollenvarslingEmail(firstMessage);

    createCalendarEvent(obj);
}

/**
 * Parse a string to date
 * @param {string} sDate - the date string parse. 
 *     The format "DD.MM.YYYY" is assumed
 * @returns {Date}
 */
function parseDate(sDate) {
    var parts = sDate.split(".");
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
}

/**
 * Gets all Gmail threads that has the label "Pollenvarsling"
 * @returns {GmailThread[]}
 */
function getPollenvarslingEmails() {
    var userLabel = GmailApp.getUserLabelByName("Pollenvarsling");
    if (!userLabel) {

    }
    var emailsThreads = userLabel && userLabel.getThreads();
    return emailsThreads;
}

/**
 * Parse a email and find the Pollen Alert data
 * @param {GmailMessage} email - the email to parse
 * @returns {object} an object with the following properties:
 *     {Date} date - the date for the Alert
 *     {string} title - the title (subject) for the Alert
 *     {string} location - the location area for the Alert
 *     {string} desc - the main Alert information description
 */
function parsePollenvarslingEmail(email) {
    //var email = email || GmailApp.getMessageById("1538f3023b6dcf5b");
    var tmp, date;
    var content = email && email.getBody();
    var title = email && email.getSubject();
    var obj = {
        date: title
            // If the email has a subject, parse the date found in the subject
            ? parseDate(title.substring(title.length - "20.03.2016".length))
            // Otherwise, use the current date
            : new Date(),
        // Set the title to the email subject. If email was not found ("title"
        // is not set to a value then fall back to to a placeholder text 
        // indicating that this is a test alert and it should be deleted)
        title: (title || "Test varsel (DELETE ME)") + "",
        location: "", //"Østlandet med Oslo",
        desc: "", //"Det ventes kraftig spredning av pollen fra hassel og moderat fra or."
    };
    if (content) {
        // Find content within a H3 tag (the location area of the email alert)
        tmp = content.match(/\<h3\>(.*)+\<\/h3\>/);
        // Set the alert location to the found content (or empty string of none
        // was found)
        obj.location = (tmp && tmp[1]) ? tmp[1].trim() : "";

        //tmp = content.match(/\<div\>(Det ventes(.*)+)\<\/div\>/);
        //obj.desc = (tmp && tmp[1]) ? tmp[1].trim() : "";

        // The index of the Pollen type alert table (It is the only table in 
        // the email that specifies the 'width="100%"' attribute)
        var index = content.indexOf("<table width=\"100%\"");
        // Set "tmp" to start at the Pollen type alert table index. Also trim
        // the string
        tmp = content.substring(index).trim();
        // Set the end of "tmp" to the index of the first closing table tag,
        // and append a closing table tag (as the found tag is not included 
        // with the sub string)
        tmp = tmp.substring(0, tmp.indexOf("</table")) + "</table>";
        // Set the alert description to the current value of "tmp"
        obj.desc = tmp + "";
    }
    return obj;
};

/**
 * Creates or updates existing event from the first calendar found with the
 * name "Pollenvarsling"
 * @param {object} obj - the object to create or update a calendar event for.
 *     The object should be in the same format as returned by 
 *     "parsePollenvarslingEmail()"
 * 
 *     - If an event for the alert date already exists AND it has the same 
 *       location as the alert, then replace the title and the description of 
 *       the event
 *     - Otherwise create a new event for the alert
 */
function createCalendarEvent(obj) {
    //var obj = parsePollenvarslingEmail();
    var cal = CalendarApp.getCalendarsByName("Pollenvarsling")[0];
    var events = cal && cal.getEventsForDay(obj.date);
    var calEvent = null;
    if (events && events.length > 0) {
        // Existing events for date found
        Logger.log('Found %s matching events for %s', events.length, obj.date.toDateString());
        // Loop through each one
        for (var i = 0; i < events.length; i++) {
            //var calEvent = events[i];
            // Check if event location is the same as the alert location
            if (obj.location == events[i].getLocation()) {
                // Location is the same, so set "calEvent" to the current event
                // and break out of the loop
                calEvent = events[i];
                break;
            }
            //calEvent.deleteEvent();
        }
    }
    var description = [obj.title, "", obj.location, "", obj.desc].join("\n");
    if (calEvent) {
        // Existing calendar event found, so just update the title and the
        // description
        calEvent.setTitle(obj.title);
        calEvent.setDescription(obj.desc);
        //calEvent.setTitle(obj.desc);
        //calEvent.setDescription(description);
    } else {
        /*calEvent = cal.createAllDayEvent(obj.desc, obj.date, {
            location: obj.location,
            description: description
        });*/
        // Calendar event does not already exists, so create a new from the
        // alert object data
        calEvent = cal.createAllDayEvent(obj.title, obj.date, {
            location: obj.location,
            description: obj.desc
        });
    }
}
