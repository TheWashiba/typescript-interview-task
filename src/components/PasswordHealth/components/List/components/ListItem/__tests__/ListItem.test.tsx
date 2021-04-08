import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByText,
  getByDisplayValue,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListItem from '../ListItem';
import { IUserItem } from '~/types';

const mockedItem: IUserItem = {
  title: 'test title',
  description: 'test description',
  password: 'test',
  createdAt: '',
};

describe('ListItem', () => {
  test('Rendered component with data', () => {
    const result = render(
      <ListItem item={mockedItem} handleListItemClick={() => {}} />
    );

    expect(result).toMatchSnapshot();
  });

  test('"Update Password" button click triggers handler', () => {
    const mockedClickHandler = jest.fn();
    const btnText = 'Update Password';

    render(
      <ListItem item={mockedItem} handleListItemClick={mockedClickHandler} />
    );

    fireEvent.click(screen.getByText(btnText));

    expect(mockedClickHandler).toHaveBeenCalled();
  });
});
