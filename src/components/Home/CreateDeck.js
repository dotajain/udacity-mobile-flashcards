import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Button,
  Card,
  Title,
  Modal,
  TextInput,
  Text,
} from 'react-native-paper';

import styles from './styles';

class CreateDeck extends Component {
  state = {
    value: '',
    error: false,
  };

  _hideModal = () => {
    this.props.hideModal();
    this.setState({ value: '', error: false });
  };

  _handleChangeText = value => {
    this.setState({ value, error: false });
  };
  _addDeck = () => {
    const { value } = this.state;
    const isDuplicate = this._isDuplicate(value);
    if (!isDuplicate && value) {
      this.props.createQuestionDeck(value);
      this.setState({ value: '', error: false });
    } else if (isDuplicate) {
      this.setState({
        error: '`Oops! ✋`, `Please give your deck a unique title! 🦄`',
      });
    } else {
      this.setState({ error: '!Please add the Deck name.' });
    }
  };
  _isDuplicate = value => {
    const filteredValue = this.props.decks.filter(
      item => item.title.trim() === value.trim()
    );
    return filteredValue.length > 0;
  };
  render() {
    const { value, error } = this.state;
    const { visible } = this.props;
    return (
      <Modal visible={visible} onDismiss={this._hideModal}>
        <View style={styles.modalContainer}>
          <Card>
            <Card.Content>
              <Title>Deck&apos;s name</Title>
              <TextInput
                label="Enter the name"
                value={value}
                mode="outlined"
                autoFocus={true}
                onChangeText={value => this._handleChangeText(value)}
                error={error}
              />
              {error && <Text style={styles.errorMessage}>{error}</Text>}
            </Card.Content>
            <Card.Actions>
              <Button onPress={this._hideModal}>Cancel</Button>
              <Button onPress={this._addDeck}>Ok</Button>
            </Card.Actions>
          </Card>
        </View>
      </Modal>
    );
  }
}

export default CreateDeck;
