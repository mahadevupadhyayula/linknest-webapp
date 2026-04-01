const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const aiController = require('../controllers/aiController');

const router = express.Router();

router.post('/goal-questions', authMiddleware, aiController.goalQuestions);
router.post('/smart-content', authMiddleware, aiController.smartContent);
router.post('/profile-analyze', authMiddleware, aiController.profileAnalyze);
router.post('/engagement-suggestions', authMiddleware, aiController.engagementSuggestions);

module.exports = router;
