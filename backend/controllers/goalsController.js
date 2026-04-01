const goalsService = require('../services/goalsService');

async function initGoal(req, res) {
  try {
    const { title, contextType, constraints } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'title is required' });
    }

    const goal = await goalsService.initGoal(req.user._id, { title, contextType, constraints });
    return res.status(201).json({ goal });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to initialize goal', error: error.message });
  }
}

async function completeGoal(req, res) {
  try {
    const { goalId, answers } = req.body;
    if (!goalId) {
      return res.status(400).json({ message: 'goalId is required' });
    }

    const goal = await goalsService.completeGoal(req.user._id, goalId, answers);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    return res.status(200).json({ goal });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to complete goal', error: error.message });
  }
}

module.exports = {
  initGoal,
  completeGoal,
};
