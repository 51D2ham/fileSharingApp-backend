const express = require ('express')
const { upload } = require('../controller/filesController');
const uploadFiles = require('../middleware/fileMiddleware')
const router = require ('express').Router()


//route 
router.post('/upload',uploadFiles.single('file'),upload)

module.exports = router;