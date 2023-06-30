const express = require('express')
const router = express.Router();
require("dotenv").config();
const cloudinary = require('cloudinary');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const log = console.log;

cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET
  });

  // a POST route to *create* an image
router.post("/image", multipartMiddleware, (req, res) => {
    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {
                res.send({url: result.url, public_id: result.public_id});
        }).catch((error) => {
            log(error)
            res.status(500).send("Internal Server Error")
        });
});

router.delete("/image/:imageId", (req, res) => {
    const imageId = req.params.imageId;

    cloudinary.uploader.destroy(imageId, function (result) {
            res.send(result);
    }).catch((error) => {
        log(error)
        res.status(500).send("Internal Server Error")
    });
});


module.exports = router;