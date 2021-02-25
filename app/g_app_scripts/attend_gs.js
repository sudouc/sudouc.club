function doGet(e) {
    var params = e.parameters;
    var eOkay = true;
  
    applyCovidRegister(params);
    
    var resp = {
      success: eOkay
    };
  
    let retPayload = '<title>Redirecting...</title><meta content="0; url = https://sudouc.club/app/attend_complete"http-equiv=refresh><p>You should be redirected. If not click <a href=https://sudouc.club/app/attend_complete>here</a>'
  
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
  }