const TargetProfile = require('../models/TargetProfile');
const EngagementLog = require('../models/EngagementLog');
const Activity = require('../models/Activity');
const { recalculateForTargetProfile } = require('./relationshipScoringService');

async function getTargetById(userId, targetId) {
  return TargetProfile.findOne({ _id: targetId, user_id: userId });
}

async function getTargetEngagement(userId, targetId) {
  const target = await getTargetById(userId, targetId);
  if (!target) {
    return null;
  }

  const logs = await EngagementLog.find({ user_id: userId, target_profile_id: targetId }).sort({ occurred_at: -1 });

  return logs;
}

async function logTargetEngagement(userId, targetId, payload) {
  const target = await getTargetById(userId, targetId);
  if (!target) {
    return null;
  }

  await EngagementLog.create({
    ...payload,
    user_id: userId,
    target_profile_id: targetId,
  });

  const updatedTarget = await recalculateForTargetProfile(targetId);

  await Activity.create({
    userId,
    type: 'target.engagement.logged',
    message: `Logged engagement with ${target.name}`,
    metadata: { targetId: target._id, channel: payload.channel },
  });

  return updatedTarget;
}

async function updateTargetEngagement(userId, targetId, logId, payload) {
  const target = await getTargetById(userId, targetId);
  if (!target) {
    return null;
  }

  const engagementLog = await EngagementLog.findOneAndUpdate(
    { _id: logId, user_id: userId, target_profile_id: targetId },
    { $set: payload },
    { new: true }
  );

  if (!engagementLog) {
    return { target, engagementLog: null };
  }

  const updatedTarget = await recalculateForTargetProfile(targetId);

  await Activity.create({
    userId,
    type: 'target.engagement.updated',
    message: `Updated engagement with ${target.name}`,
    metadata: { targetId: target._id, channel: engagementLog.channel, logId: engagementLog._id },
  });

  return { target: updatedTarget, engagementLog };
}

module.exports = {
  getTargetById,
  getTargetEngagement,
  logTargetEngagement,
  updateTargetEngagement,
};
