jest.mock('../../middleware/authMiddleware', () => (req, _res, next) => {
  req.user = { _id: 'u1' };
  next();
});

jest.mock('../../services/dashboardService', () => ({
  getDashboardOverview: jest.fn().mockResolvedValue({
    targets_by_temperature: { hot: 1, warm: 1, cold: 0 },
    priority_actions: [],
    new_targets: [],
    recent_activity: [],
    pre_generated_next_action_drafts: [],
  }),
}));

const request = require('supertest');
const { createApp } = require('../../app');

describe('Dashboard API', () => {
  test('GET /dashboard/overview returns overview payload', async () => {
    const app = createApp();
    const response = await request(app).get('/dashboard/overview');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('targets_by_temperature');
  });
});
