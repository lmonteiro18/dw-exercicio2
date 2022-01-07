let file = 'landingPage_animation.json';

let landingPageAnimation = lottie.loadAnimation({
  container: document.getElementById('LandingPageAnimation'), // Required
  path: 'animation/' + file, // Required
  renderer: 'svg', // Required
  loop: false, // Optional
  autoplay: true, // Optional
  name: "LandingPageAnimation", // Name for future reference. Optional.
});

let containerAnimation = document.querySelector(".container-animation");
let animation = document.getElementById('LandingPageAnimation');

if(window.outerWidth > window.outerHeight){
  animation.style.height = "100vh";
  animation.style.width = "auto";
}else{
  animation.style.width = "100%";
  animation.style.height = "auto";
}

window.onload = landingPageAnimation.play();
setTimeout(() => {
  containerAnimation.style.opacity = "0";
  animation.style.opacity = "0";
}, 14000);
landingPageAnimation.addEventListener("complete", function() {
  landingPageAnimation.destroy();
  location.assign("/home");
});
