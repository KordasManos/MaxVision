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

// Portfolio filtering functionality
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.portfolio-grid .card img');
  const imagePopup = document.getElementById('imagePopup');
  const carouselInner = document.querySelector('.carousel-inner');
  const closePopup = document.querySelector('.close-popup');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  let currentIndex = 0;
  let images = [];

  // Collect all images from the portfolio cards
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
              <img src="${images[currentIndex]}" alt="Portfolio Image" />
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
  const filterButtons = document.querySelectorAll('.portfolio-filter button');
  const cards = document.querySelectorAll('.portfolio-grid .card');

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

/*AYTO THELEI FTIAKSIMO*/
const slider = document.getElementById('before-after-slider');
const before = document.getElementById('before-image');
const beforeImage = before.getElementsByTagName('img')[0];
const resizer = document.getElementById('resizer');

let active = false;

//Sort overflow out for Overlay Image
document.addEventListener("DOMContentLoaded", function() {
  let width = slider.offsetWidth;
  beforeImage.style.width = width + 'px';
});

//Adjust width of image on resize 
window.addEventListener('resize', function() {
  let width = slider.offsetWidth;
  beforeImage.style.width = width + 'px';
})

resizer.addEventListener('mousedown',function(){
  active = true;
 resizer.classList.add('resize');

});

document.body.addEventListener('mouseup',function(){
  active = false;
 resizer.classList.remove('resize');
});

document.body.addEventListener('mouseleave', function() {
  active = false;
  resizer.classList.remove('resize');
});

document.body.addEventListener('mousemove',function(e){
  if (!active) return;
  let x = e.pageX;
  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

resizer.addEventListener('touchstart',function(){
  active = true;
  resizer.classList.add('resize');
});

document.body.addEventListener('touchend',function(){
  active = false;
  resizer.classList.remove('resize');
});

document.body.addEventListener('touchcancel',function(){
  active = false;
  resizer.classList.remove('resize');
});

//calculation for dragging on touch devices
document.body.addEventListener('touchmove',function(e){
  if (!active) return;
  let x;
  
  let i;
  for (i=0; i < e.changedTouches.length; i++) {
  x = e.changedTouches[i].pageX; 
  }
  
  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

function slideIt(x){
    let transform = Math.max(0,(Math.min(x,slider.offsetWidth)));
    before.style.width = transform+"px";
    resizer.style.left = transform-0+"px";
}

//stop divs being selected.
function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}

