const mongoose = require('mongoose');

const aiOutputSchema = new mongoose.Schema(
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
      index: true,
    },
    goal_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Goal',
      index: true,
    },
    output_type: { type: String, required: true, trim: true },
    prompt: { type: String },
    input_payload: { type: mongoose.Schema.Types.Mixed },
    output_payload: { type: mongoose.Schema.Types.Mixed, required: true },
    model: { type: String, default: 'local-deterministic' },
  },
  {
    timestamps: true,
    collection: 'ai_outputs',
  }
);

module.exports = mongoose.model('AIOutput', aiOutputSchema);
