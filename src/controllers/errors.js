export const get404 = (req, res, next) => {
  res.status(400).render("errors/404", {
    pageTitle: "Page Not Found!",
  });
};

export const get505 = (error, req, res, next) => {
  res.status(500).render("errors/500", {
    pageTitle: "Internal Server Error!",
  });
};
