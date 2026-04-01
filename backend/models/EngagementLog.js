const mongoose = require('mongoose');

const engagementLogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    target_profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TargetProfile',
      required: true,
      index: true,
    },
    interaction_type: {
      type: String,
      enum: ['meeting', 'call', 'email_reply', 'dm_reply', 'profile_view', 'like', 'comment', 'message_sent'],
      required: true,
    },
    channel: { type: String, required: true, trim: true },
    sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], default: 'neutral' },
    note: { type: String, trim: true },
    occurred_at: { type: Date, default: Date.now, index: true },
  },
  {
    timestamps: true,
    collection: 'engagement_logs',
  }
);

module.exports = mongoose.model('EngagementLog', engagementLogSchema);
