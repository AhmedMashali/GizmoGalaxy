export const getIndex = (req, res, next) => {
  return res.render("index", {
    pageTitle: "GizmoGalaxy",
  });
};
