$(document).ready(function () {
    console.log("Custom code loaded");
    var resultLat;
    var resultLng;
    function extractFromAddress(components, type){
        for (var i=0; i<components.length; i++)
            for (var j=0; j<components[i].types.length; j++)
                if (components[i].types[j]==type) return components[i].long_name;
        return "";
    };

    $("#submitSurvey").on("click", function (submit) {
        submit.preventDefault();

        var addressInput = $("#street").val() + ', ' + $("#city").val() + ', ' + $("#state").val() + ' ' + $("#zip").val();

        var geocoder = new google.maps.Geocoder();

        var resultLat = null;
        var resultLng = null;

        geocoder.geocode({address: addressInput}, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {

                console.log(results[0].address_components)

                console.log(extractFromAddress(results[0].address_components,"neighborhood"));

                resultLat = results[0].geometry.location.lat();
                resultLng = results[0].geometry.location.lng();

                console.log(`${resultLat},${resultLng}`);

                var newSurvey = {
                    street: $("#street").val(),
                    city: $("#city").val(),
                    state: $("#state").val(),
                    zip: $("#zip").val(),
                    age: $("#age").val(),
                    industry: $("#industry").val(),
                    income: $("#income").val(),
                    education: $("#education").val(),
                    children: $("#children").val(),
                    pets: $("#pets").val(),
                    married: $("#married").val(),
                    car: $("#car").val(),
                    address: $("#street").val() + ', ' + $("#city").val() + ', ' + $("#state").val() + ' ' + $("#zip").val(),
                    neighborhood: extractFromAddress(results[0].address_components,"neighborhood"),
                    geocodeLat: resultLat,
                    geocodeLng: resultLng,
                    hobbies: $("#hobbies").val(),
                    social: $("#social").val()
                };

                $.post("/api/surveys", newSurvey, function (data) {
                    console.log(data);
                });
            }
        });

    });
});
