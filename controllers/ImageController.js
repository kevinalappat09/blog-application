const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const path = require("path");

cloudinary.config({
    cloud_name: 'dabsq9z2s',
    api_key : '189747693547932',
    api_secret : 'hab3beFF8WiVHPuiKnejriW6Kck'
});

exports.addImage = async (req,res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder : "blog"
        });
        fs.unlinkSync(req.file.path);

        res.json({
            message : "Image added successfully",
            url : result.secure_url,
        });
    } catch (err) {
        console.error('Error in uploading image ', error);
        res.status(500).json({error : "Failed to upload image"});
    }
};