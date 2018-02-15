export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const ADD_DECKS = 'ADD_DECKS';
export const REMOVE_DECK = 'REMOVE_DECK';

export const addDeck = title => {
  return {
    type: ADD_DECK,
    title
  };
};

export const addCard = (title, question, answer) => {
  return {
    type: ADD_CARD,
    title,
    question,
    answer
  };
};

export const addDecks = decks => {
  return {
    type: ADD_DECKS,
    decks
  };
};

export const deleteDeck = title => {
  return {
    type: REMOVE_DECK,
    title
  };
};
