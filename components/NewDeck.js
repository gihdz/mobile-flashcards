import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { addDeck } from '../actions';
import { submitDeck } from '../utils/api'


class NewDeck extends React.Component {
  state = {
    titleText: ''
  };
  onSubmit = () => {
    const { addDeck, navigation } = this.props;
    const { titleText } = this.state;
    if (titleText) {
      this.setState({ titleText: '' }, () => {
        const trimmedTitle = titleText.trim();
        submitDeck(trimmedTitle)
        addDeck(trimmedTitle);
        navigation.navigate('Decks');
      });
    }
  };
  render() {
    return (
      <StyledKeyboardAvoidingView behavior="padding">
        <TextContainer>
          <StyledText>What is the title of your new deck?</StyledText>
        </TextContainer>
        <InputContainer>
          <StyledTextInput
            onChangeText={titleText => this.setState({ titleText })}
            placeholder="Deck Title"
            value={this.state.titleText}
          />
        </InputContainer>
        <ButtonContainer>
          <StyledTouchableOp onPress={this.onSubmit}>
            <Text style={{ color: 'white', fontSize: 18 }}>Submit</Text>
          </StyledTouchableOp>
        </ButtonContainer>
      </StyledKeyboardAvoidingView>
    );
  }
}

export default connect(null, { addDeck })(NewDeck);

const ButtonStyle = `
  width: 200px;
  height: 60px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  align-items: center;
  flex: 1;
`;
const TextContainer = styled.View`
  flex: 2;
  justify-content: center;
`;
const StyledText = styled.Text`
  font-size: 28px;
  text-align: center;
`;
const InputContainer = styled.View`
  flex: 1;
`;
const StyledTextInput = styled.TextInput`
  min-width: 300;
  height: 50px;
  border: 2px solid;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
`;
const ButtonContainer = styled.View`
  flex: 2;
`;
const StyledTouchableOp = styled.TouchableOpacity`
  ${ButtonStyle} background-color: black;
`;
