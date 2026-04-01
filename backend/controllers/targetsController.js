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
    const { interaction_type, channel, note, sentiment, occurred_at } = req.body;
    if (!channel || !interaction_type) {
      return res.status(400).json({ message: 'channel and interaction_type are required' });
    }

    const target = await targetsService.logTargetEngagement(req.user._id, req.params.id, {
      interaction_type,
      channel,
      note,
      sentiment,
      occurred_at,
    });

    if (!target) {
      return res.status(404).json({ message: 'Target not found' });
    }

    return res.status(201).json({ target });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to log engagement', error: error.message });
  }
}

async function updateTargetEngagement(req, res) {
  try {
    const { interaction_type, channel, note, sentiment, occurred_at } = req.body;

    const result = await targetsService.updateTargetEngagement(
      req.user._id,
      req.params.id,
      req.params.logId,
      {
        interaction_type,
        channel,
        note,
        sentiment,
        occurred_at,
      }
    );

    if (!result) {
      return res.status(404).json({ message: 'Target not found' });
    }

    if (!result.engagementLog) {
      return res.status(404).json({ message: 'Engagement log not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update engagement', error: error.message });
  }
}

module.exports = {
  getTarget,
  getTargetEngagement,
  logTargetEngagement,
  updateTargetEngagement,
};
