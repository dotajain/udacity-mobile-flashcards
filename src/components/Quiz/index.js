import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Button, Chip } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import CardListItem from './CardListItem';
import ScoreView from './ScoreView';

import styles from './styles';
import colors from '../../utils/colors';

class Quiz extends Component {
  state = {
    isShowAnswer: false,
    isLastCard: false,
    cardIndex: 0,
    score: 0,
  };

  _goBack = () => {
    const { navigation } = this.props;
    navigation.navigate('Questions', this.props.deck);
  };

  _showAnswer = () => {
    this.setState(preState => ({
      isShowAnswer: !preState.isShowAnswer,
    }));
  };

  renderCards = () => {
    const { cardIndex, isShowAnswer } = this.state;
    const { cards } = this.props;
    return (
      <CardListItem
        item={cards[cardIndex]}
        showAnswer={this._showAnswer}
        isShowAnswer={isShowAnswer}
      />
    );
  };
  _backToDeck = () => {
    this.props.navigation.navigate('Home');
  };
  _restartQuiz = () => {
    this.setState({
      isShowAnswer: false,
      isLastCard: false,
      cardIndex: 0,
      score: 0,
    });
  };
  renderScores = () => {
    return (
      <ScoreView
        totalScore={this.state.score}
        restartQuiz={this._restartQuiz}
        backToDeckView={this._backToDeck}
        totalCards={this.props.cards.length}
      />
    );
  };

  handleSelectClick = isCorrect => {
    const { cardIndex } = this.state;
    const { cards } = this.props;
    if (cardIndex + 1 === cards.length) {
      this.setState(preState => ({
        isLastCard: true,
        score: isCorrect ? preState.score + 1 : preState.score,
      }));
    } else {
      this.setState(preState => ({
        isQuestionSide: true,
        cardIndex: preState.cardIndex + 1,
        score: isCorrect ? preState.score + 1 : preState.score,
      }));
    }
  };

  render() {
    const { deck, cards } = this.props;
    const { cardIndex, isLastCard } = this.state;
    const totalQuestions = cards.length;
    return (
      <View style={styles.screenContainer}>
        <Appbar.Header>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content title={deck.title} subtitle="Start Quiz" />
        </Appbar.Header>
        <View style={styles.mainContentStyle}>
          <Chip
            icon="info"
            style={{ marginBottom: 10, backgroundColor: colors.silver }}>
            Total Question: {`${cardIndex + 1}/${totalQuestions}`}
          </Chip>
          {isLastCard ? this.renderScores() : this.renderCards()}
        </View>

        {!isLastCard && (
          <View style={styles.emptyContainer}>
            <Button
              mode="contained"
              onPress={() => this.handleSelectClick(true)}
              style={{ marginBottom: 30, backgroundColor: colors.purple }}>
              <Ionicons name="md-checkmark-circle-outline" size={20} /> Correct
            </Button>
            <Button
              mode="contained"
              onPress={() => this.handleSelectClick(false)}
              style={{ marginBottom: 30, backgroundColor: colors.negative }}>
              <Ionicons name="md-close" size={20} /> Incorrect
            </Button>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ decks, cards }, props) => {
  const deck = decks.data[props.navigation.state.params.id];
  return {
    deck,
    cards: deck.cards
      .map(card => cards.data[card])
      .sort((a, b) => b.timestamp - a.timestamp),
  };
};

export default connect(
  mapStateToProps,
  {}
)(Quiz);
