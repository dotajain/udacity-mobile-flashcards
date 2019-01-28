import * as types from './actionTypes';
import { _removeDeck, _createQuestionDeck } from '../utils/api';

export const getQuestionDeckAction = data => ({
  type: types.GET_QUESTION_DECK,
  data,
});

const deletingDeck = () => ({
  type: types.DELETE_QUESTION_DECK,
});

const deleteDeckSuccess = deckId => ({
  type: types.DELETE_QUESTION_DECK_SUCCESS,
  deckId,
});

const deleteDeckFail = error => ({
  type: types.DELETE_QUESTION_DECK_FAIL,
  error,
});

const addQuestionDeck = () => ({
  type: types.ADD_QUESTION_DECK,
});

const addQuestionDeckSuccess = deck => ({
  type: types.ADD_QUESTION_DECK_SUCCESS,
  deck,
});

const updateCardQuestionDeck = (deckId, cardId) => ({
  type: types.UPDATE_QUESTION_DECK_CARD,
  deckId,
  cardId,
});

export const deleteQuestionDeck = deckId => dispatch => {
  dispatch(deletingDeck());
  _removeDeck(deckId)
    .then(deckId => dispatch(deleteDeckSuccess(deckId)))
    .catch(() => dispatch(deleteDeckFail(`Error deleting deck: ${deckId}`)));
};

export const createQuestionDeck = deckTitle => dispatch => {
  dispatch(addQuestionDeck());
  _createQuestionDeck(deckTitle).then(deck => {
    dispatch(addQuestionDeckSuccess(deck));
  });
};

export const updateCardInQuestionDeck = (deckId, cardId) => dispatch => {
  dispatch(updateCardQuestionDeck(deckId, cardId));
};
