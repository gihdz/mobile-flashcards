import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styled from 'styled-components';

class DeckList extends React.Component {
  renderItem = ({ item }) => {
    return <DeckRow deck={item} navigation={this.props.navigation} />;
  };
  componentDidMount() {
    const { navigation } = this.props;
    navigation.navigate('NewDeck');
  }
  render() {
    const { decks } = this.props;
    return (
      <FlatList
        style={{ flex: 1 }}
        data={Object.keys(decks).map(d => decks[d])}
        renderItem={this.renderItem}
        keyExtractor={item => item.title}
      />
    );
  }
}
const DeckRow = ({ deck, navigation }) => {
  const { title, questions } = deck;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DeckView', { entryId: title })}
    >
      <StyledDeckRow>
        <StyledDeckTitle>{title}</StyledDeckTitle>
        <StyledCardsText>{questions.length} cards</StyledCardsText>
      </StyledDeckRow>
    </TouchableOpacity>
  );
};
const mapStateToProps = state => {
  const { decks } = state;
  return {
    decks
  };
};
export default connect(mapStateToProps)(DeckList);

const StyledDeckRow = styled.View`
  border: 1px solid;
  height: 200;
  align-items: center;
  justify-content: center;
`;
const StyledDeckTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
`;
const StyledCardsText = styled.Text`
  color: gray;
`;
