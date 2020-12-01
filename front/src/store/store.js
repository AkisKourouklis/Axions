import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStateSyncMiddleware } from 'redux-state-sync';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import AuthReducer from './reducers/auth.reducer';
import CheckoutReducer from './reducers/checkout.reducer';
import NotificationReducer from './reducers/notification.reducer';

const server = typeof window === 'undefined';

const storage = require('redux-persist/lib/storage').default;

const rootPersistConfig = {
  key: 'root',
  whitelist: ['auth', 'checkout'],
  storage,
  stateReconciler: hardSet
};

const authPersistConfig = {
  key: 'auth',
  storage,
  stateReconciler: hardSet
};
const checkoutPersistConfig = {
  key: 'checkout',
  storage,
  stateReconciler: hardSet
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  checkout: persistReducer(checkoutPersistConfig, CheckoutReducer),
  notification: NotificationReducer
});
const initState = {
  auth: {
    isLoading: false,
    isAuthenticated: false,
    user: '',
    email: '',
    token: '',
    courses: [],
    id: '',
    isError: false
  },
  checkout: {
    product: null,
    discount: null,
    loading: false
  },
  notification: {
    type: '',
    message: '',
    isShown: false
  }
};

const logger = createLogger({ collapsed: true });

const syncConfig = {
  whitelist: ['AUTH_LOGOUT', 'SET_CURRENT_USER', 'CHECKOUT_PRODUCT']
};

const middleware = [thunk, logger];

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  middleware.push(require('redux-immutable-state-invariant').default());
}
if (!server) {
  middleware.push(createStateSyncMiddleware(syncConfig));
}

const enhancer = composeWithDevTools(applyMiddleware(...middleware));

// eslint-disable-next-line import/prefer-default-export
const initStore = (reducer, initialState = initState) => {
  return createStore(reducer, initialState, enhancer);
};

// eslint-disable-next-line import/prefer-default-export
export const makeStore = (initialState, { isServer }) => {
  // return createStore(rootReducer, initialState, enhancer);
  if (isServer) {
    initialState = initState || { server: true };
    return initStore(rootReducer, initialState);
  } else {
    // we need it only on client side
    // eslint-disable-next-line global-require
    const { persistStore } = require('redux-persist');
    // eslint-disable-next-line global-require
    const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
    const store = initStore(persistedReducer, initialState);

    // crossBrowserListener(store, persistConfig, { blacklist: ['filters', 'search'] });

    store.__persistor = persistStore(store);

    return store;
  }
};

export default initStore;
