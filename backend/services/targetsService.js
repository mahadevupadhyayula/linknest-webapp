const Target = require('../models/Target');
const Activity = require('../models/Activity');

async function getTargetById(userId, targetId) {
  return Target.findOne({ _id: targetId, userId });
}

async function getTargetEngagement(userId, targetId) {
  const target = await getTargetById(userId, targetId);
  if (!target) {
    return null;
  }
  return target.engagements;
}

async function logTargetEngagement(userId, targetId, payload) {
  const target = await getTargetById(userId, targetId);
  if (!target) {
    return null;
  }

  target.engagements.push(payload);
  if (payload.relevanceScore !== undefined) {
    target.relevanceScore = payload.relevanceScore;
  }

  await target.save();

  await Activity.create({
    userId,
    type: 'target.engagement.logged',
    message: `Logged engagement with ${target.name}`,
    metadata: { targetId: target._id, channel: payload.channel },
  });

  return target;
}

module.exports = {
  getTargetById,
  getTargetEngagement,
  logTargetEngagement,
};
