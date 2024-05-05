const body = document.querySelector("body");
const searchBtns = document.querySelectorAll("#search-btn");
const searchArea = document.querySelector("#search-area");
const searchCloseBtn = document.querySelector("#search-close-btn");
const searchOverly = document.querySelector("#search-overly");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#search-form");
const searchBody = document.querySelector("#search-body");
const cartBtns = document.querySelectorAll("#cart-btn");
const headerCart = document.querySelector("#header-cart");
const cartOverly = document.querySelector("#header-cart-overly");
const headerCartCloseBtn = document.querySelector("#header-cart-close-btn");
const mobileNavElements = document.querySelectorAll("#mobile-nav-element");
const navElement = document.querySelectorAll(
  ".mobile-nav__element-inner-container"
);
const mobileMenuBtn = document.querySelector("#mobile-menu-btn");
const mobileMenu = document.querySelector("#mobile-nav");
const mobileMenuCloseBtn = document.querySelector("#mobile-menu-close-btn");
const mobileMenuOverly = document.querySelector("#mobile-menu-overly");

const toggleSearchArea = () => {
  searchArea.classList.toggle("search-show");
};

const toggleHeaderCart = () => {
  headerCart.classList.toggle("show-header-cart");
  body.classList.toggle("hide-scroll");
};

// Search Area
searchBtns.forEach((btn) => {
  btn.addEventListener("click", toggleSearchArea);
});
searchOverly.addEventListener("click", toggleSearchArea);
searchCloseBtn.addEventListener("click", toggleSearchArea);
searchInput.addEventListener("input", (e) => {
  if (e.target.value.length >= 2) {
    searchBody.classList.add("search__show-results");
  } else {
    searchBody.classList.remove("search__show-results");
  }
});

// Header Cart
cartBtns.forEach((btn) => {
  btn.addEventListener("click", toggleHeaderCart);
});
cartOverly.addEventListener("click", toggleHeaderCart);
headerCartCloseBtn.addEventListener("click", toggleHeaderCart);

// mobileNavElements.forEach((ele) => {
//   ele.addEventListener("click", (e) => {
//     // console.log(ele.querySelector(".mobile-nav__dropdown-menu"));
//     ele.querySelector(".mobile-nav__dropdown-menu").style.height = "100px";
//   });
// });

navElement.forEach((ele) => {
  ele.addEventListener("click", () => {
    const parent = ele.parentElement;
    const dropdownMenu = parent.querySelector(".mobile-nav__dropdown-menu");
    dropdownMenu.classList.toggle("mobile-nav__dropdown-menu-show");
  });
});

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("mobile-nav-show");
});

mobileMenuCloseBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("mobile-nav-show");
});

mobileMenuOverly.addEventListener("click", () => {
  mobileMenu.classList.toggle("mobile-nav-show");
});
