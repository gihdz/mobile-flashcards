import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  Container,
  Button,
  Text,
  List,
  ListItem,
  Right,
  Icon,
  Left,
  Body,
  Tabs,
  Tab,
  TabHeading
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
        <View style={{ borderWidth: 2, flexDirection: 'row', flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <MainText>{mainText}</MainText>
          </ScrollView>
        </View>
        <TOAnswerQuestion
          onPress={() => {
            this.setState({ showAnswer: !showAnswer });
          }}
        >
          <AnswerQuestionText>{buttonText}</AnswerQuestionText>
        </TOAnswerQuestion>
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
  _renderSummaryContent = selectedTab => {
    const { navigation } = this.props;
    const { summaryAnswers } = this.state;
    const { questions } = this.props.deck;

    const { correctAnswers } = this.state;
    switch (selectedTab) {
      case 'summary':
        return (
          <SummaryContent>
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
          </SummaryContent>
        );
      case 'cards':
        return (
          <View>
            <List
              dataArray={summaryAnswers}
              renderRow={item => {
                const icon = item.answered ? 'md-checkmark' : 'md-close';
                const color = item.answered ? 'green' : 'red';
                return (
                  <ListItem icon style={styles.listItemHeight}>
                    <Left style={styles.listItemHeight}>
                      <Icon name={icon} style={{ color }} />
                    </Left>
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
                  </ListItem>
                );
              }}
            />
          </View>
        );
      default:
        return (
          <View>
            <Text>No content for this tab</Text>
          </View>
        );
    }
  };
  _renderSummary() {
    const tabUnderlineStyle =
      Platform.OS === 'android' ? styles.tabBarUnderlineStyle : {};
    const tabHeadingStyles = Platform.OS === 'android' ? styles.tabHeading : {};
    const tabTextStyle = Platform.OS === 'android' ? styles.tabBarText : {};
    return (
      <SummaryView>
        <Tabs tabBarUnderlineStyle={tabUnderlineStyle}>
          <Tab
            heading={
              <TabHeading style={tabHeadingStyles}>
                <Text style={tabTextStyle}>Summary</Text>
              </TabHeading>
            }
          >
            {this._renderSummaryContent('summary')}
          </Tab>
          <Tab
            heading={
              <TabHeading style={tabHeadingStyles}>
                <Text style={tabTextStyle}>Cards</Text>
              </TabHeading>
            }
          >
            {this._renderSummaryContent('cards')}
          </Tab>
        </Tabs>
      </SummaryView>
    );
  }
  render() {
    const { questions } = this.props.deck;
    const { step } = this.state;
    if (step === questions.length) return this._renderSummary();

    const view = this._renderContent();
    return (
      <QuizContent>
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
      </QuizContent>
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
  },
  tabBarUnderlineStyle: {
    backgroundColor: 'blue'
  },
  tabHeading: {
    backgroundColor: 'white'
  },
  tabBarText: {
    color: 'black'
  },
  scrollViewContainer: {
    // borderWidth: 3
  }
});

const ListItemHeader = styled.View`
  border-bottom-color: black;
  border-bottom-width: 2px;
`;

const ButtonsContainer = styled.View`
  align-items: center;
  flex: 1;
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
  flex: 1;
  align-items: center;
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
const TOAnswerQuestion = styled.TouchableOpacity`
  padding-bottom: 30px;
`;
const SummaryView = styled.View`
  flex: 1;
  background-color: white;
`;
const SummaryContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-right: 20px;
  padding-left: 20px;
`;
const QuizContent = styled.View`
  flex: 1;
`;
