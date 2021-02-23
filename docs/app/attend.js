window.onload = (event) => {
    // Get window variables
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";

    // Get Query params
    let queryString = getUrl.search;
    let urlParams = new URLSearchParams(queryString);

    const eventName = decodeURI(urlParams.get('event'));
    const currentTime = decodeURI(urlParams.get('time'));
    const fsuid = decodeURI(urlParams.get('fsuid'));

    const formContainer = document.getElementById('formContainer');
    const returningContainer = document.getElementById('returningContainer');

    if (eventName != "null" && eventName != null) {
        document.getElementById('EventName').value = eventName;
        document.getElementById('EventNameTitle').innerHTML = eventName;
        document.getElementById('EventName').readOnly = true;
    }

    if (currentTime != "null" && currentTime != null) {
        document.getElementById('ArrivalTime').value = currentTime;
        document.getElementById('ArrivalTime').readOnly = true;
    }

    if (fsuid != "null" && fsuid != null) {
        document.getElementById('fsuid').value = fsuid;
    }

    let info = loadInformation();
    if (info != null && info.fullName != "") {
        // Stored information is available
        resetFormElement('FullName', info.fullName);
        resetFormElement('Phone', info.phoneNumber);
        resetFormElement('Email', info.emailAddress);
        resetFormElement('StudentNumber', info.studentNumber);

        // Show the correct flow
        toggleFlow(true);
        document.getElementById('returnName').innerHTML = info.fullName;
    }

    function getFormValue(id) {
        return document.getElementById(id).value;
    }

    document.getElementById('changeSomething_btn').onclick = (event) => {
        toggleFlow(false);
    };

    document.getElementById('resetForm_btn').onclick = (event) => {
        resetForm();
        saveFormData();
    };

    document.getElementById('form_submit').onclick = (event) => {
        saveFormData();
    }

    document.getElementById('existingUserFlowSubmit_btn').onclick = (event) => {
        submitFormAction();
    }

    function toggleFlow(flow) {
        formContainer.style.display = flow ? 'none' : 'block';
        returningContainer.style.display = flow ? 'block' : 'none';
    }

    /****** STORE DATA FOR NEXT TIME ******/
    function getAttendFormData() {
        // Read symptoms radio button
        let hasSymp = undefined;
        if (document.getElementById('sympNo').checked) hasSymp = false;
        if (document.getElementById('sympYes').checked) hasSymp = true;

        let formData = {
            fullName: getFormValue('FullName'),
            phoneNumber: getFormValue('Phone'),
            emailAddress: getFormValue('Email'),
            studentNumber: getFormValue('StudentNumber'),
            arrivalTime: getFormValue('ArrivalTime'),
            eventName: getFormValue('EventName'),
            symptoms: hasSymp,
            symptomsDetails: getFormValue('SymptomDetails')
        };

        return formData;
    }

    function loadInformation() {
        let savedObj = localStorage.getItem('sudoAttendObj');
        if (savedObj == null) return null;
        else {
            console.log('Loading Saved Data:', savedObj);

            // Parse JSON payload
            let retObj = JSON.parse(savedObj);
            return retObj;
        }
    }

    function storeInformation() {
        let formData = getAttendFormData();
        let newDataObj = {
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            emailAddress: formData.emailAddress,
            studentNumber: formData.studentNumber
        };

        let jsonDataObj = JSON.stringify(newDataObj);

        console.log('Storing:', jsonDataObj);
        localStorage.setItem('sudoAttendObj', jsonDataObj);
    }

    function submitFormAction() {
        document.getElementById('attendanceForm').submit();
    }

    function submitForm() {
        let formData = getAttendFormData();
        let submitBaseUrl = 'https://script.google.com/macros/s/AKfycbzTa8BRJ5P_bqH-43ybrVdgpXlkavFrzdh6LN5QFIXsCoHreRwvPCvE7Q/exec';

        let submitFormData = submitBaseUrl + '?FullName=' + formData.fullName
            + '&Phone=' + encodeURIComponent(formData.phoneNumber)
            + '&Email=' + encodeURIComponent(formData.emailAddress)
            + '&StudentNumber=' + encodeURIComponent(formData.studentNumber)
            + '&ArrivalTime=' + encodeURIComponent(formData.arrivalTime)
            + '&EventName=' + encodeURIComponent(formData.eventName)
            + '&Symptoms=' + encodeURIComponent(formData.symptoms)
            + '&SymptomDetails=' + encodeURIComponent(formData.symptomsDetails)
            + '&fsuid=' + encodeURIComponent(fsuid);

        console.log('Submitting:', submitFormData);
        storeInformation();

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", submitFormData, true); // false for synchronous request
        xmlHttp.send();
        alert('Thanks for registering!');
    }

    function saveFormData() {
        storeInformation();
    }

    function resetFormElement(id, val) {
        if (val == undefined) val = '';
        document.getElementById(id).value = val;
    }

    function resetForm() {
        resetFormElement('FullName');
        resetFormElement('Phone');
        resetFormElement('Email');
        resetFormElement('StudentNumber');
        resetFormElement('SymptomDetails');
    }

    function prefillFormTest() {
        resetFormElement('FullName', 'Test Name');
        resetFormElement('Phone', '045551234');
        resetFormElement('Email', 'test@sudouc.club');
        resetFormElement('StudentNumber', 'u123456');
        resetFormElement('SymptomDetails', 'None');
    }
};