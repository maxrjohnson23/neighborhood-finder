$(document).ready(function () {
    $(window).on("load", function() {
        preloaderFadeOutTime = 300;
        function hidePreloader() {
        var preloader = $('.spinner-wrapper');
        preloader.fadeOut(preloaderFadeOutTime);
        }
        hidePreloader();
        });
 console.log('loaded')
    function extractFromAddress(components, type){
        for (var i=0; i<components.length; i++)
            for (var j=0; j<components[i].types.length; j++)
                if (components[i].types[j]==type) return components[i].long_name;
        return "";
    }

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

                // Get hobby ID from checkboxes
                let hobbies = $.map($('input.hobby:checkbox:checked'), function (e) {
                    return $(e).data("hob");
                });

                // Get social ID from checkboxes
                let social = $.map($('input.social:checkbox:checked'), function (e) {
                    return $(e).data("social");
                });


                var newSurvey = {
                    street: $("#street").val(),
                    city: $("#city").val(),
                    state: $("#state").val(),
                    zip: $("#zip").val(),
                    age: $("#age").val(),
                    industry: $("#industry").val(),
                    income: $("#income").val(),
                    hobbies: hobbies,
                    social: social,
                    education: $("#education").val(),
                    children: $("#children").val(),
                    pets: $("#pets").val(),
                    married: $("#married").val(),
                    car: $("#car").val(),
                    address: $("#street").val() + ', ' + $("#city").val() + ', ' + $("#state").val() + ' ' + $("#zip").val(),
                    neighborhood: extractFromAddress(results[0].address_components,"neighborhood"),
                    geocodeLat: resultLat,
                    geocodeLng: resultLng
                };

                $.post("/api/surveys", newSurvey, function (data) {
                    console.log(data);
                });

            }
        });

    });

     //sign up
  $("#SubmitSignUp").on("click", function(submit){
    submit.preventDefault();
    let newUser = {
      first_name: $('#InputFirstName').val(),
      last_name: $('#InputLastName').val(),
      email: $('#InputEmail').val(),
      password: $('#InputPassword').val()
    }

    $.post('/signup', newUser, (data) => {
      console.log(data);
    })
  });

  // Load aggregated neighborhood information when right side bar button
  // (aka 'hamburger' looking button) is clicked
  $("#hamburger_button").on("click", function(){
    $.ajax({
        url: `/api/neighborhoods/`,
        type: "GET",
        success: function (data) {
            for (item in data) {
                // Returning neighborhood name and storing it in variable 'neighborhood_name'
                var neighborhood_name = item;
                console.log(`Neighborhood: ${neighborhood_name}`)
                for (subItem in data[item]) {
                    data[item][subItem].forEach((a) => {
                        // Storing each question, answer, and count of those answers (per neighborhood)
                        // to variables 'question', 'answer', and  'count'. 
                        // Note that a.Count has a capital 'C' while the variable name has a lower case 'c'
                        var question = a.question;
                        var answer = a.answer;
                        var count = a.Count;
                        console.log(`${question} : ${answer} [${count}]`)
                    });
                }
            };
        }
    });
});
  console.log('main.js loaded')
});
