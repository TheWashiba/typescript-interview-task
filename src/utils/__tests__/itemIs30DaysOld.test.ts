import { subDays } from 'date-fns';
import { IUserItem } from '~/types';
import itemIs30DaysOld from '../itemIs30DaysOld';

describe('should return true if password is at least 30 days old', () => {
  test.each([
    [
      true,
      {
        createdAt: subDays(new Date(), 31).toISOString(),
      },
    ],
    [
      true,
      {
        createdAt: subDays(new Date(), 30).toISOString(),
      },
    ],
    [
      false,
      {
        createdAt: subDays(new Date(), 29).toISOString(),
      },
    ],
  ])('should return %s', (expectedResult, item) => {
    expect(itemIs30DaysOld(item as IUserItem)).toBe(expectedResult);
  });
});
