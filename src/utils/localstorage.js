import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'DECKS_STORAGE_KEY:FLASHCARDS';
export const CARDS_STORAGE_KEY = 'CARDS_STORAGE_KEY:FLASHCARDS';

export const saveState = state => {
  try {
    const serializedDecksState = JSON.stringify(state.decks);
    const serializedCardsState = JSON.stringify(state.cards);
    AsyncStorage.setItem(DECKS_STORAGE_KEY, serializedDecksState);
    AsyncStorage.setItem(CARDS_STORAGE_KEY, serializedCardsState);
  } catch (err) {
    console.warn(err);
  }
};

export const loadState = () => {
  try {
    const serializedDecksState = AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const serializedCardsState = AsyncStorage.getItem(CARDS_STORAGE_KEY);

    if (serializedDecksState === null && serializedCardsState === null) {
      return undefined;
    }
    const data = {
      decks: JSON.parse(serializedDecksState),
      cards: JSON.parse(serializedCardsState),
    };
    return data;
  } catch (err) {
    return undefined;
  }
};
