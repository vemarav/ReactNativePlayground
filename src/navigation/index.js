import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import PageNames from './page-names'

// import screens
import Home from '../examples/Home'
import Login from '../examples/Login'
import PanGesture from '../examples/PanGesture'

const AppNavigator = createStackNavigator(
  {
    [PageNames.Home]: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    [PageNames.Login]: {
      screen: Login,
      navigationOptions: {
        title: 'Click Sign In'
      }
    },
    [PageNames.PanGesture]: {
      screen: PanGesture,
      navigationOptions: {
        title: 'Drag Circle'
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
)
const App = createAppContainer(AppNavigator)
export default App
