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
let currentLanguage;

document.addEventListener('DOMContentLoaded', function () {
  const languageToggleButton = document.getElementById('languageSwitchBtn');
  const currentLanguageElement = document.getElementById('currentLanguage');

  if (languageToggleButton) {
    languageToggleButton.addEventListener('click', toggleLanguage);
  }

  const savedLanguage = localStorage.getItem('language');
  currentLanguage = savedLanguage ? savedLanguage : 'gr';

  if (currentLanguageElement) {
    currentLanguageElement.textContent = currentLanguage.toUpperCase();
  }

  loadTranslations(currentLanguage);
});

function toggleLanguage() {
  currentLanguage = currentLanguage === 'gr' ? 'en' : 'gr';
  const currentLanguageElement = document.getElementById('currentLanguage');

  if (currentLanguageElement) {
    currentLanguageElement.textContent = currentLanguage.toUpperCase();
  }

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
