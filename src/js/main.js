console.log('Custom code loaded');

$("#submitSurvey").on("click", function(){
    var newSurvey = {
        age: $("#age").val(),
        hobbies: $("#hobbies").val(),
        education: $("#education").val(),
        income: $("#income").val(),
        career: $("#career").val(),
        social: $("#social").val(),
        kids: $("#kids").val(),
        pets: $("#pets").val(),
        lifestyle: $("#lifestyle").val(),
        car: $("#car").val(),
        married: $("#married").val()
      };

      console.log(newSurvey);

    $.post("/api/surveys", newSurvey, function(data) {
        console.log(data);
    });

});