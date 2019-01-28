import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeckList from './components/DeckList';
import DeckView from './components/DeckView';
import DeckQuiz from './components/DeckQuiz';

const RouteConfig = createStackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      header: null,
    },
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      header: null,
    },
  },
  DeckQuiz: {
    screen: DeckQuiz,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(RouteConfig);
