import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Constants } from 'expo';

import reducer from './reducers';
import DeckListContainer from './components/DeckListContainer.';
export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <View style={{ height: Constants.statusBarHeight }}>
            <StatusBar translucent barStyle="light-content" />
          </View>
          <DeckListContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});
