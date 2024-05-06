const productsFilterBtn = document.querySelector("#products-filter-btn");
const productsFilter = document.querySelector("#products-filter");
const productsFilterCloseBtn = document.querySelector(
  "#products-filter-close-btn"
);
const productsFilterOverly = document.querySelector("#products-filter-overly");
const filter = document.querySelector("#filter");

const productsFilterToggleShow = () => {
  productsFilter.classList.toggle("products-filter-show");
  body.classList.toggle("hide-scroll");
};

productsFilterBtn.addEventListener("click", productsFilterToggleShow);
productsFilterCloseBtn.addEventListener("click", productsFilterToggleShow);
productsFilterOverly.addEventListener("click", productsFilterToggleShow);

filter.addEventListener("input", (e) => {
  const parent = filter.parentElement;
  console.log(parent.querySelector("#value").value);
});
