window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar?.classList.add('navbar-scrolled');
  } else {
    navbar?.classList.remove('navbar-scrolled');
  }
});

window.addEventListener("DOMContentLoaded", function () {
  const videoThumbnails = document.querySelectorAll(".video-thumbnail");
  const videoPopup = document.getElementById("videoPopup");
  const videoFrame = document.getElementById("videoFrame");

  videoThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const videoID = thumbnail.getAttribute("data-video-id");
      videoFrame.src = `https://www.youtube.com/embed/${videoID}?autoplay=1`;
      videoPopup.style.display = "flex";
    });
  });

  // Close popup logic
  if (videoPopup) {
    videoPopup.addEventListener("click", function (e) {
      if (e.target !== this) return; // Ensure we only close when clicking outside the iframe
      videoFrame.src = ""; // Stop the video
      videoPopup.style.display = "none";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", function (event) {
      // Prevent navigation if clicking inside the button
      if (!event.target.closest(".learn-more-button")) {
        window.location.href = this.getAttribute("data-link");
      }
    });
  });
});

$(document).ready(function () {
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
  $(currentDayID).toggleClass("today");

  if (currentDay === "Sunday") {
    $(".openorclosed").removeClass("open").addClass("closed");
    return;
  }

  var openTimeSplit = $(currentDayID).children('.opens').text().split(":");
  var openTimex = parseInt(openTimeSplit[0] + openTimeSplit[1]);
  var closeTimeSplit = $(currentDayID).children('.closes').text().split(":");
  var closeTimex = parseInt(closeTimeSplit[0] + closeTimeSplit[1]);

  if (timeNow >= openTimex && timeNow <= closeTimex) {
    $(".openorclosed").removeClass("closed").addClass("open");
  } else {
    $(".openorclosed").removeClass("open").addClass("closed");
  }
});

/* TRANSLATION SERVICE */
document.addEventListener('DOMContentLoaded', function () {
  const languageButtons = document.querySelectorAll('#languageSwitchBtn');
  const languageSpans = document.querySelectorAll('#currentLanguage');

  const savedLanguage = localStorage.getItem('language');
  currentLanguage = savedLanguage ? savedLanguage : 'gr';

  // Update all language span elements
  languageSpans.forEach(span => {
    span.textContent = currentLanguage.toUpperCase();
  });

  // Add event listeners to all language buttons
  languageButtons.forEach(button => {
    button.addEventListener('click', toggleLanguage);
  });

  loadTranslations(currentLanguage);
});

function toggleLanguage() {
  currentLanguage = currentLanguage === 'gr' ? 'en' : 'gr';

  // Update all language span elements
  document.querySelectorAll('#currentLanguage').forEach(span => {
    span.textContent = currentLanguage.toUpperCase();
  });

  localStorage.setItem('language', currentLanguage);

  loadTranslations(currentLanguage);
}

function loadTranslations(language) {
  const url = `/assets/${language}.json`;
  fetch(url)
    .then(response => response.json())
    .then(data => updateText(data))
    .catch(error => console.error('Error loading translations:', error));
}

function getNestedTranslation(key, translations) {
  return key.split('.').reduce((obj, k) => (obj ? obj[k] : null), translations);
}

function updateText(translations) {
  const elements = document.querySelectorAll('[data-translate]');

  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    const translation = getNestedTranslation(key, translations);

    if (translation) {
      element.innerHTML = translation;
    }
  });
}

window.addEventListener('load', function () {
  const savedLanguage = localStorage.getItem('language');
  currentLanguage = savedLanguage ? savedLanguage : 'gr';
  const currentLanguageElement = document.getElementById('currentLanguage');

  if (currentLanguageElement) {
    currentLanguageElement.textContent = currentLanguage.toUpperCase();
  }

  loadTranslations(currentLanguage);
});

function openNav() {
  console.log("open");
  document.getElementById("mySidenav").style.width = "55vw";
  document.getElementById("burgerButton").style.display = "none";
  document.querySelectorAll('#currentLanguage').forEach(span => {
    span.textContent = currentLanguage.toUpperCase();
  });
}

function closeNav() {
  console.log("close");
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("burgerButton").style.display = "block";
}

document.addEventListener("click", function (event) {
  const sidenav = document.getElementById("mySidenav");
  const burgerButton = document.getElementById("burgerButton");

  // Check if click is outside the sidenav and not on the burger button
  if (sidenav.style.width === "55vw" && !sidenav.contains(event.target) && !burgerButton.contains(event.target)) {
    closeNav();
  }
});