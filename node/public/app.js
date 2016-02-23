'use strict';

function startApplication() {
  $.getJSON('/status', function (data) {
    // if you'd like to see the data run console.log(data)
    console.log(data);
    if (data.status === 'Training') {
      $("#loading").hide();
      $("#training-status").show();
      $("#ask-question").hide();
      $("#last-status-check").html("Last update at: " + Date());
      setTimeout(startApplication, 10000);
    } else {
      $("#loading").hide();
      $("#training-status").hide();
      $("#ask-question").show();
    }
  });
}

function classifyText() {
  var question = $("#question").val();

  console.log($("#question").val());
  $.getJSON('/classify', {text : question}, function(data) {
    console.log(data);
  });
}