import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

class DeckList extends React.Component {
  render() {
    const { decks } = this.props;
    const decksRow = Object.keys(decks).map(d => (
      <DeckRow key={d} deck={decks[d]} />
    ));
    return <View>{decksRow}</View>;
  }
}
const DeckRow = ({ deck }) => {
  const { title } = deck;
  return (
    <View>
      <Text>Title: {title}</Text>
    </View>
  );
};
const mapStateToProps = state => {
  const { decks } = state;
  return {
    decks
  };
};
export default connect(mapStateToProps)(DeckList);
