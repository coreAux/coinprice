const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
const priceTag = document.querySelector("h1");
const spanTag = document.querySelector("span");
let currency = "USD";

// Make a function to grav data from Coindesk
const checkPrice = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      priceTag.innerHTML = data.bpi[currency].rate_float.toFixed(1);
    });
};

// Run on load
checkPrice();

// Loop over every nav-link and add a click-event
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    currency = this.getAttribute("data-currency");
    checkPrice();

    // Remove all previous selected states
    navLinks.forEach((link) => link.classList.remove("selected"));

    // And then only add selected on the clicked link
    link.classList.add("selected");

    // Update the spantag accordingly
    spanTag.innerHTML = currency;
  });
});

// Check the price every 60 seconds
setInterval(() => checkPrice(), 60000);
