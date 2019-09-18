/**
 * @format
 */

console.disableYellowBox = true

import {AppRegistry} from 'react-native'
import Login from './examples/Login'
import PanGesture from './examples/PanGesture'
import {name as appName} from './app.json'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    PanGesture: {
      screen: PanGesture,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Login'
  }
)

const App = createAppContainer(AppNavigator)

AppRegistry.registerComponent(appName, () => App)
