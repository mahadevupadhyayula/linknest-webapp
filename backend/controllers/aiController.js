const goalsService = require('../services/goalsService');
const aiService = require('../services/aiService');

async function goalQuestions(req, res) {
  try {
    const { goalId, user_goal: userGoal = '' } = req.body;

    if (!goalId) {
      return res.status(400).json({ message: 'goalId is required' });
    }

    const goal = { _id: goalId, title: userGoal || 'Goal' };
    const questions = goalsService.generateGoalQuestions(goal, userGoal);

    return res.status(200).json({ questions });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to generate goal questions', error: error.message });
  }
}

async function smartContent(req, res) {
  try {
    const { context_type: contextType, content, user_goal: userGoal, constraints } = req.body;
    if (!contextType || !content || !userGoal) {
      return res
        .status(400)
        .json({ message: 'context_type, content, and user_goal are required' });
    }

    const draft = aiService.draftSmartContent({
      context_type: contextType,
      content,
      user_goal: userGoal,
      constraints,
    });

    return res.status(200).json(draft);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to draft AI content', error: error.message });
  }
}

async function profileAnalyze(req, res) {
  try {
    const analysis = aiService.analyzeProfile(req.body);
    return res.status(200).json(analysis);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to analyze profile', error: error.message });
  }
}

async function engagementSuggestions(req, res) {
  try {
    const suggestions = aiService.generateEngagementSuggestions(req.body);
    return res.status(200).json(suggestions);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to generate engagement suggestions', error: error.message });
  }
}

module.exports = {
  goalQuestions,
  smartContent,
  profileAnalyze,
  engagementSuggestions,
};
