export const getIndex = (req, res, next) => {
  return res.render("admin/index", {
    pageTitle: "GizmoGalaxy",
  });
};
