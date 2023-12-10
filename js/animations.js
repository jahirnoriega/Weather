const pageContent = document.querySelector(".container");

// Remove the 'loaded' class if it's present
pageContent.classList.remove("loaded");

// Trigger a reflow (forcing a re-render) to restart the animation
void pageContent.offsetWidth;

// Add the 'loaded' class to trigger the animation
pageContent.classList.add("loaded");
