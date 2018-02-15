import { ADD_CARD, ADD_DECK, ADD_DECKS, REMOVE_DECK } from '../actions';
const defaultState = {
  decks: {}
  // decks: {
  //   React: {
  //     title: 'React',
  //     questions: [
  //       {
  //         question: 'What is React?',
  //         answer: 'A library for managing user interfaces'
  //       },
  //       {
  //         question: 'Where do you make Ajax requests in React?',
  //         answer: 'The componentDidMount lifecycle event'
  //       }
  //     ]
  //   },
  //   JavaScript: {
  //     title: 'JavaScript',
  //     questions: [
  //       {
  //         question: 'What is a closure?',
  //         answer:
  //           'The combination of a function and the lexical environment within which that function was declared.'
  //       }
  //     ]
  //   }
  // }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: {
            title: action.title,
            questions: []
          }
        }
      };
      break;
    case ADD_CARD:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: {
            ...state.decks[action.title],
            questions: [
              ...state.decks[action.title].questions,
              {
                question: action.question,
                answer: action.answer
              }
            ]
          }
        }
      };
      break;
    case ADD_DECKS:
      return {
        ...state,
        decks: action.decks
      };
    case REMOVE_DECK:
      const decks = {
        ...state.decks
      };
      delete decks[action.title];
      return {
        ...state,
        decks: {
          ...decks
        }
      };

    default:
      return state;
  }
};
