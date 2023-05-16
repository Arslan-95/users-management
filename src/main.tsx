import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { store } from './redux/strore.ts';
import { Provider } from 'react-redux';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
