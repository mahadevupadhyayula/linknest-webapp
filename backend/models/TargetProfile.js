const mongoose = require('mongoose');

const targetProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
    company: { type: String, trim: true },
    relevance_score: { type: Number, min: 0, max: 100, default: 50 },
    relationship_score: { type: Number, min: 0, max: 100, default: 0 },
    category: {
      type: String,
      enum: ['Hot', 'Warm', 'Cold'],
      default: 'Cold',
      index: true,
    },
    notes: { type: String, trim: true },
    last_engaged_at: { type: Date },
  },
  {
    timestamps: true,
    collection: 'target_profiles',
  }
);

module.exports = mongoose.model('TargetProfile', targetProfileSchema);
