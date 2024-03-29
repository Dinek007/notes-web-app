import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { StyledEngineProvider } from '@mui/material/styles'
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import reducer from './redux/index'
import { ThemeProvider } from './theme'
import { App } from './App'
import { AppRoutes } from './router'
import { browserHistory } from './redux/create';
import { setBaseUrls } from './swagger/swagger.config';
import { PersistGate } from 'redux-persist/integration/react';
import { HistoryRouterProps } from "react-router-dom";

setBaseUrls();

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <Provider store={reducer.store}>
      <PersistGate loading={null} persistor={reducer.persistor}>
        <ThemeProvider>
          <HistoryRouter
            history={browserHistory as unknown as HistoryRouterProps["history"]}
          >
            <AppRoutes />
            <App />
          </HistoryRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StyledEngineProvider>
);