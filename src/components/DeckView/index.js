import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Appbar,
  Button,
  Text,
  Headline,
  Chip,
  Portal,
} from 'react-native-paper';

import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons';

import { createQuestionCard } from '../../actions/cards';

import CreateCard from './CreateCard';

import styles from './styles';
import colors from '../../utils/colors';

class DeckView extends Component {
  state = {
    visible: false,
  };
  _goBack = () => {
    const { navigation } = this.props;
    navigation.navigate('DeckList');
  };

  renderEmptyViewScreen = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="data-usage" size={80} style={styles.emptyIcon} />
      <Text style={styles.emptyText}>
        Seems that you don&apos;t have any cards yet! Start creating a new one
        tapping the plus button below.
      </Text>
      <Button
        icon="add"
        mode="contained"
        onPress={() => this._showModal()}
        style={styles.button}>
        Add Cards
      </Button>
    </View>
  );
  _startQuiz = () => {
    const { navigation } = this.props;
    navigation.navigate('DeckQuiz', this.props.deck);
  };

  renderCardViewScreen = () => (
    <View style={styles.emptyContainer}>
      <Headline style={{ textAlign: 'center', marginBottom: 10 }}>
        <Ionicons name="md-chatbubbles" size={25} /> {this.props.deck.title}
      </Headline>
      <Chip style={{ marginBottom: 10 }}>
        Total cards: {this.props.deck.cards.length} cards
      </Chip>
      <Button
        mode="contained"
        onPress={() => this._startQuiz()}
        style={{ backgroundColor: colors.purple, marginBottom: 15 }}>
        <Ionicons name="ios-log-in" size={20} /> Start Quiz
      </Button>
      <Portal style={{ alignSelf: 'flex-end' }}>
        <Button style={styles.addButton} onPress={() => this._showModal()}>
          <MaterialCommunityIcons name="plus" size={30} color={colors.white} />
        </Button>
      </Portal>
    </View>
  );

  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });

  _createQuestionCard = (question, answer) => {
    this._hideModal();
    this.props.createQuestionCard(this.props.deck.id, question, answer);
  };

  render() {
    const { deck } = this.props;
    const { visible } = this.state;
    return (
      <View style={styles.screenContainer}>
        <Appbar.Header>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content
            title={deck.title}
            subtitle="Enhance your knowledge"
          />
        </Appbar.Header>
        {deck.cards.length > 0
          ? this.renderCardViewScreen()
          : this.renderEmptyViewScreen()}
        <CreateCard
          visible={visible}
          showModal={this._showModal}
          hideModal={this._hideModal}
          createQuestionCard={this._createQuestionCard}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ decks, cards }, props) => {
  const deck = decks.data[props.navigation.state.params.id];
  return {
    deck,
  };
};

export default connect(
  mapStateToProps,
  { createQuestionCard }
)(DeckView);
