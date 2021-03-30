import { lazy, Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Routes } from '~/constants';
import Login from './Login';
import LoadingScreen from './shared/LoadingScreen';
import PrivateRoute from './shared/PrivateRoute';
import PublicRoute from './shared/PublicRoute';
import { UserContextProvider } from './shared/UserContext';
import { UserItemsContextProvider } from './shared/UserItemsContext';

const LazyPasswordHealth = lazy(() => import('~/components/PasswordHealth'));

const RootRoutes = () => (
  <Switch>
    <PublicRoute path={Routes.Login} component={Login} />
    <PrivateRoute
      path={Routes.PasswordHealth}
      component={() => (
        <UserContextProvider>
          <UserItemsContextProvider>
            <Suspense
              children={<LazyPasswordHealth />}
              fallback={<LoadingScreen />}
            />
          </UserItemsContextProvider>
        </UserContextProvider>
      )}
    />
    <PrivateRoute
      path={Routes.Root}
      component={() => <Redirect to={Routes.PasswordHealth} />}
    />
  </Switch>
);

export default RootRoutes;
