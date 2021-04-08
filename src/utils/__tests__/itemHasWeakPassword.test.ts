import { IUserItem } from '~/types';
import itemHasWeakPassword from '../itemHasWeakPassword';

describe('should return true if password do not match requirements', () => {
  test.each([
    [
      true,
      {
        password: 'pass',
      },
    ],
    [
      false,
      {
        password: 'Password123~',
      },
    ],
    [
      true,
      {
        password: 'Password',
      },
    ],
  ])('should return %s', (expectedResult, item) => {
    expect(itemHasWeakPassword(item as IUserItem)).toBe(expectedResult);
  });
});
