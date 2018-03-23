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
                    console.log(data);
                });

            }
        });

    });


// $('.check-label').on('click', (e) => {
//     e.preventDefault();
//     console.log($(this).children())
//     let answer = $('.check-label').find(':checkbox');
//     console.log(answer)
//     // let j = JSON.stringify(answer);
//     // console.log(j);
//     console.log('change');
//     console.log(`${$(this)} changed`)
//     console.log(this.children)
// })

//right side-bar
let checkArr = [];
$('body').on('click', '.check-label', function(e) {
    e.preventDefault();
    // let check = checkArr;
    let currentValue = $(this).children().attr('value');
    console.log(currentValue);
    // $('body').on('change', '.active', function() {
    //     getSelected();
    //   });
    setTimeout(function(){ getSelected() }, 500);
    // getSelected()
    // var promise = new Promise(function(resolve, reject) {
      
    //     if (check!== checkArr) {
    //       resolve("Stuff worked!");
    //     }
    //     else {
    //       reject(Error("It broke"));
    //     }
    //   });
    //   promise.then(function(result) {
    //     console.log(checkArr); // "Stuff worked!"
    //   }, function(err) {
    //     console.log(err); // Error: "It broke"
    //   });

})


    
function getSelected() {
    checkArr = [];
    checkArr = $(".check-label input:checkbox:checked").map(function() {
        return $(this).val()
    }).get();
    console.log(checkArr);
    return(checkArr);
    // $("input:checkbox[name=nFilter]:checked").each(function(){
    //         checkArr.push($(this).val());
    // });
    // console.log(checkArr);
    // return checkArr;
}
function useArray(getSelected) {
    console.log(arr);
}
     //sign up
//   $("#SubmitSignUp").on("click", function(submit){
//     submit.preventDefault();
//     let newUser = {
//       first_name: $('#InputFirstName').val(),
//       last_name: $('#InputLastName').val(),
//       email: $('#InputEmail').val(),
//       password: $('#InputPassword').val()
//     }

//     $.post('/signup', newUser, (data) => {
//       console.log(data);
//     })
//   });
  console.log('main.js loaded')
});
