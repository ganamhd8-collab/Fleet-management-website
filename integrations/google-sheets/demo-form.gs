/**
 * AWA Fleet Guards — "Book a Demo" form → Google Sheet
 *
 * Setup (one time, ~5 minutes):
 *  1. Create a new Google Sheet (e.g. "AWA Demo Requests").
 *  2. In the sheet: Extensions → Apps Script. Delete the sample code and paste this whole file. Save.
 *  3. Deploy → New deployment → type "Web app".
 *       Execute as: Me
 *       Who has access: Anyone
 *     Click Deploy, approve the permissions, and copy the Web app URL (ends with /exec).
 *  4. In Vercel → Project → Settings → Environment Variables add:
 *       NEXT_PUBLIC_DEMO_ENDPOINT = <the /exec URL>
 *     then redeploy the site (the value is baked in at build time).
 *
 * If you edit this script later: Deploy → Manage deployments → Edit → Version: New version.
 * (Keeps the same URL. "New deployment" would create a new URL.)
 */

var SHEET_NAME = "Demo Requests";

// Optional: put an address here to also get an email for every request, e.g. "info@awafleetguards.com".
// Leave empty to only save to the sheet.
var NOTIFY_EMAIL = "";

var HEADERS = [
  "Submitted at",
  "Full name",
  "Company",
  "Email",
  "Phone",
  "Country",
  "Industry",
  "Fleet size",
  "Services",
  "Language",
  "Page",
  "Status",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Spam trap: real visitors never fill the hidden "website" field.
    if (data.website) return json_({ ok: true });

    if (!data.fullName || !data.email || !data.company) {
      return json_({ ok: false, error: "Missing required fields" });
    }

    var sheet = getSheet_();
    var phone = [data.countryCode, data.phone].filter(Boolean).join(" ");
    var services = Array.isArray(data.services) ? data.services.join(", ") : data.services;

    var row = [
      new Date(),
      clean_(data.fullName),
      clean_(data.company),
      clean_(data.email),
      clean_(phone),
      clean_(data.country),
      clean_(data.industry),
      clean_(data.fleetSize),
      clean_(services),
      clean_(data.lang),
      clean_(data.page),
      "New",
    ];
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      var body = HEADERS.map(function (h, i) { return h + ": " + row[i]; }).join("\n");
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "New demo request — " + row[2],
        body: body,
        replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? data.email : undefined,
      });
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Opening the /exec URL in a browser shows this — handy to check the deployment works.
function doGet() {
  return json_({ ok: true, service: "AWA Fleet Guards demo form" });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

// Trim, cap length, and stop values starting with = + - @ from running as formulas.
function clean_(value) {
  var v = value === undefined || value === null ? "" : String(value).trim().slice(0, 500);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
