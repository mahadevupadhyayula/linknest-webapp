const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const { signup, login } = require('../../../controllers/authController');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../../models/User');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('authController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  test('signup returns 400 when email/password missing', async () => {
    const req = { body: { email: '' } };
    const res = mockRes();

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('signup creates user and returns token', async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed');
    User.create.mockResolvedValue({ _id: 'u1', email: 'a@b.com' });
    jwt.sign.mockReturnValue('token-1');

    const req = { body: { email: 'A@B.com', password: 'password123' } };
    const res = mockRes();

    await signup(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'a@b.com' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: 'token-1' }));
  });

  test('login returns 401 for invalid credentials', async () => {
    User.findOne.mockResolvedValue(null);

    const req = { body: { email: 'test@example.com', password: 'bad' } };
    const res = mockRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('login returns token when credentials are valid', async () => {
    User.findOne.mockResolvedValue({ _id: 'u2', email: 'test@example.com', password: 'hash' });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token-2');

    const req = { body: { email: 'test@example.com', password: 'correct' } };
    const res = mockRes();

    await login(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith('correct', 'hash');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: 'token-2' }));
  });
});
