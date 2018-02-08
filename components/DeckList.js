import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styled from 'styled-components';

class DeckList extends React.Component {
  render() {
    const { decks } = this.props;
    const decksRow = Object.keys(decks).map(d => (
      <DeckRow key={d} deck={decks[d]} />
    ));
    return decksRow;
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
