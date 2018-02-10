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
    step: 0,
    showAnswer: false,
    correctAnswers: 0
  };
  _renderContent() {
    const { deck } = this.props;
    const { showAnswer, step } = this.state;
    const { questions } = deck;
    const question = questions[step] || (
      <View>
        <Text>No cards on deck!</Text>
      </View>
    );
    const mainText = showAnswer ? question.answer : question.question;
    const buttonText = showAnswer ? 'Question' : 'Answer';
    return (
      <MainContent>
        <MainText>{mainText}</MainText>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => {
            this.setState({ showAnswer: !showAnswer });
          }}
        >
          <AnswerQuestionText>{buttonText}</AnswerQuestionText>
        </TouchableOpacity>
      </MainContent>
    );
  }
  check = () => {};
  onBtnPress = type => {
    const { step, correctAnswers } = this.state;
    const { deck } = this.props;

    switch (type) {
      case 'correct':
        this.setState({
          step: step + 1,
          correctAnswers: correctAnswers + 1,
          showAnswer: false
        });
        break;
      case 'incorrect':
        this.setState({ step: step + 1, showAnswer: false });
        break;
      default:
        break;
    }
  };
  render() {
    const { questions } = this.props.deck;
    const { step } = this.state;
    if (step === questions.length)
      return (
        <View>
          <Text>{JSON.stringify(this.state)}</Text>
        </View>
      );

    const view = this._renderContent();
    return (
      <View>
        <View>
          <StyledStepText>{`${step + 1}/${questions.length}`}</StyledStepText>
        </View>
        {view}
        <ButtonsContainer>
          <Button
            style={{ backgroundColor: 'green' }}
            onPress={() => this.onBtnPress('correct')}
          >
            <StyledText>Correct</StyledText>
          </Button>
          <Button
            style={{ backgroundColor: 'red', marginTop: 10 }}
            onPress={() => this.onBtnPress('incorrect')}
          >
            <StyledText>Incorrect</StyledText>
          </Button>
        </ButtonsContainer>
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
const ButtonsContainer = styled.View`
  align-items: center;
`;
const Button = styled.TouchableOpacity`
  width: 200px;
  height: 60px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
const StyledText = styled.Text`
  color: #fff;
  font-size: 18px;
`;
const StyledStepText = styled.Text`
  font-weight: 800;
  margin-left: 25px;
  margin-top: 15px;
`;
const MainContent = styled.View`
  align-items: center;
  justify-content: center;
  height: 300px;
  padding-right: 20px;
  padding-left: 20px;
`;
const MainText = styled.Text`
  font-size: 30px;
  font-weight: 800;
  text-align: center;
`;
const AnswerQuestionText = styled.Text`
  font-size: 20px;
  color: red;
  font-weight: 700;
`;
