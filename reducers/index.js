import { ADD_CARD, ADD_DECK } from '../actions';
const defaultState = {
  decks: {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer:
            'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        ['decks']: {
          ...state.decks,
          [action.title]: {
            title: action.title,
            questions: []
          }
        }
      };
      break;
    case ADD_CARD:
      const questions = [
        ...state[title].questions,
        { question: action.question, answer: action.answer }
      ];
      const deck = { ...state[title], questions };
      return {
        ...state,
        [action.title]: deck
      };
      break;
    default:
      return state;
  }
};
