import React from 'react';
import { Button, Card, Headline, Text } from 'react-native-paper';
import { AntDesign, EvilIcons } from '@expo/vector-icons';

import colors from '../../utils/colors';

const ScoreView = ({ totalScore, totalCards, restartQuiz, backToDeckView }) => {
  return (
    <Card style={{ marginBottom: 10, backgroundColor: colors.smoke }}>
      <Card.Content style={{ marginBottom: 10 }}>
        <Headline
          style={{
            marginBottom: 20,
            textAlign: 'center',
          }}>
          Your Score
        </Headline>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 70,
            fontWeight: '600',
            color: colors.green,
          }}>
          {((totalScore / totalCards) * 100).toFixed(0)} %
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => restartQuiz()}
          style={{ backgroundColor: colors.purple }}>
          <EvilIcons name="refresh" size={30} /> Restart Quiz
        </Button>
        <Button
          mode="contained"
          onPress={() => backToDeckView()}
          style={{ marginLeft: 'auto', backgroundColor: colors.slate }}>
          <AntDesign name="home" size={20} /> Back To Deck
        </Button>
      </Card.Actions>
    </Card>
  );
};
export default ScoreView;
