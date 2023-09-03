import React from 'react';
import { AppRegistry } from 'react-native';
import { App } from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import ErrorBoundary from 'react-native-error-boundary';
import { ComponentWithError } from './src/components/ComponentWithError';

const AppWrap = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ComponentWithError}>
        <App />
      </ErrorBoundary>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AppWrap);
