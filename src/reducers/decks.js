import * as types from '../actions/actionTypes';
import { decouple } from '../utils/helpers';

const initialState = {
  data: '',
  isLoading: true,
  isAdding: false,
  deleteError: null,
};

const decks = (state = initialState, action) => {
  switch (action.type) {
    case types.INITIAL_LOADING:
      return { ...state, isLoading: action.isLoading };
    case types.GET_QUESTION_DECK:
      return { ...state, data: action.data };
    case types.DELETE_QUESTION_DECK:
      return {
        ...state,
        deleteError: null,
      };
    case types.DELETE_QUESTION_DECK_SUCCESS:
      return {
        ...state,
        data: {
          ...decouple(state.data)(action.deckId),
        },
      };
    case types.DELETE_QUESTION_DECK_FAIL:
      return {
        ...state,
        deleteError: action.error,
      };
    case types.ADD_QUESTION_DECK:
      return {
        ...state,
        isAdding: true,
      };
    case types.ADD_QUESTION_DECK_SUCCESS:
      return {
        ...state,
        isAdding: false,
        data: {
          ...state.data,
          [action.deck.id]: action.deck,
        },
      };
    case types.UPDATE_QUESTION_DECK_CARD:
      return {
        ...state,
        data: {
          ...state.data,
          [action.deckId]: {
            ...state.data[action.deckId],
            cards: [...state.data[action.deckId].cards, action.cardId],
          },
        },
      };
    default:
      return state;
  }
};
export default decks;
