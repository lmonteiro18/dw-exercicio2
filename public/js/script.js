let canvas;
window.onload = function() {
  let main = document.querySelector("main");
  main.style.opacity="1";
  canvas = document.querySelector("canvas");
  canvas.style.float = "right";
}

let cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
}

let personalInfo = document.querySelector(".personalInfo");
let infoOverlays = document.querySelectorAll(".sobreMim__overlay, .contactos__overlay, .projetos__overlay");
let info = document.querySelectorAll(".sobreMim__info, .contactos__info");
let infoSections = document.querySelectorAll(".sobreMim, .contactos, .projetos");
let arrowsDesktop = document.querySelectorAll(".arrow-desktop");
let arrowsMobile = document.querySelectorAll(".arrow-mobile");

infoOverlays.forEach(function(overlay, index) {
  overlay.addEventListener("click", function() {
    if (window.outerWidth <= 768) {
      if (index === 1) {
        personalInfo.classList.toggle("moveInfo");
      } else if (index === 2) {
        personalInfo.classList.toggle("moveInfo2");
        canvas.classList.toggle("moveCanvas");
      }
      arrowsMobile[index].classList.toggle("hideArrow");

      let closedHeight = (window.outerHeight / 3).toFixed(3).toString() + "px";
      if (index === 0 || index === 1) {
        if (infoSections[index].style.height === "" || infoSections[index].style.height === closedHeight) {
          infoSections[index].style.height = (window.outerHeight).toString() + "px";
        } else {
          infoSections[index].style.height = (window.outerHeight / 3).toString() + "px";
        }
        info[index].classList.toggle("toggleBlur");
        overlay.classList.toggle("moveOverlay");
      } else {
        overlay.classList.toggle("moveOverlay2");
      }
    } else {
      if (index === 0 || index === 1) {
        overlay.classList.toggle("moveOverlay");
        info[index].classList.toggle("toggleBlur");
        arrowsDesktop[index].classList.toggle("hideArrow");
        if (index === 0) {
          infoOverlays[1].classList.remove("moveOverlay");
          info[1].classList.add("toggleBlur");
          arrowsDesktop[1].classList.add("hideArrow");
        } else if (index === 1) {
          infoOverlays[0].classList.remove("moveOverlay");
          info[0].classList.add("toggleBlur");
          arrowsDesktop[0].classList.add("hideArrow");
        }
      }
    }
  });
});

/*let personalInfo = document.querySelector(".personalInfo");

let over1 = false;
let over2 = false;
let over3 = false;

personalInfo.addEventListener("mouseOver", function() {
  if (!cursor.classList.contains("changeColor")) {
    cursor.classList.add("changeColor");
  }
  over1 = true;
});
personalInfo.addEventListener("mouseOut", function() {
  if (over2 !== true && over3 !== true) {
    if (cursor.classList.contains("changeColor")) {
      cursor.classList.remove("changeColor");
    }
  }
  over1 = false;
});

infoOverlays.forEach(function(overlay, index) {
  overlay.addEventListener("mouseOver", function() {
    if (!cursor.classList.contains("changeColor")) {
      cursor.classList.add("changeColor");
    }
    over2 = true;
  });
  overlay.addEventListener("mouseOut", function() {
    if (over1 !== true && over3 !== true) {
      if (cursor.classList.contains("changeColor")) {
        cursor.classList.remove("changeColor");
      }
    }
    over2 = false;
  });

  info[index].addEventListener("mouseOver", function() {
    if (!cursor.classList.contains("changeColor")) {
      cursor.classList.add("changeColor");
    }
    over3 = true;
  });
  info[index].addEventListener("mouseOut", function() {
    if (over1 !== true && over2 !== true) {
      if (cursor.classList.contains("changeColor")) {
        cursor.classList.remove("changeColor");
      }
    }
    over3 = false;
  });
});*/
