import * as types from '../actions/actionTypes';

const initialState = {
  data: '',
  isLoading: true,
  isAdding: false,
};
const cards = (state = initialState, action) => {
  switch (action.type) {
    case types.INITIAL_LOADING:
      return { ...state, isLoading: action.isLoading };
    case types.GET_QUESTION_CARD:
      return { ...state, data: action.data };
    case types.ADD_QUESTION_CARD:
      return { ...state, isAdding: true };
    case types.ADD_QUESTION_CARD_SUCCESS:
      return {
        ...state,
        isAdding: false,
        data: {
          ...state.data,
          [action.card.id]: action.card,
        },
      };
    default:
      return state;
  }
};

export default cards;
