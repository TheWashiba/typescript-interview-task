import { IUserItem } from '~/types';
import itemHasReusedPassword from '../itemHasReusedPassword';

const items: IUserItem[] = [
  {
    title: 'discord',
    description: 'rumors',
    password: 'discordPassword123.',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'airdroid',
    description: 'replace android',
    password: 'pass1',
    createdAt: new Date().toISOString(),
  },
  {
    title: 'Nintendo',
    description: 'Lets play',
    password: 'pass1',
    createdAt: new Date().toISOString(),
  },
] as IUserItem[];

test('should return true if there is more than one item with same password', () => {
  expect(itemHasReusedPassword(items[0], items)).toBe(false);
  expect(itemHasReusedPassword(items[2], items)).toBe(true);
});
