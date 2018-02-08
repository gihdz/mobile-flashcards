import React from 'react';
import { View, ScrollView } from 'react-native';

import DeckList from './DeckList';
import styled from 'styled-components';

const StyledDeckListContainer = styled.View`
  flex: 1;
`;

const DeckListContainer = ({ navigation }) => {
  return (
    <StyledDeckListContainer>
      <DeckList navigation={navigation} />
    </StyledDeckListContainer>
  );
};

export default DeckListContainer;
