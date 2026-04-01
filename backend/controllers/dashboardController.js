const dashboardService = require('../services/dashboardService');

async function overview(req, res) {
  try {
    const data = await dashboardService.getDashboardOverview(req.user._id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load dashboard overview', error: error.message });
  }
}

module.exports = { overview };
