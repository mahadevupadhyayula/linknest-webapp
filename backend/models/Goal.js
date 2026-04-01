const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    contextType: { type: String, default: 'general', trim: true },
    constraints: [{ type: String, trim: true }],
    answers: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    completedAt: { type: Date },
  },
  { timestamps: true, collection: 'goals' }
);

module.exports = mongoose.model('Goal', goalSchema);
