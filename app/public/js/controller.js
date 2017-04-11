angular.module('demoApp', [])

.controller('Controller', function ($scope, $http) {


    // ******************     
    // ** patients
    // ******************    

    $scope.patient = {
        "IBAN": "12345",
        "balance": 0,
        "id": "0",
        "label": "0",
        "number": "0",
        "oweners": "0",
        "swift_bic": "0",
        "type": null
    }


    $scope.loadPatientTable = function (_callback) {

        console.log('### In GET accounts');

        var req = {
            url: 'https://datapower/openabank/sb/api/banks/tsb/accounts'
            , method: 'GET'
            , headers: {
                 'Accept': 'application/json'
                , 'Access-Control-Allow-Origin': '*'
                , 'Content-Type': 'application/json'
                , 'x-ibm-client-id': '16e578d5-9448-45ab-9c2c-0ac507428484'
            }
        }

        //                console.log('### In GET patients ## req: ' + JSON.stringify(req));

        $http(req).then(function successCallback(response) {
            console.log("### In GET accounts ## APIC call successful, response: " + JSON.stringify(response));
            $scope.accounts = response.data;
            console.log("### In GET accounts ## $scope.accounts: " + JSON.stringify($scope.accounts));

            // Run callback from GET Appointments once $scogit commit -m "first commit"pe.patients is loaded
            if (_callback) {
                console.log("### In GET accounts ## in _callback called");
                _callback()
            };

            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            console.log("### In GET accounts ## APIC call failure, response: " + JSON.stringify(response));
            $scope.httpCallReport = {
                "response": "A problem happened, please check logs"
                , "hints": [{
                        "name": "Connectivity to APIC Server"
                                }         
                    , {
                        "name": "CORS issue, use Chrome with -disable-web-security --user-data-dir"
                                }]
            };
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


    }



    $scope.createPatient = function () {

       console.log('### In POST new account');

        $scope.account.IBAN = "NA";
        $scope.account.balance = 0;
        var randomId = Math.round(Math.random()*1000000) + 1;
        $scope.account.id = randomId.toString();
        $scope.account.number = $scope.account.id;
        $scope.account.swift_bic = "TSBANZ22";

        console.log('### In POST new account - $scope.account: ' + JSON.toString($scope.account));

        var req = {
            url: 'https://datapower/openabank/sb/api/banks/tsb/accounts'
            , method: 'POST'
            , headers: {
                'Accept': 'application/json'
                , 'Access-Control-Allow-Origin': '*'
                , 'Content-Type': 'application/json'
                , 'x-ibm-client-id': '16e578d5-9448-45ab-9c2c-0ac507428484'
            }
            , data: $scope.account
        }

        console.log('### In POST new account ## req: ' + JSON.stringify(req));


        $http(req).then(function successCallback(response) {
            console.log("### In POST new account ## APIC call successful, response: " + JSON.stringify(response));
            $scope.httpCallReport = {
                "response": "Account created successfully"
            };
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            console.log("### In POST new account ## APIC call failure, response: " + JSON.stringify(response));
            $scope.httpCallReport = {
                "response": "A problem happened, please check logs"
                , "hints": [{
                        "name": "Connectivity to APIC Server"
                                }
                                
                    , {
                        "name": "CORS issue, use Chrome with -disable-web-security --user-data-dir"
                                }]
            };
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        //            $scope.hello = data; 
        // this callback will be called asynchronously
        // when the response is available
        //            angular.copy(response.data.report,$scope.report);
        //console.log(response);
        //console.log(response.data.loan.messages);

        // to reload refresh the data/table once the patient has been added
        $scope.loadPatientTable();

    }


    // ******************     
    // ** appointments
    // ******************  

    $scope.appointment = {
        "appointment": {
            "doctor": "100"
            , "duration": 1
            , "exam_room": "1"
            , "id": "301"
            , "notes": "NA"
            , "office": "200"
            , "patient": "2"
            , "reason": "Sore back"
            , "scheduled_time": "2016-09-23T00:00:00.000Z"
            , "status": "Booked"
        }
    }

    // object to hold the appointments table fields populated from different REST calls (appointments, patients, etc)
    $scope.appointments = [];

    $scope.loadAppointmentTable = function () {

        console.log('### In GET appointments');

        var req = {
            url: 'https://api.au.apiconnect.ibmcloud.com/giovanninzibmcom-acc-dev/medtech/api/appointments'
            , method: 'GET'
            , headers: {
                'Authorization': 'Basic YWRtaW46YWRtaW4='
                , 'Accept': 'application/json'
                , 'Access-Control-Allow-Origin': '*'
                , 'Content-Type': 'application/json'
                , 'x-ibm-client-id': '21e90ade-2c65-4c2b-b91b-df75184cae66'
            }
        }

        //                    console.log('## req: ' + JSON.stringify(req));


        $http(req).then(function successCallback(response) {
            console.log("### In GET appointments ## APIC call successful, response: " + JSON.stringify(response));

            $scope.loadPatientTable(function () { // GET and load patients into $scope.patients using callback

                // Associate patientID with patient record    
                response.data.forEach(function (entry) {
                    console.log("### In GET appointments ## In forEach appointment response");
                    console.log("### In GET appointments ## entry.patient: " + JSON.stringify(entry.patient)); //patient id in appointment

                    function findPatient(patient) {
                        return patient.id === entry.patient;
                    }

                    // Find current patient if in patients object
                    var currPatient = $scope.patients.find(findPatient)
                    console.log("### In GET appointments ## currPatient: " + JSON.stringify(currPatient));
                    var patientFullName = currPatient.first_name + " " + currPatient.last_name;

                    var appointmentExt = {
                        "status": entry.status,
                        "exam_room": entry.exam_room,
                        "reason": entry.reason,
                        "scheduled_time": entry.scheduled_time,
                        "duration": entry.duration,
                        "patient": patientFullName,
                        "patient_photo": currPatient.patient_photo
                    }

                    
                    $scope.appointments.push(appointmentExt);
                    console.log("### In GET appointments ## $scope.appointments: " + JSON.stringify($scope.appointments));


                });

            });

        }, function errorCallback(response) {
            console.log("### In GET appointments ## APIC call failure, response: " + JSON.stringify(response));
            $scope.httpCallReport = {
                "response": "A problem happened, please check logs"
                , "hints": [{
                        "name": "Connectivity to APIC Server"
                                }
                                
                    , {
                        "name": "CORS issue, use Chrome with -disable-web-security --user-data-dir"
                                }]
            };
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    }


});