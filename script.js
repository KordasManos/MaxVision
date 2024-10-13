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
      var videoID = 'kLtlUzhgmig';
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

// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.gallery-grid .card img');
  const imagePopup = document.getElementById('imagePopup');
  const carouselInner = document.querySelector('.carousel-inner');
  const closePopup = document.querySelector('.close-popup');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  let currentIndex = 0;
  let images = [];

  // Collect all images from the gallery cards
  cards.forEach((card, index) => {
      images.push(card.src);
      
      // Add click event to each image
      card.addEventListener('click', function () {
          currentIndex = index;
          openModal();
      });
  });

  // Open the modal and display the current image
  function openModal() {
      imagePopup.style.display = 'flex';
      updateCarousel();
  }

  // Close the modal
  closePopup?.addEventListener('click', function () {
      imagePopup.style.display = 'none';
  });

  // Update carousel with the current image
  function updateCarousel() {
      carouselInner.innerHTML = `
          <div class="carousel-item active">
              <img src="${images[currentIndex]}" alt="Gallery Image" />
          </div>`;
  }

  // Navigate to the previous image
  prev?.addEventListener('click', function () {
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
      updateCarousel();
  });

  // Navigate to the next image
  next?.addEventListener('click', function () {
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      updateCarousel();
  });

  // Close the modal when clicking outside the carousel content
  imagePopup?.addEventListener('click', function (e) {
      if (e.target === imagePopup) {
          imagePopup.style.display = 'none';
      }
  });
});


document?.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.gallery-filter button');
  const cards = document.querySelectorAll('.gallery-grid .card');

  // Add event listeners to all filter buttons
  filterButtons.forEach(button => {
      button.addEventListener('click', function () {
          const filterValue = this.getAttribute('data-filter');

          // Remove the 'active' class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Add 'active' class to the clicked button
          this.classList.add('active');

          // Show/hide cards based on filter
          cards.forEach(card => {
              if (filterValue === 'all' || card.classList.contains(filterValue)) {
                  card.style.display = 'block';
              } else {
                  card.style.display = 'none';
              }
          });
      });
  });
});

/* TRANSLATION SERVICE */
let currentLanguage; // Declare the variable to hold the current language

document.addEventListener('DOMContentLoaded', function () {
    const languageToggleButton = document.getElementById('languageSwitchBtn');
    const currentLanguageElement = document.getElementById('currentLanguage'); // Declare and assign

    // Add event listener for language toggle
    if (languageToggleButton) {
        languageToggleButton.addEventListener('click', toggleLanguage);
    }

    // Check localStorage for a saved language; if none, default to 'gr'
    const savedLanguage = localStorage.getItem('language');
    currentLanguage = savedLanguage ? savedLanguage : 'gr'; // Default to 'gr'

    // Check if the currentLanguageElement exists before trying to set textContent
    if (currentLanguageElement) {
        currentLanguageElement.textContent = currentLanguage.toUpperCase();
    }

    // Load translations based on the current language
    loadTranslations(currentLanguage);
});

// Function to toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'gr' ? 'en' : 'gr';
    const currentLanguageElement = document.getElementById('currentLanguage'); // Declare inside function

    // Check if the currentLanguageElement exists before trying to set textContent
    if (currentLanguageElement) {
        currentLanguageElement.textContent = currentLanguage.toUpperCase();
    }

    // Store the selected language in localStorage
    localStorage.setItem('language', currentLanguage);

    // Load translations for the selected language
    loadTranslations(currentLanguage);
}

// Load translations based on the current language
function loadTranslations(language) {
    const url = `/assets/${language}.json`;
    fetch(url)
        .then(response => response.json())
        .then(data => updateText(data))
        .catch(error => console.error('Error loading translations:', error));
}

// Function to get nested translation
function getNestedTranslation(key, translations) {
    return key.split('.').reduce((obj, k) => (obj ? obj[k] : null), translations);
}

// Function to update text elements
function updateText(translations) {
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getNestedTranslation(key, translations);
        
        if (translation) {
            element.textContent = translation;
        }
    });
}

// Load default language on page load (if not already handled)
window.addEventListener('load', function() {
    // Set current language and update the display
    const savedLanguage = localStorage.getItem('language');
    currentLanguage = savedLanguage ? savedLanguage : 'gr';
    const currentLanguageElement = document.getElementById('currentLanguage'); // Declare here too

    if (currentLanguageElement) {
        currentLanguageElement.textContent = currentLanguage.toUpperCase();
    }

    loadTranslations(currentLanguage);
});
