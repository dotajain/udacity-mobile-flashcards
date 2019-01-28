import * as types from './actionTypes';
import { _getInitialData } from '../utils/api';
import { getQuestionCardsAction } from './cards';
import { getQuestionDeckAction } from './decks';

export const loading = isLoading => {
  return {
    type: types.INITIAL_LOADING,
    isLoading,
  };
};

export const handleInitialData = () => dispatch => {
  dispatch(loading(true));
  _getInitialData().then(res => {
    dispatch(getQuestionDeckAction(res.deck));
    dispatch(getQuestionCardsAction(res.cards));
    dispatch(loading(false));
  });
};
