$(document).ready(function () {
    console.log("Custom code loaded");
    var resultLat;
    var resultLng;

    $("#submitSurvey").on("click", function (submit) {
        submit.preventDefault();

        var addressInput = $("#street").val() + ', ' + $("#city").val() + ', ' + $("#state").val() + ' ' + $("#zip").val();

        var geocoder = new google.maps.Geocoder();

        var resultLat = null;
        var resultLng = null;

        geocoder.geocode({address: addressInput}, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {

                resultLat = results[0].geometry.location.lat();
                resultLng = results[0].geometry.location.lng();

                console.log(`${resultLat},${resultLng}`);

                var newSurvey = {
                    street: $("#street").val(),
                    city: $("#city").val(),
                    state: $("#state").val(),
                    zip: $("#zip").val(),
                    age: $("#age").val(),
                    hobbies: $("#hobbies").val(),
                    education: $("#education").val(),
                    income: $("#income").val(),
                    career: $("#career").val(),
                    kids: $("#kids").val(),
                    pets: $("#pets").val(),
                    car: $("#car").val(),
                    married: $("#married").val(),
                    social: $("#social").val(),
                    address: $("#street").val() + ', ' + $("#city").val() + ', ' + $("#state").val() + ' ' + $("#zip").val(),
                    geocodeLat: resultLat,
                    geocodeLng: resultLng
                };

                $.post("/api/surveys", newSurvey, function (data) {
                    console.log(data);
                });
            }
        });

    });
});
