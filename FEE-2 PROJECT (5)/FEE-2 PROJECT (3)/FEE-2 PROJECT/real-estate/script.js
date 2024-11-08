'use strict';

/**
 * element toggle function
 */
const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/**
 * navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [overlay, navCloseBtn, navOpenBtn];

/**
 * close navbar when click on any navbar link
 */
for (let i = 0; i < navbarLinks.length; i++) {
  navElemArr.push(navbarLinks[i]);
}

/**
 * add event on all elements for toggling navbar
 */
for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}

/**
 * header active state
 */
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400 ? header.classList.add("active")
    : header.classList.remove("active");
});

/**
 * Resize functionality
 */
function toggleResize(card) {
  card.classList.toggle('enlarged'); // Toggle the 'enlarged' class to resize the card
}

// Add event listeners to all resize buttons
document.querySelectorAll('.resize-btn').forEach(button => {
  button.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent event bubbling
    const card = this.closest('.property-card'); // Find the nearest property card
    toggleResize(card); // Toggle the size of the card
  });
});

/**
 * Heart button functionality
 */
function toggleHeart(button) {
  const heartIcon = button.querySelector('ion-icon');
  if (heartIcon.getAttribute("name") === "heart-outline") {
    heartIcon.setAttribute("name", "heart"); // Change to filled heart
  } else {
    heartIcon.setAttribute("name", "heart-outline"); // Change back to outline
  }
}

// Add event listeners to all heart buttons
document.querySelectorAll('.heart-btn').forEach(button => {
  button.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent event bubbling
    toggleHeart(this); // Toggle the heart icon
  });
});

/**
 * Add button functionality (Example: Add to favorites)
 */
function handleAddButtonClick(event) {
  event.stopPropagation(); // Prevent event bubbling
  const card = this.closest('.property-card'); // Get the closest property card
  const propertyTitle = card.querySelector('.card-title a').innerText; // Get the title of the property

  alert(`Added ${propertyTitle} to your favorites!`); // Example action: alert with property name
}

// Add event listeners to all add buttons
document.querySelectorAll('.add-btn').forEach(button => {
  button.addEventListener('click', handleAddButtonClick);
});

// Smooth scroll for CTA button
document.querySelector('.cta-btn').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default anchor behavior
  const targetId = this.getAttribute('href');
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
  }
});

/**
 * Asynchronous function to fetch properties data
 */
async function fetchProperties() {
  // Use setTimeout to simulate a delay before fetching
  setTimeout(async () => {
    try {
      const response = await fetch('properties.json'); // Path to the JSON file
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      alert(`Fetched Properties: ${JSON.stringify(data.properties)}`); // Display fetched data in an alert
      console.log(data.properties); // Log the properties to the console
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }, 2000); // Delay of 2 seconds before fetching
}

// Add event listener to the fetch data button
document.querySelector('.fetch-data-btn').addEventListener('click', fetchProperties);
