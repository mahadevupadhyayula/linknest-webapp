const request = require('supertest');
const { createApp } = require('../../app');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  test('POST /auth/signup returns 201 and token', async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedpw');
    User.create.mockResolvedValue({ _id: 'u1', email: 'user@example.com' });
    jwt.sign.mockReturnValue('jwt-token');

    const app = createApp();
    const response = await request(app)
      .post('/auth/signup')
      .send({ email: 'user@example.com', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body.token).toBe('jwt-token');
  });

  test('POST /auth/login returns 401 for bad credentials', async () => {
    User.findOne.mockResolvedValue(null);

    const app = createApp();
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'nope@example.com', password: 'password123' });

    expect(response.status).toBe(401);
  });
});
