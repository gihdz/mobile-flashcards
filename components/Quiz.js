import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    };
  };
  state = {
    step: 0
  };
  render() {
    const { deck } = this.props;
    const { step } = this.state;
    const { questions } = deck;
    const question = questions[step] || (
      <View>
        <Text>No cards on deck!</Text>
      </View>
    );
    if (!question) return false;
    return (
      <View>
        <View>
          <StyledStepText>{`${step + 1}/${questions.length}`}</StyledStepText>
        </View>
        <QuestionContainer>
          <QuestionText>{question.question}</QuestionText>
          <TouchableOpacity style={{ marginTop: 10 }}>
            <AnswerText>Answer</AnswerText>
          </TouchableOpacity>
        </QuestionContainer>
      </View>
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
export default connect(mapStateToProps)(Quiz);

const StyledStepText = styled.Text`
  font-weight: 800;
  margin-left: 25px;
  margin-top: 15px;
`;
const QuestionContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 300px;
  padding-right: 20px;
  padding-left: 20px;
`;
const QuestionText = styled.Text`
  font-size: 50px;
  font-weight: 800;
  text-align: center;
`;
const AnswerText = styled.Text`
  font-size: 20px;
  color: red;
  font-weight: 700;
`;
