# Calendar Task List #

Shows a Calendar Task List with public events from the Google Calendar.

Can also be used to mark a calendar event as (un)finished from other 
applications.
 
Can be run as the Script Owner with public anonymous access to allow Digital
Signage/Kiosk applications to view and mark public events as (un)finished.

## How to use ##

### Supported URI Query Parameters ###

* `SECRET_KEY` - (required) the secret key of the script. This must be exactly
  the same as the "SECRET_KEY" on the top of the `Code.gs.js` file.
* `CALENDAR_ID` - (required) the Calendar ID

#### Used with the Calendar Task List frontend ####

* `LANG` - (optional) the language to use with Moment.js
    * Default : `nb` (Norwegian Bokmaal)
* `FA_ICON` - (optional) the Font Awesome icon to use together with the 
  Title/Header block. This could be any name or alias of an icon that is 
  included with Font Awesome 4.5.0 (like "calendar").

#### Used with external applications ####

* `EVENT_ID` - (required) the calendar Event ID.
    * Required when setting the done state of a calendar task event. If not
      included a Calendar Task List is shown instead.
* `START_DT` - (required) the calendar Event Start date time.
    * Required when setting the done state of a calendar task event.
* `IS_DONE` - (optional) the done state of the calendar event.
    * If included sets the done state of a calendar task event to finished.
      Otherwise sets the done state to unfinished.

--------

### Creating a project from Google Drive ###

The first time you want to create a script from Drive, follow these steps:

1. Open Google Drive (<https://drive.google.com>).
2. Click **Create**.
3. Click **Connect more apps**.
4. When the "Connect apps to Drive" window appears, type "script" into the 
   search box and press the Enter key.
5. Click **Connect** next to the listing for Google Apps Script.
6. Click **OK** in the confirmation window.

Now that you've connected the application, you can create a script by following
just these steps:

1. Open Google Drive (<https://drive.google.com>).
2. Click **Create**.
3. Select **Script**.
4. Select **File > Save**.
5. Enter the name of your project (like **Calendar Task List**) and click 
   **OK** to save it.
6. Copy the contents of [`Code.gs.js`](Code.gs.js) to the editor
7. Select **File > New > Script file** and name it **MomentJS**.
8. Copy the contents of the generated [`MomentJS.gs.js`](MomentJS.gs.js) (in 
  the `dist/` directory) to this file
9. Select **File > New > Html File** and name it **tasks**
10. Copy the contents of [`tasks.html`](tasks.html) to the created HTML file

#### Deploying a script as a web app ####

To publish the script as a web application, follow these steps:

1. Save a new version of the script by selecting **File > Manage Versions**, 
   then **Save New Version**.
2. Select **Publish > Deploy as web app**.
3. Under **Project version**, select the version you just saved.
4. Under **Execute the app as**, select whose authorization the application 
   should run with: your account (the developer's) or the account of the user 
   who visits the application.
5. Under **Who has access to the app**, select who should be allowed to visit 
   it. The options differ depending on the type of account you have, but they 
   can include "Only myself", any member of your domain, "Anyone" (with a 
   Google account), or "Anyone, even anonymous".
6. Click **Deploy**.
