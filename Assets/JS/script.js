$(function () {
  // Function to save to local storage
  function saveToLocalStorage(hour, description) {
    localStorage.setItem('description-' + hour, description);
  }

  // Function to retrieve from local storage
  function loadFromLocalStorage(hour) {
    return localStorage.getItem('description-' + hour);
  }

  // Event delegation for save buttons
  $('.container-lg').on('click', '.saveBtn', function () {
    var $timeBlock = $(this).closest('.time-block');
    var hourId = $timeBlock.attr('id').split('-')[1];
    var description = $timeBlock.find('.description').val();
    saveToLocalStorage(hourId, description);
  });

  // Apply past, present, or future class based on current time
  var currentHour = dayjs().hour();
  $('.time-block').each(function () {
    var hourId = parseInt($(this).attr('id').split('-')[1]);
    if (hourId < currentHour) {
      $(this).removeClass('present future').addClass('past');
    } else if (hourId === currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }

    // Set the textarea values from local storage
    var savedDescription = loadFromLocalStorage(hourId);
    if (savedDescription !== null) {
      $(this).find('.description-textarea').val(savedDescription);
    }
  });

  // Display the current date in the header
  var today = dayjs();
  $('#currentDay').text(today.format('MMM D, YYYY'));
});
