const Target = require('../models/Target');
const Activity = require('../models/Activity');
const { generateNextActionDrafts } = require('./aiService');

async function getDashboardOverview(userId) {
  const [targets, recentActivity] = await Promise.all([
    Target.find({ userId }).sort({ updatedAt: -1 }).limit(50),
    Activity.find({ userId }).sort({ createdAt: -1 }).limit(10),
  ]);

  const counts = targets.reduce(
    (acc, target) => {
      acc[target.temperature] += 1;
      return acc;
    },
    { hot: 0, warm: 0, cold: 0 }
  );

  const priorityActions = targets
    .filter((t) => t.temperature !== 'cold')
    .slice(0, 3)
    .map((t) => ({
      targetId: t._id,
      action: `Follow up with ${t.name} about ${t.company || 'their current priorities'}`,
      priority: t.temperature,
    }));

  const newTargets = targets.slice(0, 5).map((t) => ({
    id: t._id,
    name: t.name,
    company: t.company,
    relevanceScore: t.relevanceScore,
  }));

  const nextActionDrafts = generateNextActionDrafts(targets.slice(0, 3));

  return {
    targets_by_temperature: counts,
    priority_actions: priorityActions,
    new_targets: newTargets,
    recent_activity: recentActivity,
    pre_generated_next_action_drafts: nextActionDrafts,
  };
}

module.exports = {
  getDashboardOverview,
};
