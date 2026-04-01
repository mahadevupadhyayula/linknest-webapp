const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const targetsController = require('../controllers/targetsController');

const router = express.Router();

router.get('/:id', authMiddleware, targetsController.getTarget);
router.get('/:id/engagement', authMiddleware, targetsController.getTargetEngagement);
router.post('/:id/log', authMiddleware, targetsController.logTargetEngagement);
router.put('/:id/log/:logId', authMiddleware, targetsController.updateTargetEngagement);

module.exports = router;
