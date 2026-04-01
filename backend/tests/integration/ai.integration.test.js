jest.mock('../../middleware/authMiddleware', () => (req, _res, next) => {
  req.user = { _id: 'u1' };
  next();
});

const request = require('supertest');
const { createApp } = require('../../app');
const AIOutput = require('../../models/AIOutput');

jest.mock('../../models/AIOutput', () => ({ create: jest.fn().mockResolvedValue({}) }));

describe('AI API', () => {
  test('POST /ai/smart-content validates required fields', async () => {
    const app = createApp();
    const response = await request(app).post('/ai/smart-content').send({ content: 'x' });

    expect(response.status).toBe(400);
  });

  test('POST /ai/profile-analyze returns analysis payload', async () => {
    const app = createApp();
    const response = await request(app).post('/ai/profile-analyze').send({ bio: 'Engineer' });

    expect(response.status).toBe(200);
    expect(AIOutput.create).toHaveBeenCalled();
  });
});
