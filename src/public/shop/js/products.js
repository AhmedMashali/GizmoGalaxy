const productsFilterBtn = document.querySelector("#products-filter-btn");
const productsFilter = document.querySelector("#products-filter");
const productsFilterCloseBtn = document.querySelector(
  "#products-filter-close-btn"
);
const productsFilterOverly = document.querySelector("#products-filter-overly");
const filterInput = document.querySelectorAll("#filter-input");
const filterCheck = document.querySelectorAll("#filter-check");
const filterForm = document.querySelector("#filter-form");
const productsList = document.querySelector("#products-list");
const pagenationContainer = document.querySelector("#pagenation");
const pagenationBtns = document.querySelectorAll(".btn--products-list-btn");
const pageType = document.querySelector("#page-type");

const productsFilterToggleShow = () => {
  productsFilter.classList.toggle("products-filter-show");
  body.classList.toggle("hide-scroll");
};

const onChangeFilter = (e) => {
  e.preventDefault();

  // Gather checked filters options
  const data = prepareFormData(e);

  // Construct string of query parameters
  const query = createQueryParams(data);

  const url = createUrl();

  fetch(`${url}?${query}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((resData) => {
      // Remove listed products then insert filtered products
      updateProducts(resData.products);

      // Clear filters then insert new options except for the filter that made the event
      updateFilters(resData.filters, e);

      // Clear pagenation area then insert new pagenation buttons
      updatePagenation(resData.pagenation);
    })
    .catch((err) => console.log(err));
};

productsFilterBtn.addEventListener("click", productsFilterToggleShow);
productsFilterCloseBtn.addEventListener("click", productsFilterToggleShow);
productsFilterOverly.addEventListener("click", productsFilterToggleShow);

filterInput.forEach((f) => {
  f.addEventListener("input", onChangeFilter);
});

pagenationBtns.forEach((btn) => {
  btn.addEventListener("click", onChangeFilter);
});

// DOM helper functions
function productCard(product) {
  const cardContainer = createElement("div", "product-card");
  const cardOverly = createElement("div", "product-card__overly");

  // Card head
  const cardHead = createElement("div", "product-card__head");
  const cardImg = createImg(
    product.images[0],
    product.name,
    "product-card__img"
  );
  cardHead.appendChild(cardImg);

  // Card body
  const cardBody = createElement("div", "product-card__body");
  const cardTitle = createElement("p", "product-card__title");
  cardTitle.appendChild(document.createTextNode(product.title));
  cardBody.appendChild(cardTitle);

  // Card tail
  const cardTail = createElement("div", "product-card__tail");
  const cardPrice = createElement("p", "product-card__price");
  cardPrice.appendChild(document.createTextNode(product.price + "$"));
  cardTail.appendChild(cardPrice);

  // Card actions
  const cardActions = createElement("div", "product-card__actions");
  const cartIcon = createElement("i", "fa-solid fa-cart-plus fa-lg");
  const wishlistIcon = createElement("i", "fa-regular fa-heart fa-lg");
  cardActions.appendChild(cartIcon);
  cardActions.appendChild(wishlistIcon);

  const breakLine1 = createElement("div", "break-line");
  const breakLine2 = createElement("div", "break-line");

  cardContainer.appendChild(cardOverly);
  cardContainer.appendChild(cardHead);
  cardContainer.appendChild(breakLine1);
  cardContainer.appendChild(cardBody);
  cardContainer.appendChild(breakLine2);
  cardContainer.appendChild(cardTail);
  cardContainer.appendChild(cardActions);

  return cardContainer;
}

function createFilterOption(filter) {
  const filterContainer = createElement(
    "div",
    "products-filter__body-element",
    filter.name
  );
  const filterTitle = createElement("p", "products-filter__element-title");

  filterContainer.appendChild(filterTitle);

  filterTitle.appendChild(document.createTextNode(filter.name));
  filter.values.forEach((op) => {
    if (op.count > 0) {
      filterContainer.appendChild(filterValue(filter, op));
    }
  });

  return filterContainer;
}

function createFilterOptionInner(filter, elementContainer) {
  const filterTitle = createElement("p", "products-filter__element-title");

  elementContainer.appendChild(filterTitle);

  filterTitle.appendChild(document.createTextNode(filter.name));
  filter.values.forEach((op) => {
    if (op.count > 0) {
      elementContainer.appendChild(filterValue(filter, op));
    }
  });

  return elementContainer;
}

function filterValue(filter, op) {
  const valueContainer = createElement("label");
  const input = createInput(
    filter.type,
    filter.name,
    op.name,
    null,
    "filter-input"
  );
  // console.log(op.name, op.status);
  if (op.status) {
    input.checked = true;
  }
  // console.log(input);

  const checkMark = createElement("span", "check-mark");
  const checkIcon = createElement("i", "fa-solid fa-check");
  checkMark.appendChild(checkIcon);

  const filterLabel = createElement("div", "products-filter__filter-label");
  const filterName = createElement("div");
  filterName.appendChild(document.createTextNode(op.name));
  const filterCount = createElement("div", "products-count");
  filterCount.appendChild(document.createTextNode(`(${op.count})`));
  filterLabel.appendChild(filterName);
  filterLabel.appendChild(filterCount);

  valueContainer.appendChild(input);
  valueContainer.appendChild(checkMark);
  valueContainer.appendChild(filterLabel);

  return valueContainer;
}

function createPagenation(pagenation) {
  if (pagenation.isPreviousPage) {
    let previousLink = createLink("", "btn btn--products-list-btn");
    let previousIcon = createElement("i", "ri-arrow-left-line");
    previousLink.appendChild(previousIcon);
    previousLink.appendChild(document.createTextNode(" Previous"));
    previousLink.appendChild(
      createInput("hidden", "page", pagenation.previousPage, "page-value")
    );
    pagenationContainer.appendChild(previousLink);
  }

  if (pagenation.currentPage !== 1 && pagenation.previousPage !== 1) {
    let link = createLink("", "btn btn--products-list-btn");
    link.appendChild(document.createTextNode("1"));
    link.appendChild(createInput("hidden", "page", 1, "page-value"));
    pagenationContainer.appendChild(link);
  }

  if (pagenation.currentPage > 3) {
    let previousDots = createElement("div", "products-list-void-btn");
    createElement.appendChild(document.createTextNode("..."));
    pagenationContainer.appendChild(previousDots);
  }

  if (pagenation.isPreviousPage) {
    let previousPage = createLink("", "btn btn--products-list-btn");
    previousPage.appendChild(document.createTextNode(pagenation.previousPage));
    previousPage.appendChild(
      createInput("hidden", "page", pagenation.previousPage, "page-value")
    );
    pagenationContainer.appendChild(previousPage);
  }

  if (pagenation.lastPage !== 1) {
    let currentPage = createLink("", "btn btn--products-list-btn current-page");
    currentPage.appendChild(document.createTextNode(pagenation.currentPage));
    currentPage.appendChild(
      createInput("hidden", "page", pagenation.currentPage, "page-value")
    );
    pagenationContainer.appendChild(currentPage);
  }

  if (pagenation.isNextPage && pagenation.nextPage !== pagenation.lastPage) {
    let nextPage = createLink("", "btn btn--products-list-btn");
    nextPage.appendChild(document.createTextNode(pagenation.nextPage));
    nextPage.appendChild(
      createInput("hidden", "page", pagenation.nextPage, "page-value")
    );
    pagenationContainer.appendChild(nextPage);
  }

  if (pagenation.currentPage < pagenation.lastPage - 2) {
    let nextDots = createElement("div", "products-list-void-btn");
    createElement.appendChild(document.createTextNode("..."));
    pagenationContainer.appendChild(nextDots);
  }

  if (
    pagenation.lastPage !== pagenation.currentPage &&
    pagenation.lastPage !== 1
  ) {
    let lastPage = createLink("", "btn btn--products-list-btn");
    lastPage.appendChild(document.createTextNode(pagenation.lastPage));
    lastPage.appendChild(
      createInput("hidden", "page", pagenation.lastPage, "page-value")
    );
    pagenationContainer.appendChild(lastPage);
  }

  if (pagenation.isNextPage) {
    let nextLink = createLink("", "btn btn--products-list-btn");
    let nextIcon = createElement("i", "ri-arrow-right-line");
    nextLink.appendChild(document.createTextNode("Next "));
    nextLink.appendChild(nextIcon);
    nextLink.appendChild(
      createInput("hidden", "page", pagenation.nextPage, "page-value")
    );
    pagenationContainer.appendChild(nextLink);
  }
}

function createElement(elementName, classList, id) {
  const element = document.createElement(elementName);
  classList ? (element.classList = classList) : null;
  id ? (element.id = id) : null;
  return element;
}

function createImg(src, alt, classList, id) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  classList ? (img.classList = classList) : null;
  id ? (img.id = id) : null;
  return img;
}

function createLink(href, classList, id) {
  const link = createElement("a", classList, id);
  link.href = href;
  return link;
}

function createInput(type, name, value, classList, id) {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  value ? (input.value = value) : null;
  classList ? (input.classList = classList) : null;
  id ? (input.id = id) : null;
  return input;
}

// callbacks Helper functions
function prepareFormData(e) {
  let data = {};

  // Extract form data
  const filterData = new FormData(filterForm);
  const entries = filterData.entries();

  // Construct data object with values in form of arrays
  for (entry of entries) {
    let key = entry[0];
    let value = entry[1];
    if (data[key]) {
      data[key] = [...data[key], value];
    } else {
      data[key] = [value];
    }
  }

  // Append target element to the data object
  data.target = [e.target.name];

  // For pagenation append the page number by checking the target element
  if (e.target.classList[1] === "btn--products-list-btn") {
    data.page = [e.target.querySelector(".page-value").value];
  }

  return data;
}

function createQueryParams(data) {
  let query = "";

  for (prop in data) {
    for (ele of data[prop]) {
      query += prop + "=" + ele + "&";
    }
  }

  return query;
}

function updateProducts(prodcuts) {
  // Clear products list
  while (productsList.firstChild) {
    productsList.removeChild(productsList.firstChild);
  }
  // Insert new products
  prodcuts.forEach((product) => {
    const newProduct = productCard(product);
    productsList.appendChild(newProduct);
  });

  return;
}

function updateFilters(filters, e) {
  filters.forEach((filter) => {
    // Select filter element by id
    // White spaces are removed to match element id
    const filterElement = document.querySelector(
      `#${filter.name.replaceAll(" ", "")}`
    );
    // Ignore the element that made the event
    if (!filter.name !== e.target.name) {
      // Remove event listeners of the filter options
      filterElement.querySelectorAll("#filter-input").forEach((ele) => {
        ele.removeEventListener("input", onChangeFilter);
      });
      // Clear filter
      while (filterElement.firstChild) {
        filterElement.removeChild(filterElement.firstChild);
      }
      // Insert new filter options
      createFilterOptionInner(filter, filterElement);
      // Add event listeners for the new options
      filterElement.querySelectorAll("#filter-input").forEach((ele) => {
        ele.addEventListener("input", onChangeFilter);
      });
    }
  });
}

function updatePagenation(pagenationData) {
  // Remove event listeners from pagenation buttons
  pagenationContainer
    .querySelectorAll(".btn--products-list-btn")
    .forEach((btn) => {
      btn.removeEventListener("click", onChangeFilter);
    });
  // Remove pagination buttons
  while (pagenationContainer.firstChild) {
    pagenationContainer.removeChild(pagenationContainer.firstChild);
  }

  // Create new Pagenation buttons
  createPagenation(pagenationData);

  // Advend et listeners for pagenation buttons
  pagenationContainer
    .querySelectorAll(".btn--products-list-btn")
    .forEach((btn) => {
      btn.addEventListener("click", onChangeFilter);
    });
}

function createUrl() {
  if (pageType.value === "categories") {
    return "http://localhost:8080/products/categories";
  } else {
    return "http://localhost:8080/products/brands";
  }
}
