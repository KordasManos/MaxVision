// Script to handle navbar scrolling
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar?.classList.add('navbar-scrolled');
  } else {
    navbar?.classList.remove('navbar-scrolled');
  }
});

// Wait until the DOM is fully loaded to handle video popup functionality
window.addEventListener('DOMContentLoaded', function() {
  // Script to handle video popup on thumbnail click
  const videoThumbnail = document.getElementById('videoThumbnail');
  const videoPopup = document.getElementById('videoPopup');
  const videoFrame = document.getElementById('videoFrame');

  if (videoThumbnail) {
    videoThumbnail.addEventListener('click', function() {
      var videoID = 'm2DMMMonc_0';
      videoFrame.src = 'https://www.youtube.com/embed/' + videoID + '?autoplay=1';
      videoPopup.style.display = 'flex';
    });
  }

  if (videoPopup) {
    videoPopup.addEventListener('click', function(e) {
      if (e.target !== this) return;
      videoFrame.src = ''; // Stop the video
      videoPopup.style.display = 'none';
    });
  }
});

// Opening hours script (ensure it's run after DOM is loaded)
$(document).ready(function() {
    var currentDate = new Date();
    var weekday = [];
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var currentDay = weekday[currentDate.getDay()];
    var currentTimeHours = currentDate.getHours();
    currentTimeHours = currentTimeHours < 10 ? "0" + currentTimeHours : currentTimeHours;
    var currentTimeMinutes = currentDate.getMinutes();
    currentTimeMinutes = currentTimeMinutes < 10 ? "0" + currentTimeMinutes : currentTimeMinutes;
    var timeNow = parseInt(currentTimeHours + "" + currentTimeMinutes);

    var currentDayID = "#" + currentDay;
    $(currentDayID).toggleClass("today"); // highlight today

    // Check if it's Sunday
    if (currentDay === "Sunday") {
        $(".openorclosed").removeClass("open").addClass("closed");
        return; // Exit the script since Sunday is closed
    }

    // Get open and close times for the current day
    var openTimeSplit = $(currentDayID).children('.opens').text().split(":");
    var openTimex = parseInt(openTimeSplit[0] + openTimeSplit[1]);
    var closeTimeSplit = $(currentDayID).children('.closes').text().split(":");
    var closeTimex = parseInt(closeTimeSplit[0] + closeTimeSplit[1]);

    // Determine if the current time is within open hours
    if (timeNow >= openTimex && timeNow <= closeTimex) {
        $(".openorclosed").removeClass("closed").addClass("open");
    } else {
        $(".openorclosed").removeClass("open").addClass("closed");
    }
});
