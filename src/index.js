import configureStore from './store/configureStore';
import routes from './routes'
import DevTools from './components/DevTools'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

render(
     (
        <Provider store={store}>
            <div>
              <Router history={history} routes={routes} />
              <DevTools />
            </div>
        </Provider>
      ), document.getElementById('root'));