
(function() {

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }


  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

/* Carousel Time */
const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    isLeft = e.target.classList.contains("arrow-left");

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }
    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].classList.add("current-item");
  });
});

setInterval(timer, 1500);
function timer(){
    currentItem += 1

    if (currentItem >= maxItems) {
        currentItem = 0;
      }
    if (currentItem < 0) {
        currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].classList.add("current-item");
}

// function toggleDarkMode() {
//   const body = document.body;
//   body.classList.toggle('dark-mode');
// }

let synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();
let darkMode = true;

function startReading() {
  const content = document.querySelector('body').innerText;
  utterance.text = content;
  utterance.lang = 'pt-BR';
  utterance.rate = 1;
  synth.speak(utterance);
  document.getElementById('startButton').style.display = 'none';
  document.getElementById('stopButton').style.display = 'inline-block';
}

function stopReading() {
  if (synth.speaking) {
    synth.cancel();
    document.getElementById('stopButton').style.display = 'none';
    document.getElementById('startButton').style.display = 'inline-block';
  }
}

function toggleDarkMode() {
  const darkModeButton = document.getElementById('darkModeButton');
  const lightModeButton = document.getElementById('lightModeButton');
  darkModeButton.style.display = 'none';
  lightModeButton.style.display = 'inline-block';
  const body = document.body;
  body.classList.toggle('dark-mode');
  darkMode = false;
}

function toggleLightMode() {
  const darkModeButton = document.getElementById('darkModeButton');
  const lightModeButton = document.getElementById('lightModeButton');
  darkModeButton.style.display = 'inline-block';
  lightModeButton.style.display = 'none';
  const body = document.body;
  body.classList.toggle('dark-mode');
  darkMode = true;
}