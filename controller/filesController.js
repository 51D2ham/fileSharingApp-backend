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
            file: `${process.env.APP_BASE_URL}/api/file/download/${response.uuid}`, 
            // ==>> http://localhost:port/api/file/download/uuid  
        });
    } catch (err) {
        console.error('Error during file upload:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// downloading the file
const download = async (req, res) => {
    try {
        //  uuid from request parameters
        const { uuid } = req.params;

        // Find the file in the database
        const file = await File.findOne({ uuid });
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Serve the file for download
        const filePath = path.resolve(file.path); // Ensure full file path
        return res.download(filePath, file.filename, (err) => {    // res.download
            if (err) {
                console.error('Error during file download:', err.message);
                res.status(500).json({ error: 'Could not download the file' });
            }
        });
    } catch (err) {
        console.error('Error during file download:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { upload,download };