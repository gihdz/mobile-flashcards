import { AsyncStorage } from 'react-native';

const MOBILE_FLASHCARDS_DECKS_STORAGE_KEY = 'MobileFlashcards:Decks';

export function fetchDecks() {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_STORAGE_KEY);
}
export const submitDeck = title => {
  return AsyncStorage.mergeItem(
    MOBILE_FLASHCARDS_DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  );
};
export const submitCard = (title, question, answer) => {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_STORAGE_KEY).then(
    decks => {
      const deck = JSON.parse(decks)[title];
      const newDeck = {
        [title]: {
          ...deck,
          questions: [
            ...deck.questions,
            {
              question,
              answer
            }
          ]
        }
      };
      return AsyncStorage.mergeItem(
        MOBILE_FLASHCARDS_DECKS_STORAGE_KEY,
        JSON.stringify(newDeck)
      );
    }
  );
};

export const removeDeck = title => {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_STORAGE_KEY).then(
    decks => {
      const jsonDecks = JSON.parse(decks);
      jsonDecks[title] = undefined;
      delete jsonDecks[title];
      AsyncStorage.setItem(
        MOBILE_FLASHCARDS_DECKS_STORAGE_KEY,
        JSON.stringify(jsonDecks)
      );
    }
  );
};
