const multer = require('multer');
const express = require('express');
const router = express.Router();
const {verifyUser} = require('../verifyToken');
const {superAdminAccess} = require('../controller/userAccessController');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

router.post('/', verifyUser, upload.single('image'), (req, res) => {
    try {
        res.send(`/${req.file.path}`);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;