const express = require('express');
const router = express.Router();
const pageController = require('../controllers/page.controller');

// Rute untuk Tugas Bagian 2 (Form Komentar)
router.get('/komentar', pageController.renderKomentar);
router.post('/komentar', pageController.submitKomentar);

module.exports = router;