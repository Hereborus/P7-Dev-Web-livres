const multer = require("multer");
const sharp = require("sharp");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, callback) => {
        if (MIME_TYPES[file.mimetype]) {
            callback(null, true);
        } else {
            callback(new Error("Format non supporté"), false);
        }
    },
}).single("image");

const compress = async (req, res, next) => {
    if (!req.file) return next();
    try {
        const name = req.file.originalname.split(" ").join("_").split(".")[0];
        const filename = name + Date.now() + ".webp";
        await sharp(req.file.buffer).webp({ quality: 80 }).toFile(`images/${filename}`);
        req.file.filename = filename;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = { upload, compress };
