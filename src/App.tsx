import { BrowserRouter as Router } from 'react-router-dom';
import RootRoutes from '~/components/RootRoutes';

import './styles/styles.scss';

const App = () => (
  <Router>
    <RootRoutes />
  </Router>
);

export default App;
