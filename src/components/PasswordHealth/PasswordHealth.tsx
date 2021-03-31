import List from './components/List/List';
import ErrorBlock from '../shared/ErrorBlock';
import Filter from './components/Filter/Filter';
import LoadingScreen from '../shared/LoadingScreen';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import { Routes } from '~/constants';
import { useUserContext } from '../shared/UserContext';
import {
  itemHasReusedPassword,
  itemHasWeakPassword,
  itemIsMonthOld,
} from '~/utils';
import { useUserItemsContext } from '../shared/UserItemsContext';

const PasswordHealth = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();
  const { items, isLoading, errorMessage } = useUserItemsContext();

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen />;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />;
  }

  return (
    <div className="container">
      <Header items={items} username={username} />
      <Filter items={items} />
      <Switch>
        <Route exact path={Routes.PasswordHealth}>
          <List items={items} />
        </Route>
        <Route path={Routes.Weak}>
          <List items={items.filter(itemHasWeakPassword)} />
        </Route>
        <Route path={Routes.Reused}>
          <List
            items={items.filter((item) => itemHasReusedPassword(item, items))}
          />
        </Route>
        <Route path={Routes.Old}>
          <List items={items.filter(itemIsMonthOld)} />
        </Route>
      </Switch>
    </div>
  );
};

export default PasswordHealth;
