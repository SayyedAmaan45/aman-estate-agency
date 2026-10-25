import multer from "multer";
import path from "path";

const uploadPath = path.resolve("uploads");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },

filename: (_req, file, cb) => {
  const extension = path.extname(file.originalname);

  const baseName = path
    .basename(file.originalname, extension)
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .toLowerCase();

  const uniqueName = `${Date.now()}-${baseName}${extension}`;

  cb(null, uniqueName);
},
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, and WEBP images are allowed"));
    }
  },
});

export default upload;