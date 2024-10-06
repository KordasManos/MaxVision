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
                  card.style.display = 'block'; // Show the matching card
              } else {
                  card.style.display = 'none'; // Hide the non-matching card
              }
          });
      });
  });
});

/* TRANSLATION SERVICE */

let currentLanguage = 'gr'; // Set default language to Greek


// Load translations from JSON file
function loadTranslations() {
  fetch(`translations-${currentLanguage}.json`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(translations => {
          console.log('Loaded translations:', translations); // Log loaded translations for debugging
          
          // Find all elements with translate attribute
          document.querySelectorAll('[translate]').forEach(element => {
              // const innerText = element.innerText.trim(); // Get trimmed inner text
              // console.log('Element innerText:', innerText); // Log the inner text

              const innerText = "{{ CARCLEANING | TRANSLATE }}";
              const containsTranslate = innerText.includes('| translate');
              const keyMatch = innerText.match(/{{\s*(.+?)\s*\|\s*translate\s*}}/i);
              console.log('Contains "| translate"?', containsTranslate); // Returns true or false
              console.log('keyMatch ', keyMatch); // Returns true or false
              // Log the matched key for debugging
              if (keyMatch && keyMatch[1]) {
                  const translationKey = keyMatch[1]; // Extract key
                  console.log('Extracted key:', translationKey);

                  // Check if the key exists in the translations
                  if (translations[translationKey]) {
                      element.innerText = translations[translationKey]; // Replace text with translation
                  } else {
                      console.warn(`Translation for key "${translationKey}" not found`); // Warn if translation not found
                  }
              } else {
                  console.warn(`No match found for innerText: "${innerText}"`); // Log if no match found
              }
          });
      })
      .catch(error => console.error('Error loading translations:', error));
}



// Toggle language when the button is clicked
document.getElementById('toggleLanguage').addEventListener('click', function() {
    // Switch language
    currentLanguage = (currentLanguage === 'gr') ? 'en' : 'gr';
    this.innerText = (currentLanguage === 'gr') ? 'EN' : 'GR'; // Update button text
    loadTranslations(); // Load new translations
});

// Load default translations on page load
window.addEventListener('DOMContentLoaded', loadTranslations);

