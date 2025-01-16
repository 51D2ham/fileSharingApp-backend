const File = require('../models/uploadModel');
const { v4: uuid4 } = require('uuid');
const path = require('path');

const upload = async (req, res) => {
    try {
        // Ensure a file is provided
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Create a new file record
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size,
        });

        // Save file metadata to the database
        const response = await file.save();

        // Return the file download link
        return res.json({
            file: `${process.env.APP_BASE_URL}/files/${response.uuid}`, 
            // ==>> http://localhost:port/files/uuid
        });
    } catch (err) {
        console.error('Error during file upload:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { upload };