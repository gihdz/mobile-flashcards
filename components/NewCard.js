import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { addCard } from '../actions';
import { submitCard } from '../utils/api';
import { BlackButton } from './StyledComponents';
class NewCard extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Add Card'
    };
  };
  state = {
    question: '',
    answer: ''
  };
  onSubmit = () => {
    const { addCard, navigation, title } = this.props;
    const { question, answer } = this.state;
    if (question && answer) {
      submitCard(title, question.trim(), answer.trim());
      addCard(title, question.trim(), answer.trim());
      navigation.goBack();
    }
  };
  render() {
    return (
      <StyledKeyboardAvoidingView behavior="padding">
        <TextContainer>
          <StyledText>Specify question and answer for new card</StyledText>
        </TextContainer>
        <InputContainer>
          <StyledTextInput
            onChangeText={question => this.setState({ question })}
            placeholder="Question"
            value={this.state.question}
          />
        </InputContainer>
        <InputContainer>
          <StyledTextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={answer => this.setState({ answer })}
            placeholder="Answer"
            value={this.state.answer}
          />
        </InputContainer>
        <ButtonContainer>
          <BlackButton onPress={this.onSubmit}>
            <Text style={{ color: 'white', fontSize: 18 }}>Submit</Text>
          </BlackButton>
        </ButtonContainer>
      </StyledKeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state, { navigation }) => {
  const { title } = navigation.state.params;
  return {
    title
  };
};

export default connect(mapStateToProps, { addCard })(NewCard);

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  align-items: center;
  flex: 1;
`;
const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
const StyledText = styled.Text`
  font-size: 16px;
  text-align: center;
`;
const InputContainer = styled.View`
  flex: 1;
`;
const StyledTextInput = styled.TextInput`
  width: 300px;

  min-height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  padding-bottom: 10px;
`;
const ButtonContainer = styled.View`
  margin-top: 35px;
  flex: 2;
`;
