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
  itemIs30DaysOld,
} from '~/utils';
import { useUserItemsContext } from '../shared/UserItemsContext';
import { useMemo } from 'react';

const PasswordHealth = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();
  const { items, isLoading, errorMessage } = useUserItemsContext();
  const weakItem = useMemo(() => items.filter(itemHasWeakPassword), [items]);
  const reusedItems = useMemo(
    () => items.filter((item) => itemHasReusedPassword(item, items)),
    [items]
  );
  const oldItems = useMemo(() => items.filter(itemIs30DaysOld), [items]);

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
          <List items={weakItem} />
        </Route>
        <Route path={Routes.Reused}>
          <List items={reusedItems} />
        </Route>
        <Route path={Routes.Old}>
          <List items={oldItems} />
        </Route>
      </Switch>
    </div>
  );
};

export default PasswordHealth;
