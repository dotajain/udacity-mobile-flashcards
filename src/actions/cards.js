import * as types from './actionTypes';
import { _createQuestionCard } from '../utils/api';
import { updateCardInQuestionDeck } from './decks';

export const getQuestionCardsAction = data => {
  return {
    type: types.GET_QUESTION_CARD,
    data,
  };
};

const addQuestionCard = () => ({
  type: types.ADD_QUESTION_CARD,
});

const addQuestionCardSuccess = card => ({
  type: types.ADD_QUESTION_CARD_SUCCESS,
  card,
});

export const createQuestionCard = (deckId, question, answer) => dispatch => {
  dispatch(addQuestionCard());
  _createQuestionCard(deckId, question, answer).then(card => {
    dispatch(addQuestionCardSuccess(card));
    const cardId = card.id;
    dispatch(updateCardInQuestionDeck(deckId, cardId));
  });
};
