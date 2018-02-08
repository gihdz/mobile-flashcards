import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import styled from 'styled-components';

class DeckList extends React.Component {
  renderItem = ({ item }) => {
    return <DeckRow key={item.title} deck={item} />;
  };
  render() {
    const { decks } = this.props;
    return (
      <FlatList
        style={{ flex: 1 }}
        data={Object.keys(decks).map(d => decks[d])}
        renderItem={this.renderItem}
      />
    );
  }
}
const DeckRow = ({ deck }) => {
  const { title, questions } = deck;
  return (
    <StyledDeckRow>
      <StyledDeckTitle>{title}</StyledDeckTitle>
      <StyledCardsText>{questions.length} cards</StyledCardsText>
    </StyledDeckRow>
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
