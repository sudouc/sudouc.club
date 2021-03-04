function doGet(request) {
  var params = request.parameters;
  var eOkay = true;
  var formName = params.FormName.toString();

  console.log('Received new request:', params);
  console.log('Form Name:', formName);

  var formCB = 'https://sudouc.club/';

  switch (formName) {
    case 'attend':
      formCB = applyCovidRegister(params);
      break;
    case 'discord_verify':
      formCB = applyDiscordRegister(params);
      break;
    default:
      eOkay = false;
  }

  var resp = {
    success: eOkay
  };

  let retPayload = '<title>Redirecting...</title><meta content="0; url = ' + formCB + '"http-equiv=refresh><p>You should be redirected. If not click <a href="' + formCB + '">here</a>'

  return HtmlService.createHtmlOutput(retPayload);
}


function testCovidRegister() {
  applyCovidRegister({
    Email: 'test@sudouc.club',
    ArrivalTime: "NEVER",
    FullName: "Test Sudo",
    StudentNumber: "SN",
    Symptoms: "Y",
    SymptomDetails: "Stuck in a lecture theater",
    Phone: "1300655506"
  });
}

/**
 * Sudo-CovidRegister Form
 * ----
 * FormTime - (auto)
 * ArrivalTime
 * FullName
 * Phone
 * Email
 * StudentNumber
 * Symptoms - (Y/N)
 * SymptomDetails
 */
function applyCovidRegister(params) {
  var sheet = SpreadsheetApp.openById("1Xr1Ezs1ckBLCt1h0YMi15idev0hDGeeHR-qmrYv20s4");
  var formTime = Utilities.formatDate(new Date(), "GMT+10", "dd/MM/yyyy HH:MM");

  var sheetData = [
    formTime,
    params.ArrivalTime.toString(),
    params.FullName.toString(),
    params.Phone.toString(),
    params.Email.toString(),
    params.StudentNumber.toString(),
    params.Symptoms.toString(),
    params.SymptomDetails.toString(),
    params.EventName.toString(),
    params.fsuid.toString()
  ];

  sheet.appendRow(sheetData);

  return 'https://sudouc.club/app/attend/complete';
}

function applyDiscordRegister(params) {
  var sheet = SpreadsheetApp.openById("1uVvHBaLgme7ylXEf0y6UVbsMEjkVF4mLHQy8FPiOhlw");
  var formTime = Utilities.formatDate(new Date(), "GMT+10", "dd/MM/yyyy HH:MM");

  var sheetData = [
    formTime,
    params.Identifier.toString(),
    params.DiscordUser.toString()
  ];

  sheet.appendRow(sheetData);

  return 'https://sudouc.club/app/forms/cb?message=Your%20discord%20verification%20has%20been%20submitted%20successfully.%20An%20admin%20will%20update%20Discord%20shortly!';
}