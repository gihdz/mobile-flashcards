import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import reducer from './reducers';
import DeckListContainer from './components/DeckListContainer';
import NewDeck from './components/NewDeck';
import DeckView from './components/DeckView';
import Quiz from './components/Quiz';
import NewCard from './components/NewCard';

const Tabs = TabNavigator(
  {
    Decks: {
      screen: DeckListContainer,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      headerTitle: 'Decks'
    },
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? 'purple' : 'white',
      // showIcon: true,
      // showLabel: false,
      style: {
        height: 56,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  Quiz: {
    screen: Quiz
  },
  NewCard: {
    screen: NewCard
  },
  DeckView: {
    screen: DeckView
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <View style={{ height: Constants.statusBarHeight }}>
            <StatusBar translucent />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
