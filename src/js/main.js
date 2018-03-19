$(document).ready(function() {
  console.log("Custom code loaded");

  $(".st-container").on("click", "#submitSurvey", function(submit) {
    submit.preventDefault();
    var newSurvey = {
      address: $("#address").val(),
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
      lifestyle: $("#lifestyle").val(),
      social: $("#social").val()
    };

    $.post("/api/surveys", newSurvey, function(data) {
      console.log(data);
    });
  });
});
