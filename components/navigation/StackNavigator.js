import { StackNavigator } from 'react-navigation';

import Tabs from './TabNavigator';
import DeckView from '../DeckView';
import Quiz from '../Quiz';
import NewCard from '../NewCard';

export default StackNavigator({
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
