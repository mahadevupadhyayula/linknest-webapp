const Goal = require('../models/Goal');
const Activity = require('../models/Activity');

async function initGoal(userId, payload) {
  const { title, contextType = 'general', constraints = [] } = payload;
  return Goal.create({ userId, title, contextType, constraints });
}

function generateGoalQuestions(goal, userGoal = '') {
  const seed = userGoal || goal.title;

  return [
    `What measurable result defines success for "${seed}" in the next 30 days?`,
    'Who are the highest-priority people or companies involved in this goal?',
    'What blockers or constraints should we optimize around?',
  ];
}

async function completeGoal(userId, goalId, answers = []) {
  const goal = await Goal.findOne({ _id: goalId, userId });
  if (!goal) {
    return null;
  }

  goal.answers = answers;
  goal.completedAt = new Date();
  await goal.save();

  await Activity.create({
    userId,
    type: 'goal.completed',
    message: `Completed onboarding goal: ${goal.title}`,
    metadata: { goalId: goal._id },
  });

  return goal;
}

module.exports = {
  initGoal,
  generateGoalQuestions,
  completeGoal,
};
