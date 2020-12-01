import React from 'react';
import Cookie from 'js-cookie';

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = React.useState(() => {
    const persistedState = Cookie.get(key);
    return persistedState ? JSON.parse(persistedState) : defaultValue;
  });
  React.useEffect(() => {
    Cookie.set(key, state);
  }, [state, key]);
  return [state, setState];
}
