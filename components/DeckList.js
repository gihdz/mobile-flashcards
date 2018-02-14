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

import { addDecks } from '../actions/';
import { fetchDecks } from '../utils/api';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

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
      }
    });
    setLocalNotification();
  }
  render() {
    const { decks } = this.props;
    const { search, loading } = this.state;
    let decksArray = Object.keys(decks).map(d => decks[d]);
    decksArray.reverse();
    if (search) decksArray = decksArray.filter(d => d.title.includes(search));
    if (loading)
      return (
        <ActivityIndicatorView>
          <ActivityIndicator size="large" />
        </ActivityIndicatorView>
      );
    return (
      <View style={{ flex: 1 }}>
        <StyledTextInput
          placeholder="Search..."
          value={search}
          onChangeText={search => this.setState({ search })}
          selectTextOnFocus={true}
        />
        <FlatList
          style={{ flex: 1 }}
          data={decksArray}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}
const DeckRow = ({ deck, navigation }) => {
  const { title, questions } = deck;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DeckView', { entryId: title })}
    >
      <StyledDeckRow>
        <StyledDeckTitle>{title}</StyledDeckTitle>
        <StyledCardsText>{questions.length} cards</StyledCardsText>
      </StyledDeckRow>
    </TouchableOpacity>
  );
};
const mapStateToProps = state => {
  const { decks } = state;
  return {
    decks
  };
};
export default connect(mapStateToProps, { addDecks })(DeckList);

const StyledDeckRow = styled.View`
  border: 1px solid;
  height: 200;
  align-items: center;
  justify-content: center;
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
`;
const ActivityIndicatorView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
