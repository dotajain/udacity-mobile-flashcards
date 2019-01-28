import React from 'react';
import { Button, Card, Title, Paragraph, Subheading } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import { getDateFromTimeStamp } from '../../utils/helpers';

import styles from './styles';
import colors from '../../utils/colors';

const CardListItem = ({ item, isShowAnswer, showAnswer }) => {
  const deck = item;
  return (
    <Card style={{ marginBottom: 10, backgroundColor: colors.smoke }}>
      <Card.Content style={{ marginBottom: 10 }}>
        <Paragraph style={{ color: colors.silver }}>
          <AntDesign name="calendar" size={16} />{' '}
          {getDateFromTimeStamp(deck.timestamp)}
        </Paragraph>
        <Subheading>Question:</Subheading>
        <Title style={{ color: colors.steel }}>{deck.question}</Title>
      </Card.Content>
      {isShowAnswer && (
        <Card.Content style={{ marginBottom: 10 }}>
          <Subheading>Answer:</Subheading>
          <Title style={{ color: colors.steel }}>{deck.answer}</Title>
        </Card.Content>
      )}
      <Card.Actions>
        <Button
          icon="fullscreen"
          mode="contained"
          onPress={() => showAnswer()}
          style={styles.primaryButton}>
          {isShowAnswer ? 'Hide' : 'Show'} Answer
        </Button>
      </Card.Actions>
    </Card>
  );
};
export default CardListItem;
