let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}
// toggle spin class on icon
document.querySelector(".gear .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};
//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

//switch random background
const randomBackEl = document.querySelectorAll(".random-background span");
//loop on all span
randomBackEl.forEach((span) => {
  // click on every span
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(theBackInterval);
      localStorage.setItem("background_option", false);
    }
  });
});
// select landing page element
let landingPage = document.querySelector(".landing-page");
// get array of imges
let imgsArray = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.png",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
];
// random background option
let backgroundOption = true;
// variable to control the interval
let theBackInterval;
// chick if ther is localStorage random background item
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // remove active class from all spans
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}
// function to randomize imges
function randomizeImgs() {
  if (backgroundOption) {
    theBackInterval = setInterval(() => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      //change background image url
      landingPage.style.backgroundImage =
        "url('images/" + imgsArray[randomNumber] + "')";
    }, 1000);
  }
}
randomizeImgs();

// select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  // skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // window height
  let windowHeight = window.innerHeight;
  // window scroll top
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create Popup with the image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // creat Overlay
    let overlay = document.createElement("div");
    // add class to overlay
    overlay.className = "popup-overlay";
    // append overlay yo the body
    document.body.appendChild(overlay);
    // creat popup
    let popupBox = document.createElement("div");
    // add class to popup box
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      // creat heading
      let imgHeading = document.createElement("h3");
      // creat txt for heading
      let imgText = document.createTextNode(img.alt);
      // append the txt to the heading
      imgHeading.appendChild(imgText);
      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }
    // creat the image
    let popupImage = document.createElement("img");
    //  set imaage source
    popupImage.src = img.src;
    // add image to popup box
    popupBox.appendChild(popupImage);
    // append popup box to body
    document.body.appendChild(popupBox);
    // creat the close span
    let closeButton = document.createElement("span");
    // creat the close button text
    let closeButtonText = document.createTextNode("X");
    // append text to close button
    closeButton.appendChild(closeButtonText);
    // add class to colse botton
    closeButton.className = "close-button";
    // add close button to popup box
    popupBox.appendChild(closeButton);
  });
});
// close popup box
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // remove current popup
    e.target.parentNode.remove();
    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});
// select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(
  ".landing-page .header-area .links li a"
);

function scrollToSomeWhere(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomeWhere(allLinks);
scrollToSomeWhere(allBullets);

let bulletsSpan = document.querySelectorAll(".show-bollets span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullet_option");

function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  e.target.classList.add("active");
}

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".show-bollets .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".show-bollets .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullet_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullet_option", "none");
    }
    handleActive(e);
  });
});
// reset button

document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullet_option");
  window.location.reload();
};
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

tLinks.onclick = function (e) {
  e.stopPropagation();
};
