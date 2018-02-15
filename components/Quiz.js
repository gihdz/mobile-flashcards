import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  Container,
  Button,
  Segment,
  Content,
  Text,
  List,
  ListItem,
  Right,
  Icon,
  Left,
  Body
} from 'native-base';

import { TransparentButton, RedButton, GreenButton } from './StyledComponents';

class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    };
  };
  state = {
    step: 0,
    showAnswer: false,
    correctAnswers: 0,
    selectedIndex: 0,
    summaryAnswers: []
  };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
  }

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
  saveAnswer = answered => {
    const { step, summaryAnswers } = this.state;
    const { questions } = this.props.deck;
    const question = questions[step];
    const sm = summaryAnswers.concat({
      ...question,
      answered
    });
    this.setState({ summaryAnswers: sm });
  };
  onBtnPress = type => {
    const { step, correctAnswers } = this.state;
    const { deck } = this.props;

    switch (type) {
      case 'correct':
        this.saveAnswer(true);
        this.setState({
          step: step + 1,
          correctAnswers: correctAnswers + 1,
          showAnswer: false
        });
        break;
      case 'incorrect':
        this.saveAnswer(false);
        this.setState({ step: step + 1, showAnswer: false });
        break;
      default:
        break;
    }
  };
  resetQuiz = () => {
    this.setState({
      correctAnswers: 0,
      showAnswer: false,
      step: 0,
      summaryAnswers: []
    });
  };
  selectIndex = selectedIndex => {
    this.setState({ selectedIndex });
  };
  _renderSummaryContent = () => {
    const { navigation } = this.props;
    const { summaryAnswers } = this.state;
    const { questions } = this.props.deck;

    const { selectedIndex, correctAnswers } = this.state;
    switch (selectedIndex) {
      case 0:
        return (
          <View>
            <View>
              <MainText>{`You got ${correctAnswers} correct answers out of ${
                questions.length
              } questions!`}</MainText>
            </View>
            <ButtonsContainer style={{ marginTop: 25 }}>
              <TransparentButton onPress={this.resetQuiz}>
                <Text>Start Over</Text>
              </TransparentButton>
              <TransparentButton
                style={{ marginTop: 10 }}
                onPress={() => navigation.goBack()}
              >
                <Text>Back to Deck</Text>
              </TransparentButton>
            </ButtonsContainer>
          </View>
        );
      case 1:
        return (
          <View>
            <List
              dataArray={summaryAnswers}
              renderRow={item => {
                const icon = item.answered ? 'md-checkmark' : 'md-close';
                const color = item.answered ? 'green' : 'red';
                return (
                  <ListItem icon style={styles.listItemHeight}>
                    <Body style={styles.listItemHeight}>
                      <ListItemHeader>
                        <Text style={{ fontSize: 8 }}>Question</Text>
                      </ListItemHeader>
                      <Text>{item.question}</Text>
                      <ListItemHeader style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 8 }}>Answer</Text>
                      </ListItemHeader>
                      <Text>{item.answer}</Text>
                    </Body>
                    <Right style={styles.listItemHeight}>
                      <Icon name={icon} style={{ color }} />
                    </Right>
                  </ListItem>
                );
              }}
            />
          </View>
        );
    }
  };
  _renderSummary() {
    const { selectedIndex } = this.state;

    return (
      <SummaryView>
        <Segment>
          <Button
            first
            active={selectedIndex === 0}
            onPress={() => this.selectIndex(0)}
          >
            <Text>Info</Text>
          </Button>
          <Button
            last
            active={selectedIndex === 1}
            onPress={() => this.selectIndex(1)}
          >
            <Text>Questions</Text>
          </Button>
        </Segment>
        <Content padder>{this._renderSummaryContent()}</Content>
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
          <GreenButton onPress={() => this.onBtnPress('correct')}>
            <StyledText>Correct</StyledText>
          </GreenButton>
          <RedButton
            style={{ marginTop: 10 }}
            onPress={() => this.onBtnPress('incorrect')}
          >
            <StyledText>Incorrect</StyledText>
          </RedButton>
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

const styles = StyleSheet.create({
  listItemHeight: {
    height: 200
  }
});

const ListItemHeader = styled.View`
  border-bottom-color: black;
  border-bottom-width: 2px;
`;

const ButtonsContainer = styled.View`
  align-items: center;
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
`;
