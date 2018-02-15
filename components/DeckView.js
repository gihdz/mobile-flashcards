import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { TransparentButton, BlackButton, RedButton } from './StyledComponents';
import { removeDeck } from '../utils/api';
import { deleteDeck } from '../actions';
class DeckView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;

    return {
      title: entryId
    };
  };
  render() {
    const { deck, navigation, deleteDeck } = this.props;
    if (!deck) return false;
    const { title, questions } = deck;
    return (
      <StyledDeckView>
        <Body>
          <StyledDeckTitle>{title}</StyledDeckTitle>
          <StyledCardsText>{questions.length} cards</StyledCardsText>
        </Body>
        <ButtonsContainer>
          <TransparentButton
            onPress={() => {
              navigation.navigate('NewCard', { title });
            }}
          >
            <Text>Add Card</Text>
          </TransparentButton>
          <BlackButton
            onPress={() => {
              if (questions.length === 0) {
                Alert.alert(
                  'No cards on deck!',
                  'Add some cards to current deck for the quiz to start!',
                  [{ text: 'OK' }]
                );
                return;
              }
              navigation.navigate('Quiz', { entryId: title });
            }}
            style={{
              marginTop: 15
            }}
          >
            <Text style={{ color: '#fff' }}>Start Quiz</Text>
          </BlackButton>
          <RedButton
            style={{
              marginTop: 15
            }}
            onPress={() => {
              Alert.alert('Delete Deck', 'Sure you want to delete this deck?', [
                { text: 'CANCEL' },
                {
                  text: 'DELETE',
                  onPress: () => {
                    removeDeck(title).then(() => {
                      navigation.goBack();
                      deleteDeck(title);
                    });
                  }
                }
              ]);
            }}
          >
            <Text style={{ color: '#fff' }}>Delete Deck</Text>
          </RedButton>
        </ButtonsContainer>
      </StyledDeckView>
    );
  }
}

const mapStateToProps = (state, { navigation }) => {
  const { decks } = state;
  const { entryId } = navigation.state.params;
  const deck = decks[entryId];
  return {
    deck
  };
};
export default connect(mapStateToProps, { deleteDeck })(DeckView);
const StyledDeckTitle = styled.Text`
  font-size: 50px;
  font-weight: 600;
`;
const StyledCardsText = styled.Text`
margin-top: 10px
  font-size: 28px;
  color: gray;
`;
const StyledDeckView = styled.ScrollView`
  flex: 1;
`;
const Body = styled.View`
  align-items: center;
  justify-content: center;
  height: 250px;
`;
const ButtonsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
