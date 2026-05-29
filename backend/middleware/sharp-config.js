const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res, next) => {
  if (!req.file) return next();

  const inputPath = req.file.path;
  const outputFilename = `optimized_${req.file.filename.replace(/\.[^.]+$/, '.webp')}`;
  const outputPath = path.join('images', outputFilename);

  try {
    await sharp(inputPath)
      .resize(400, 600, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);

    fs.unlinkSync(inputPath);

    req.file.filename = outputFilename;
    req.file.path = outputPath;
    next();
  } catch (error) {
    next(error);
  }
};
