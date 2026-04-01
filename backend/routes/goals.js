const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const goalsController = require('../controllers/goalsController');

const router = express.Router();

router.post('/init', authMiddleware, goalsController.initGoal);
router.post('/complete', authMiddleware, goalsController.completeGoal);

module.exports = router;
