import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { StyledEngineProvider } from '@mui/material/styles'
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";


import store from './redux/index'
import { ThemeProvider } from './theme'
import { App } from './App'
import { AppRoutes } from './router'
import { browserHistory } from './redux/create';
import { setBaseUrls } from './swagger/swagger.config';

setBaseUrls()

ReactDOM.createRoot(
  document.getElementById('root'),
).render(
<StyledEngineProvider injectFirst>
  <Provider store={store}>
    <ThemeProvider>
      <HistoryRouter history={browserHistory}>
      <AppRoutes />
        <App />
      </HistoryRouter>
    </ThemeProvider>
  </Provider>
</StyledEngineProvider>,
)