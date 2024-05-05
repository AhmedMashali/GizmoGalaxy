import multer from "multer";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "." + fileExt(file.mimetype));
  },
});

const filter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};

function fileExt(mimetype) {
  return mimetype.split("/")[1];
}

export const upload = multer({ storage: fileStorage, fileFilter: filter });
