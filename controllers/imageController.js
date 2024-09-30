const bucket = require('../config/firebase'); // Import the configured Firebase bucket
const { v4: uuidv4 } = require('uuid'); // Generate unique identifiers
const path = require('path');
const fs = require('fs');

// Helper function to upload image to Firebase and return the URL
async function uploadImageToFirebase(filePath, fileName) {
    const options = {
        destination: `menu_products/${fileName}`,
        metadata: {
            contentType: 'image/jpeg',
            metadata: {
                firebaseStorageDownloadTokens: uuidv4(),
            },
        },
    };

    await bucket.upload(filePath, options);

    // Get the public URL for the file
    const file = bucket.file(`menu_products/${fileName}`);
    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2500',
    });

    return url;
}

// Image upload endpoint
exports.uploadImage = async (req, res) => {
    try {
        // Check if an image file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        // Upload the image to Firebase
        const filePath = req.file.path;
        const fileName = `${uuidv4()}${path.extname(req.file.originalname)}`;
        const photo_url = await uploadImageToFirebase(filePath, fileName);

        // Delete the file from local storage after upload
        fs.unlinkSync(filePath);

        res.status(201).json({ message: 'Image uploaded successfully', photo_url });
    } catch (err) {
        res.status(500).json({ message: 'Error uploading image', error: err.message });
    }
};
