const targetsService = require('../services/targetsService');

async function getTarget(req, res) {
  try {
    const target = await targetsService.getTargetById(req.user._id, req.params.id);
    if (!target) {
      return res.status(404).json({ message: 'Target not found' });
    }

    return res.status(200).json({ target });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get target', error: error.message });
  }
}

async function getTargetEngagement(req, res) {
  try {
    const engagement = await targetsService.getTargetEngagement(req.user._id, req.params.id);
    if (!engagement) {
      return res.status(404).json({ message: 'Target not found' });
    }

    return res.status(200).json({ engagement });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get engagement', error: error.message });
  }
}

async function logTargetEngagement(req, res) {
  try {
    const { channel, note, sentiment, nextAction, occurredAt, relevanceScore } = req.body;
    if (!channel) {
      return res.status(400).json({ message: 'channel is required' });
    }

    const target = await targetsService.logTargetEngagement(req.user._id, req.params.id, {
      channel,
      note,
      sentiment,
      nextAction,
      occurredAt,
      relevanceScore,
    });

    if (!target) {
      return res.status(404).json({ message: 'Target not found' });
    }

    return res.status(201).json({ target });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to log engagement', error: error.message });
  }
}

module.exports = {
  getTarget,
  getTargetEngagement,
  logTargetEngagement,
};
