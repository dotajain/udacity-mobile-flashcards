import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './components/Home';
import Questions from './components/Questions';
import Quiz from './components/Quiz';

const RouteConfig = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Questions: {
    screen: Questions,
    navigationOptions: {
      header: null,
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      header: null,
    },
  },
});

export default createAppContainer(RouteConfig);
