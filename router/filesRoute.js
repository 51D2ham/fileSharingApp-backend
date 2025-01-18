const express = require ('express')
const { upload, download } = require('../controller/filesController');
const uploadFiles = require('../middleware/fileMiddleware')
const router = require ('express').Router()


//route 
router.post('/upload',uploadFiles.single('file'),upload)
router.get('/download/:uuid', download);

module.exports = router;