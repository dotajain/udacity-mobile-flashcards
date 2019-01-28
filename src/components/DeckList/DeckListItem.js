import React from 'react';
import { Button, Card, Title, Paragraph, Chip } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import { getDateFromTimeStamp } from '../../utils/helpers';

import styles from './styles';
import colors from '../../utils/colors';

const DeckListItems = ({ item, openDeckDetails, removeDeck, editDeck }) => {
  const deck = item;
  return (
    <Card style={{ marginBottom: 10 }}>
      <Card.Content style={{ marginBottom: 10 }}>
        <Title style={{ color: colors.steel }}>{deck.title}</Title>
        <Paragraph style={{ color: colors.silver }}>
          <AntDesign name="calendar" size={16} />{' '}
          {getDateFromTimeStamp(deck.timestamp)}
        </Paragraph>
        {deck.cards.length > 0 ? (
          <Chip mode="outlined">Total Question: {deck.cards.length}</Chip>
        ) : (
          <Chip icon="info" mode="flat">
            You have not added any quest yet! Start Adding
          </Chip>
        )}
      </Card.Content>
      <Card.Actions>
        <Button
          icon={deck.cards.length > 0 ? 'fullscreen' : 'add'}
          mode="contained"
          onPress={() => openDeckDetails(item)}
          style={styles.primaryButton}>
          {deck.cards.length > 0 ? 'View' : 'Add Cards'}
        </Button>
        <Button
          icon="delete"
          color={colors.negative}
          onPress={() => removeDeck(item)}>
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );
};
export default DeckListItems;
