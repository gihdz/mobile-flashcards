import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
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
  resetQuiz = () => {
    this.setState({ correctAnswers: 0, showAnswer: false, step: 0 });
  };
  _renderSummary() {
    const { questions } = this.props.deck;
    const { correctAnswers } = this.state;
    const { navigation } = this.props;

    return (
      <SummaryView>
        <View>
          <MainText>{`You got ${correctAnswers} correct answers out of ${
            questions.length
          } questions!`}</MainText>
        </View>
        <ButtonsContainer style={{ marginTop: 25 }}>
          <SummaryButton onPress={this.resetQuiz}>
            <Text>Start Over</Text>
          </SummaryButton>
          <SummaryButton
            style={{ marginTop: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Text>Back to Deck</Text>
          </SummaryButton>
        </ButtonsContainer>
      </SummaryView>
    );
  }
  render() {
    const { questions } = this.props.deck;
    const { step } = this.state;
    if (step === questions.length) return this._renderSummary();

    const view = this._renderContent();
    return (
      <View>
        <View>
          <StyledStepText>{`${step + 1}/${questions.length}`}</StyledStepText>
        </View>
        {view}
        <ButtonsContainer>
          <StyledTouchableOpacity
            style={{ backgroundColor: 'green' }}
            onPress={() => this.onBtnPress('correct')}
          >
            <StyledText>Correct</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            style={{ backgroundColor: 'red', marginTop: 10 }}
            onPress={() => this.onBtnPress('incorrect')}
          >
            <StyledText>Incorrect</StyledText>
          </StyledTouchableOpacity>
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

const ButtonStyle = `
  width: 200px;
  height: 60px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const ButtonsContainer = styled.View`
  align-items: center;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  ${ButtonStyle};
`;
const SummaryButton = styled.TouchableOpacity`
  ${ButtonStyle} border: 2px solid;
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
const SummaryView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
