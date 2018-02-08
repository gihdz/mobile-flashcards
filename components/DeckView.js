import React from 'react';
import { View, Text } from 'react-native';

class DeckView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;

    return {
      title: entryId
    };
  };
  render() {
    return (
      <View>
        <Text>Deck View</Text>
      </View>
    );
  }
}

export default DeckView;
