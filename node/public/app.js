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

  $('#question-text').empty().append('Watson is thinking...');
  $('#question-responses-container').empty();
  $.getJSON('/classify', {text : question}, function(data) {
    $('#question-text').html('<span class="you-asked">You asked: </span><span class="your-question">' + question + '</span>');
    $('#question-responses-container').append('<ul id="question-responses"></ul>');
    data.classes.forEach(function loopData (elem) {
      $('#question-responses').append($('<li>' + elem.class_name + '</li>'));
    });
  });
}