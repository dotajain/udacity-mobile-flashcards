import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Button,
  Card,
  Title,
  Modal,
  TextInput,
  HelperText,
} from 'react-native-paper';

import styles from './styles';

class CreateCard extends Component {
  state = {
    answer: '',
    question: '',
    error: false,
  };

  _hideModal = () => {
    this.props.hideModal();
    this.setState({ answer: '', question: '', error: false });
  };

  _handleQuestionText = value => {
    this.setState({ question: value, error: false });
  };

  _handleAnswerText = value => {
    this.setState({ answer: value, error: false });
  };

  _addCard = () => {
    const { question, answer } = this.state;
    if (question && answer) {
      this.props.createQuestionCard(question, answer);
      this.setState({ answer: '', question: '', error: false });
    } else {
      this.setState({ error: '!Please add the Question and Answer.' });
    }
  };

  render() {
    const { question, answer, error } = this.state;
    const { visible } = this.props;
    return (
      <Modal
        style={{ flex: 1, zIndex: 1 }}
        visible={visible}
        onDismiss={this._hideModal}>
        <View style={styles.modalContainer}>
          <Card>
            <Card.Content>
              <Title>Add Your Quiz Question and Answer</Title>
              <TextInput
                label="Enter Question"
                value={question}
                mode="outlined"
                autoFocus={true}
                onChangeText={value => this._handleQuestionText(value)}
                error={error}
              />
              <TextInput
                label="Enter Answer"
                value={answer}
                mode="outlined"
                onChangeText={value => this._handleAnswerText(value)}
                error={error}
                multiline={true}
              />
              <HelperText type="error" visible={error}>
                Please add the Question and Answer.
              </HelperText>
            </Card.Content>
            <Card.Actions>
              <Button onPress={this._hideModal}>Cancel</Button>
              <Button onPress={this._addCard}>Create Card</Button>
            </Card.Actions>
          </Card>
        </View>
      </Modal>
    );
  }
}

export default CreateCard;
