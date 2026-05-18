const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: "Image data is required" });
    }

    const uploadResult = await cloudinary.uploader.upload(image, {
      folder: process.env.CLOUDINARY_FOLDER || "event-management",
      resource_type: "image",
    });

    return res.status(200).json({
      success: true,
      data: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Cloudinary upload failed",
    });
  }
};

module.exports = {
  uploadImage,
};
