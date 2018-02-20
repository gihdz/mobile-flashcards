import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { SwipeRow } from 'native-base';

import { addDecks } from '../actions/';
import { fetchDecks } from '../utils/api';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

import { TransparentButton, CenterView } from './StyledComponents';

class DeckList extends React.Component {
  state = {
    search: '',
    loading: true
  };
  renderItem = ({ item }) => {
    return <DeckRow deck={item} navigation={this.props.navigation} />;
  };
  componentDidMount() {
    fetchDecks().then(decks => {
      if (decks) {
        const { addDecks } = this.props;
        addDecks(JSON.parse(decks));
        this.setState({ loading: false });
        return;
      }
      this.setState({ loading: false });
    });
    setLocalNotification();
  }
  render() {
    const { decks, navigation } = this.props;
    const { search, loading } = this.state;
    if (loading)
      return (
        <ActivityIndicatorView>
          <ActivityIndicator size="large" />
        </ActivityIndicatorView>
      );

    let decksArray = Object.keys(decks).map(d => decks[d]);
    if (decksArray.length === 0)
      return (
        <CenterView>
          <TransparentButton
            onPress={() => {
              navigation.navigate('NewDeck');
            }}
          >
            <Text>Add new deck</Text>
          </TransparentButton>
        </CenterView>
      );
    decksArray.reverse();
    if (search) decksArray = decksArray.filter(d => d.title.includes(search));

    return (
      <View style={{ flex: 1 }}>
        <StyledTextInput
          placeholder="Search..."
          value={search}
          onChangeText={search => this.setState({ search })}
          selectTextOnFocus={true}
        />
        <StyledKeyboardAvoidingView
          behavior="position"
          contentContainerStyle={{ flex: 1 }}
        >
          <FlatList
            style={{ flex: 1 }}
            data={decksArray}
            renderItem={this.renderItem}
            keyExtractor={item => item.title}
          />
        </StyledKeyboardAvoidingView>
      </View>
    );
  }
}
const DeckRow = ({ deck, navigation }) => {
  const { title, questions } = deck;
  return (
    <TODeckContainer
      onPress={() => navigation.navigate('DeckView', { entryId: title })}
    >
      <StyledDeckRow>
        <StyledDeckTitle>{title}</StyledDeckTitle>
        <StyledCardsText>{questions.length} cards</StyledCardsText>
      </StyledDeckRow>
    </TODeckContainer>
  );
};
const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps, { addDecks })(DeckList);

const StyledDeckRow = styled.View`
  border: 1px solid;
  height: 200;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
const StyledDeckTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
`;
const StyledCardsText = styled.Text`
  color: gray;
`;

const StyledTextInput = styled.TextInput`
  min-height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom-width: 1px;
`;
const ActivityIndicatorView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TODeckContainer = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 10px;
`;

const StyledKeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;
