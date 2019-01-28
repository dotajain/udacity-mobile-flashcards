import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Appbar, Button, Text, Portal } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { deleteQuestionDeck, createQuestionDeck } from '../../actions/decks';

import ListView from './ListView';
import CreateDeck from './CreateDeck';
import DeckListItems from './DeckListItem';

import styles from './styles';
import colors from '../../utils/colors';

class DeckList extends Component {
  state = {
    visible: false,
  };

  renderEmptyScreen = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="data-usage" size={80} style={styles.emptyIcon} />
      <Text style={styles.emptyText}>
        Seems that you don&apos;t created any question yet!
      </Text>
      <Button
        icon="add"
        mode="contained"
        onPress={this._showModal}
        style={styles.button}>
        Add New Questions
      </Button>
    </View>
  );

  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });

  _openDeckDetails = deck => {
    const { navigation } = this.props;
    navigation.navigate('DeckView', deck);
  };

  _createQuestionDeck = deck => {
    this.props.createQuestionDeck(deck);
    this.setState({ visible: false });
  };

  _removeDeck = deck => this.props.deleteQuestionDeck(deck.id);

  _renderItems = ({ item }) => (
    <DeckListItems
      item={item}
      openDeckDetails={this._openDeckDetails}
      removeDeck={this._removeDeck}
    />
  );

  render() {
    const { decks, isLoading } = this.props;
    const { visible } = this.state;
    if (isLoading) {
      return (
        <View style={styles.baseContainer}>
          <View style={styles.loadingContainer}>
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              style={styles.logoColor}
              size={80}
            />
            <Text style={styles.logoText}>AJ-Flash-Cards</Text>
            <Text style={styles.loadingText}>loading...</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <Portal.Host>
          <View style={styles.screenContainer}>
            <Appbar.Header style={styles.appBarStyle}>
              <MaterialCommunityIcons name="view-dashboard-outline" size={30} />
              <Appbar.Content
                title="AJ-FLASH CARDS"
                subtitle="View all questions"
                subtitleStyle={{ color: colors.white }}
              />
            </Appbar.Header>
            {!isLoading && decks.length > 0 ? (
              <View style={styles.mainContentStyle}>
                <ListView
                  data={decks}
                  extraData={this.state}
                  renderItem={this._renderItems}
                  style={styles.listView}
                />

                <Portal style={{ alignSelf: 'flex-end' }}>
                  <Button
                    style={styles.addButton}
                    onPress={() => this._showModal()}>
                    <MaterialCommunityIcons
                      name="plus"
                      size={30}
                      color={colors.white}
                    />
                  </Button>
                </Portal>
              </View>
            ) : (
              this.renderEmptyScreen()
            )}
          </View>
        </Portal.Host>
        <CreateDeck
          visible={visible}
          showModal={this._showModal}
          hideModal={this._hideModal}
          decks={decks}
          createQuestionDeck={this._createQuestionDeck}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => {
  return {
    decks: Object.values(decks.data).sort((a, b) => b.timestamp - a.timestamp),
    isLoading: decks.isLoading,
  };
};

export default connect(
  mapStateToProps,
  { deleteQuestionDeck, createQuestionDeck }
)(DeckList);
