window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
  } else {
      navbar.classList.remove('navbar-scrolled');
  }
});


document.getElementById('videoThumbnail').addEventListener('click', function() {
  var videoPopup = document.getElementById('videoPopup');
  var videoFrame = document.getElementById('videoFrame');
  var videoID = 'm2DMMMonc_0';

  videoFrame.src = 'https://www.youtube.com/embed/' + videoID + '?autoplay=1';
  videoPopup.style.display = 'flex';
});

document.getElementById('videoPopup').addEventListener('click', function(e) {
  if (e.target !== this) return;

  var videoPopup = document.getElementById('videoPopup');
  var videoFrame = document.getElementById('videoFrame');

  videoFrame.src = '';
  videoPopup.style.display = 'none';
});