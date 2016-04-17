# Pollen Alerts for Google Apps Script #

Parse Pollen Alert emails from NAAF (The Norwegian Asthma and Allergy 
Association) and add the alert to the Google Calendar.

The project uses Google Apps Script together with the Gmail and the Google 
Calendar services.

* Reads emails with a specific label
* Adds the extracted from the latest email to a calendar with a specific name



## How to use ##

### Setting up Email Pollen Alerts from NAAF ###

1. Go to <http://www.pollenvarslingen.no/>
2. Click on the **Motta gratis varsel på e-post** link
3. Login (**Endre instillinger**) or create new account (**Ny bruker**)
4. Once logged in click in the **Rediger** (Edit) button
5. Check the **Motta varsling på e-post:** check box to get alerts by email.
6. Check all areas (**områder**) you want alerts for
7. Check all Pollen types (**Pollentyper**) you want alerts for
8. Click the **Lagre** (Save) button to save the changes

### Setting up the Gmail label filtering ###

1. Go to <https://mail.google.com/> after the first email from NAAF has been 
   received,
2. Check the checkbox next to the email from NAAF that has the subject like **Pollenvarsling for***...
2. Click on **More** and select **Filter messages like these**
3. Leave the **From** field as is
4. With the **Subject** field enter **Pollenvarsling for**
5. Click on the **Create filter with this search** link
6. Check the **Apply the label** check box
7. Then select the **Pollenvarsling** label (or create it if not already exists)
8. As the last step click the **Create filter** button

### Setting up the Google Calendar ###

1. Go to <https://calendar.google.com>
2. Create a new calendar with the exact name **Pollenvarsling**

### Setting up automatically adding Pollen Alerts to Google Calendar ###

#### Creating a project from Google Drive ####

The first time you want to create a script from Drive, follow these steps:

1. Open Google Drive (<https://drive.google.com>).
2. Click **Create**.
3. Click **Connect more apps**.
4. When the "Connect apps to Drive" window appears, type "script" into the 
   search box and press the Enter key.
5. Click **Connect** next to the listing for Google Apps Script.
6. Click **OK** in the confirmation window.

Now that you've connected the app, you can create a script by following just these steps:

1. Open Google Drive (<https://drive.google.com>).
2. Click **Create**.
3. Select **Script**.
4. Select **File > Save**.
5. Enter the name of your project (like **Pollenvarsling**) and click **OK** to
   save it.
6. Copy the contents of [`Code.gs.js`](Code.gs.js) to the editor
6. Select the menu item **Run > myFunction** once to run the function and to 
   initialize the authentication flow to allow the script to access the Gmail 
   and the Google Calendar.

#### Setting up timed triggers ####

1. From the script editor, choose **Resources > Current project's triggers**.
2. Click the link that says: **No triggers set up. Click here to add one now**.
3. Under **Run**, select the `myFunction` to set up a trigger for it.
4. Under **Events**, select **Time-driven**.
5. Select and configure the type of trigger you want to create (for example, an
   **Hour timer** that runs **Every hour**).
    * Make sure that the trigger also runs after the time the alert email 
      usually is received to the Gmail inbox (for example checking 
      **every 4 hour** may be enough).
6. Optionally, click **Notifications** to configure how and when you will be
   contacted by email if your triggered function fails.
7. Click **Save**.
