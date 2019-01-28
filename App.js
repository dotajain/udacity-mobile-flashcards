import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

import { store } from './store';

import Route from './src/Route';
import { setupLocalNotification } from './src/utils/notification';

export default class App extends Component {
  componentDidMount() {
    setupLocalNotification();
  }
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider>
          <View style={{ flex: 1 }}>
            <Route />
          </View>
        </PaperProvider>
      </StoreProvider>
    );
  }
}
