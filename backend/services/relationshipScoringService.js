const EngagementLog = require('../models/EngagementLog');
const TargetProfile = require('../models/TargetProfile');

const INTERACTION_WEIGHTS = {
  meeting: 12,
  call: 10,
  email_reply: 8,
  dm_reply: 7,
  comment: 5,
  message_sent: 4,
  like: 2,
  profile_view: 1,
};

const SENTIMENT_MULTIPLIER = {
  positive: 1.15,
  neutral: 1,
  negative: 0.6,
};

function computeRelationshipScore(logs = []) {
  if (!logs.length) {
    return 0;
  }

  const weightedSum = logs.reduce((acc, log) => {
    const weight = INTERACTION_WEIGHTS[log.interaction_type] ?? 1;
    const sentiment = SENTIMENT_MULTIPLIER[log.sentiment] ?? 1;
    return acc + weight * sentiment;
  }, 0);

  const maxExpected = logs.length * INTERACTION_WEIGHTS.meeting;
  const normalized = Math.round((weightedSum / maxExpected) * 100);

  return Math.max(0, Math.min(100, normalized));
}

function toCategory(score) {
  if (score >= 75) {
    return 'Hot';
  }
  if (score >= 40) {
    return 'Warm';
  }
  return 'Cold';
}

async function recalculateForTargetProfile(targetProfileId) {
  const logs = await EngagementLog.find({ target_profile_id: targetProfileId }).sort({ occurred_at: 1 });

  const relationshipScore = computeRelationshipScore(logs);
  const category = toCategory(relationshipScore);
  const lastEngagedAt = logs.length ? logs[logs.length - 1].occurred_at : null;

  const targetProfile = await TargetProfile.findByIdAndUpdate(
    targetProfileId,
    {
      relationship_score: relationshipScore,
      category,
      last_engaged_at: lastEngagedAt,
    },
    { new: true }
  );

  return targetProfile;
}

module.exports = {
  computeRelationshipScore,
  toCategory,
  recalculateForTargetProfile,
};
