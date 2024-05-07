const productsFilterBtn = document.querySelector("#products-filter-btn");
const productsFilter = document.querySelector("#products-filter");
const productsFilterCloseBtn = document.querySelector(
  "#products-filter-close-btn"
);
const productsFilterOverly = document.querySelector("#products-filter-overly");
const filterRadio = document.querySelectorAll("#filterRadio");
const filterCheck = document.querySelectorAll("#filter-check");
const filterFrom = document.querySelector("#filter-form");

const productsFilterToggleShow = () => {
  productsFilter.classList.toggle("products-filter-show");
  body.classList.toggle("hide-scroll");
};

productsFilterBtn.addEventListener("click", productsFilterToggleShow);
productsFilterCloseBtn.addEventListener("click", productsFilterToggleShow);
productsFilterOverly.addEventListener("click", productsFilterToggleShow);

let data = {};

filterRadio.forEach((f) => {
  f.addEventListener("input", (e) => {
    data = {};
    const filterData = new FormData(filterFrom);
    const entries = filterData.entries();

    for (entry of entries) {
      let key = entry[0];
      let value = entry[1];
      if (data[key]) {
        data[key] = [...data[key], value];
      } else {
        data[key] = [value];
      }
    }

    data = JSON.stringify(data);

    fetch("http://localhost:8080/test", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: data,
    });
  });
});

// filterCheck.forEach((f) => {
//   f.addEventListener("input", () => {
//     const parent = f.parentElement;
//     const param = parent.querySelector("#filterParam").value;
//     const paramValue = parent.querySelector("#filterValue").value;
//     if (!filterParams[`${param}`]) {
//       filterParams[`${param}`] = [paramValue]
//     } else {
//       if (paramValue in filterParams[`${param}`]) {
//         console.log('exist');
//       } else {
//         console.log('not exist')
//       }
//     }
//     filterParams[`${param}`] = paramValue;
//     console.log(filterParams);
//   });
// });

// filterCheck.forEach((f) => {
//   f.addEventListener("input", () => {
//     console.log(f.value);
//   });
// });
