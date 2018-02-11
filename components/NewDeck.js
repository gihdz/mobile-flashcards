import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

class NewDeck extends React.Component {
  state = {
    titleText: ''
  };
  render() {
    return (
      <StyledView>
        <TextContainer>
          <StyledText>What is the title of your new deck?</StyledText>
        </TextContainer>
        <InputContainer>
          <StyledTextInput
            onChangeText={titleText => this.setState({ titleText })}
            placeholder="Deck Title"
          />
        </InputContainer>
        <ButtonContainer>
          <StyledTouchableOp onPress={() => console.log(this.state.titleText)}>
            <Text style={{ color: 'white', fontSize: 18 }}>Submit</Text>
          </StyledTouchableOp>
        </ButtonContainer>
      </StyledView>
    );
  }
}

export default NewDeck;
const ButtonStyle = `
  width: 200px;
  height: 60px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
const StyledView = styled.View`
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
