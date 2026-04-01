jest.mock('../../middleware/authMiddleware', () => (req, _res, next) => {
  req.user = { _id: 'u1' };
  next();
});

jest.mock('../../services/targetsService', () => ({
  getTargetById: jest.fn(),
  getTargetEngagement: jest.fn(),
  logTargetEngagement: jest.fn(),
  updateTargetEngagement: jest.fn(),
}));

const request = require('supertest');
const { createApp } = require('../../app');
const targetsService = require('../../services/targetsService');

describe('Targets API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /targets/:id returns target', async () => {
    targetsService.getTargetById.mockResolvedValue({ _id: 't1', name: 'Alice' });
    const app = createApp();

    const response = await request(app).get('/targets/t1');

    expect(response.status).toBe(200);
    expect(response.body.target.name).toBe('Alice');
  });

  test('POST /targets/:id/log validates body', async () => {
    const app = createApp();
    const response = await request(app).post('/targets/t1/log').send({ channel: 'email' });

    expect(response.status).toBe(400);
  });
});
