import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { CollapseProvider } from '@gogaadi/hooks';
import { store } from '@gogaadi/state';
import { Loader, NotificationModal } from '@gogaadi/component';
import { DynamicThemeProvider } from '@gogaadi/theme';
import App from './app';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <DynamicThemeProvider>
        <CssBaseline />
        <NotificationModal />
        <BrowserRouter>
          <CollapseProvider>
            <Suspense fallback={<Loader fullScreen />}>
              <App />
            </Suspense>
          </CollapseProvider>
        </BrowserRouter>
      </DynamicThemeProvider>
    </Provider>
  </StrictMode>,
);
