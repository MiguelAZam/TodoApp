import {createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from './routes/home/';
import SubmitScreen from './routes/submitForm/';

const App = createStackNavigator({
  Home: {screen: HomeScreen},
  EditAdd: {screen: SubmitScreen}
});

export default createAppContainer(App);