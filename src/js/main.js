
$(document).ready(function () {
    $(window).on("load", function() {
        preloaderFadeOutTime = 300;
        function hidePreloader() {
        var preloader = $('.spinner-wrapper');
        preloader.fadeOut(preloaderFadeOutTime);
        }
        hidePreloader();
        });

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

                    // Clear current map filters
                    mapControls.activeHobbies.clear();
                    mapControls.activeSocial.clear();

                    // Set hobby filters from survey
                    let hobbies = data.Hobbies.map(h => {
                        return h.id
                    });
                    for(let hobby of hobbies) {
                        mapControls.activeHobbies.add(hobby);
                        const $allHobbies = $(".sidebar-toggle[data-category='hobbies']");
                        $allHobbies.each(function() {
                            if(!mapControls.activeHobbies.has($(this).data("filter-id"))) {
                                $(this).removeClass("active");
                            } else {
                                $(this).addClass("active");
                            }
                        });
                    }

                    // Set social filters from survey
                    let socials = data.Socials.map(s => {
                        return s.id
                    });
                    for(let social of socials) {
                        mapControls.activeSocial.add(social);
                        const $allSocials = $(".sidebar-toggle[data-category='social']");
                        $allSocials.each(function() {
                            if(!mapControls.activeSocial.has($(this).data("filter-id"))) {
                                $(this).removeClass("active");
                            } else {
                                $(this).addClass("active");
                            }
                        });

                    }
                    mapControls.updateMapMarkers();
                    mapControls.updateHeatMap();


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
});
