import React from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { TransparentButton, BlackButton, RedButton } from './StyledComponents';
import { removeDeck } from '../utils/api';
import { deleteDeck } from '../actions';
import { Orientation } from '../utils/constants';
import { isPortrait, isLandscape } from '../utils/helpers';
class DeckView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;

    return {
      title: entryId
    };
  };
  constructor(props) {
    super(props);
    const { PORTRAIT, LANDSCAPE } = Orientation;
    this.state = {
      orientation: isPortrait() ? PORTRAIT : LANDSCAPE
    };
    Dimensions.addEventListener('change', this.orientationHandler);
  }
  orientationHandler = () => {
    const { PORTRAIT, LANDSCAPE } = Orientation;

    this.setState({
      orientation: isPortrait() ? PORTRAIT : LANDSCAPE
    });
  };
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.orientationHandler);
  }
  _getLayout() {
    const { orientation } = this.state;
    const { PORTRAIT } = Orientation;
    return {
      DeckView: orientation === PORTRAIT ? DeckViewColumn : DeckViewRow
    };
  }
  render() {
    const { deck, navigation, deleteDeck } = this.props;
    if (!deck) return false;
    const { title, questions } = deck;
    const { DeckView } = this._getLayout();
    return (
      <DeckView>
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
      </DeckView>
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
const DeckViewColumn = styled.View`
  flex: 1;
`;
const DeckViewRow = styled.View`
  flex: 1;
  flex-direction: row;
`;
const Body = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 250px;
`;
const ButtonsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
