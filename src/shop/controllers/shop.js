export const getIndex = (req, res, next) => {
  res.render("index", {
    pageTitle: "Gizmo Galaxy",
  });
};
