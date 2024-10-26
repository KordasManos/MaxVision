window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar?.classList.add('navbar-scrolled');
  } else {
    navbar?.classList.remove('navbar-scrolled');
  }
});

window.addEventListener('DOMContentLoaded', function() {

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

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.gallery-grid .card img');
  const imagePopup = document.getElementById('imagePopup');
  const carouselInner = document.querySelector('.carousel-inner');
  const closePopup = document.querySelector('.close-popup');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  let currentIndex = 0;
  let images = [];

  cards.forEach((card, index) => {
      images.push(card.src);

      card.addEventListener('click', function () {
          currentIndex = index;
          openModal();
      });
  });

  function openModal() {
      imagePopup.style.display = 'flex';
      updateCarousel();
  }

  closePopup?.addEventListener('click', function () {
      imagePopup.style.display = 'none';
  });

  function updateCarousel() {
      carouselInner.innerHTML = `
          <div class="carousel-item active">
              <img src="${images[currentIndex]}" alt="Gallery Image" />
          </div>`;
  }

  prev?.addEventListener('click', function () {
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
      updateCarousel();
  });

  next?.addEventListener('click', function () {
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      updateCarousel();
  });

  imagePopup?.addEventListener('click', function (e) {
      if (e.target === imagePopup) {
          imagePopup.style.display = 'none';
      }
  });
});


document?.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.gallery-filter button');
    const cards = document.querySelectorAll('.gallery-grid .card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            cards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Dropdown filter functionality
    const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const targetCheck = this.getAttribute('data-check');

            document.getElementById(targetCheck).checked = true;

            document.querySelector(`label[for=${targetCheck}]`).click();
        });
    });
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

window.addEventListener('load', function() {
    const savedLanguage = localStorage.getItem('language');
    currentLanguage = savedLanguage ? savedLanguage : 'gr';
    const currentLanguageElement = document.getElementById('currentLanguage');

    if (currentLanguageElement) {
        currentLanguageElement.textContent = currentLanguage.toUpperCase();
    }

    loadTranslations(currentLanguage);
});
