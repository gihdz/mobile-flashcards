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

export const removeEntry = key => {
  return AsyncStorage.getItem(MOBILE_FLASHCARDS_DECKS_STORAGE_KEY).then(
    results => {
      const data = JSON.parse(results);
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(
        MOBILE_FLASHCARDS_DECKS_STORAGE_KEY,
        JSON.stringify(data)
      );
    }
  );
};
