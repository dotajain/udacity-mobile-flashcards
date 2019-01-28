import { AsyncStorage } from 'react-native';
import { questionCards, questionDeck } from './_DATA';
import { decouple, generateUID } from './helpers';
import { DECKS_STORAGE_KEY, CARDS_STORAGE_KEY } from './localstorage';

export const _getQuestionDeck = () =>
  new Promise((res, rej) => {
    setTimeout(() => res({ ...questionDeck }), 1000);
  });

export const _getQuestionCards = () =>
  new Promise((res, rej) => {
    setTimeout(() => res({ ...questionCards }), 1000);
  });

export const _getInitialData = () =>
  Promise.all([_getQuestionDeck(), _getQuestionCards()]).then(
    ([deck, cards]) => ({
      deck,
      cards,
    })
  );

const formatQuestion = questionText => {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    title: questionText,
    cards: [],
  };
};
export const _createQuestionDeck = questionText => {
  return new Promise((res, rej) => {
    const formattedQuestion = formatQuestion(questionText);
    setTimeout(() => {
      AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
        const oldState = JSON.parse(results);
        AsyncStorage.setItem(
          DECKS_STORAGE_KEY,
          JSON.stringify({
            ...oldState,
            data: {
              ...oldState.data,
              [formattedQuestion.id]: formattedQuestion,
            },
          })
        );
      });
      res(formattedQuestion);
    }, 1000);
  });
};

export const _removeDeck = deckId => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => {
      const oldState = JSON.parse(results);
      const { data } = oldState; // deck from the deleted deck
      const deck = data[deckId];
      const { cards } = deck;
      const newData = decouple(data)(deckId);
      AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify({ ...oldState, data: newData })
      );
      AsyncStorage.getItem(CARDS_STORAGE_KEY).then(cardResults => {
        const oldCardState = JSON.parse(cardResults);
        const oldCardData = oldCardState.data; // cards from the deleted deck
        const newCardsState = cards.reduce((acc, next) => {
          acc = decouple(acc)(next);
          return acc;
        }, oldCardData);
        AsyncStorage.setItem(
          CARDS_STORAGE_KEY,
          JSON.stringify({ ...oldCardData, data: newCardsState })
        );
      });
    })
    .then(() => deckId);
};

const formatQuestionCard = (question, answer) => {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    question: question,
    answer: answer,
  };
};

export const _createQuestionCard = (deckId, question, answer) => {
  return new Promise((res, rej) => {
    const formattedQuestionCard = formatQuestionCard(question, answer);
    setTimeout(() => {
      AsyncStorage.getItem(CARDS_STORAGE_KEY).then(results => {
        const oldState = JSON.parse(results);
        AsyncStorage.setItem(
          CARDS_STORAGE_KEY,
          JSON.stringify({
            ...oldState,
            data: {
              ...oldState.data,
              [formattedQuestionCard.id]: formattedQuestionCard,
            },
          })
        );
      });
      _updateCardInQuestionDeck(deckId, formattedQuestionCard.id);
      res(formattedQuestionCard);
    }, 1000);
  });
};

export const _updateCardInQuestionDeck = (deckId, cardId) => {
  AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    const oldState = JSON.parse(results);
    AsyncStorage.setItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        ...oldState,
        data: {
          ...oldState.data,
          [deckId]: {
            ...oldState.data[deckId],
            cards: [...oldState.data[deckId].cards, cardId],
          },
        },
      })
    );
  });
};
