const mongoose = require('mongoose');

const engagementSchema = new mongoose.Schema(
  {
    channel: { type: String, required: true, trim: true },
    note: { type: String, trim: true },
    sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], default: 'neutral' },
    nextAction: { type: String, trim: true },
    occurredAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const targetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    title: { type: String, trim: true },
    company: { type: String, trim: true },
    relevanceScore: { type: Number, min: 0, max: 100, default: 50 },
    temperature: { type: String, enum: ['hot', 'warm', 'cold'], default: 'warm' },
    notes: { type: String, trim: true },
    engagements: [engagementSchema],
    lastEngagedAt: { type: Date },
  },
  { timestamps: true }
);

targetSchema.pre('save', function setTemperature(next) {
  if (this.relevanceScore >= 80) {
    this.temperature = 'hot';
  } else if (this.relevanceScore >= 50) {
    this.temperature = 'warm';
  } else {
    this.temperature = 'cold';
  }

  if (this.engagements?.length) {
    this.lastEngagedAt = this.engagements[this.engagements.length - 1].occurredAt;
  }

  next();
});

module.exports = mongoose.model('Target', targetSchema);
