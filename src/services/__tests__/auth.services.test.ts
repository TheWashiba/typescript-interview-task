import fetchMock from 'jest-fetch-mock';
import mockLocalStorage from '../../mocks/localStorage';
import { login, logout } from '../auth.services';

describe('login service', () => {
  const credentials = {
    username: 'test',
    password: 'test',
  };

  beforeAll(() => {
    process.env.API_URL = 'test';
    fetchMock.enableMocks();
    mockLocalStorage();
  });

  afterEach(() => fetchMock.resetMocks());

  test('successful login sets token in localStorage', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ token: 'test-token' }));
    expect.assertions(1);

    await login(credentials.username, credentials.password);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
  });

  test('successful login sets token in localStorage', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ token: 'test-token' }));
    expect.assertions(1);

    await login(credentials.username, credentials.password);
    expect(fetch).toHaveBeenCalledWith(
      'test/api/login?password=test&username=test'
    );
  });

  test('failed login bubbles the error', async () => {
    fetchMock.mockReject(new Error('test'));
    expect.assertions(1);

    try {
      await login(credentials.username, credentials.password);
    } catch (error) {
      expect(error).toEqual(new Error('test'));
    }
  });
});

describe('logout', () => {
  beforeAll(() => {
    process.env.API_URL = 'test';
    fetchMock.enableMocks();
    mockLocalStorage('test-token');
  });

  afterEach(() => fetchMock.resetMocks());

  test('logout sets auth header - "Bearer test-token"', async () => {
    fetchMock.mockResponseOnce('');
    // expect.assertions(1);

    await logout();
    expect(fetchMock.mock).toMatchSnapshot();
  });
});
