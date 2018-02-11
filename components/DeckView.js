import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

class DeckView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;

    return {
      title: entryId
    };
  };
  render() {
    const { deck, navigation } = this.props;
    const { title, questions } = deck;
    return (
      <StyledDeckView>
        <Body>
          <StyledDeckTitle>{title}</StyledDeckTitle>
          <StyledCardsText>{questions.length} cards</StyledCardsText>
        </Body>
        <ButtonsContainer>
          <StyledTouchableOpacity
            onPress={() => {
              navigation.navigate('NewCard', { title });
            }}
          >
            <Text>Add Card</Text>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
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
              marginTop: 15,
              backgroundColor: '#000'
            }}
          >
            <Text style={{ color: '#fff' }}>Start Quiz</Text>
          </StyledTouchableOpacity>
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
export default connect(mapStateToProps)(DeckView);
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
  align-items: center;
  justify-content: center;
  height: 200px;
`;
const StyledTouchableOpacity = styled.TouchableOpacity`
  border: 2px solid;
  border-radius: 5;
  padding: 20px 60px;
`;
