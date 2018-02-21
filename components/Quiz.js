import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions
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
import FlipCard from 'react-native-flip-card';

import { TransparentButton, RedButton, GreenButton } from './StyledComponents';
import { Orientation } from '../utils/constants';
import { isPortrait, isLandscape } from '../utils/helpers';
class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    };
  };
  constructor(props) {
    super(props);
    const { width, height } = Dimensions.get('window');
    const { PORTRAIT, LANDSCAPE } = Orientation;

    this.state = {
      step: 0,
      showAnswer: false,
      correctAnswers: 0,
      summaryAnswers: [],
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
    const buttonText = showAnswer ? 'Question' : 'Answer';
    return (
      <MainContent>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <FlipCard
            perspective={5000}
            friction={10}
            flipHorizontal={true}
            flipVertical={false}
            clickable={false}
            flip={showAnswer}
            style={{ borderWidth: 0 }}
          >
            <QuestionAnswerContent>
              <QuestionAnswerScrollViewContainer>
                <QuestionAnswerScrollView>
                  <MainText>{question.question}</MainText>
                </QuestionAnswerScrollView>
              </QuestionAnswerScrollViewContainer>
              <TOAnswerQuestion
                onPress={() => {
                  this.setState({ showAnswer: true });
                }}
              >
                <AnswerQuestionText>Answer</AnswerQuestionText>
              </TOAnswerQuestion>
            </QuestionAnswerContent>
            <QuestionAnswerContent>
              <QuestionAnswerScrollViewContainer>
                <QuestionAnswerScrollView>
                  <MainText>{question.answer}</MainText>
                </QuestionAnswerScrollView>
              </QuestionAnswerScrollViewContainer>
              <TOAnswerQuestion
                onPress={() => {
                  this.setState({ showAnswer: false });
                }}
              >
                <AnswerQuestionText>Question</AnswerQuestionText>
              </TOAnswerQuestion>
            </QuestionAnswerContent>
          </FlipCard>
        </View>
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
            <ButtonsContainerPortrait style={{ marginTop: 25 }}>
              <TransparentButton onPress={this.resetQuiz}>
                <Text>Start Over</Text>
              </TransparentButton>
              <TransparentButton
                style={{ marginTop: 10 }}
                onPress={() => navigation.goBack()}
              >
                <Text>Back to Deck</Text>
              </TransparentButton>
            </ButtonsContainerPortrait>
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
    const { step, orientation } = this.state;
    if (step === questions.length) return this._renderSummary();

    const { PORTRAIT } = Orientation;
    const Layout =
      orientation === PORTRAIT ? QuizContentPortrait : QuizContentLandscape;
    const ButtonContainer =
      orientation !== PORTRAIT
        ? ButtonsContainerLandscape
        : ButtonsContainerPortrait;
    const view = this._renderContent();
    return (
      <Layout>
        <View>
          <StyledStepText>{`${step + 1}/${questions.length}`}</StyledStepText>
        </View>
        {view}
        <ButtonContainer>
          <GreenButton onPress={() => this.onBtnPress('correct')}>
            <StyledText>Correct</StyledText>
          </GreenButton>
          <RedButton
            style={{ marginTop: 10 }}
            onPress={() => this.onBtnPress('incorrect')}
          >
            <StyledText>Incorrect</StyledText>
          </RedButton>
        </ButtonContainer>
      </Layout>
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
  }
});

const ListItemHeader = styled.View`
  border-bottom-color: black;
  border-bottom-width: 2px;
`;

const ButtonsContainerPortrait = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  margin-top: 20;
`;
const ButtonsContainerLandscape = styled.View`
  align-items: center;
  justify-content: center;
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
  margin-top: 20px;
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
const QuizContentPortrait = styled.View`
  flex: 1;
  background-color: white;
`;
const QuizContentLandscape = styled.View`
  background-color: white;

  margin-top: 10px;
  flex: 1;
  flex-direction: row;
`;
const QuestionAnswerContent = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const QuestionAnswerScrollViewContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;
const QuestionAnswerScrollView = styled.ScrollView`
  border: 1px solid;
  flex: 1;
`;
