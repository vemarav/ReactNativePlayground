import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import PageNames from './page-names'

// import screens
import Home from '../examples/Home'
import Login from '../examples/Login'
import PanGesture from '../examples/PanGesture'
import Pie from '../examples/D3/Pie'

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
        title: PageNames.Login
      }
    },
    [PageNames.PanGesture]: {
      screen: PanGesture,
      navigationOptions: {
        title: PageNames.PanGesture
      }
    },
    [PageNames.Pie]: {
      screen: Pie,
      navigationOptions: {
        title: PageNames.Pie
      }
    }
  },
  {
    initialRouteName: PageNames.Home
  }
)
const App = createAppContainer(AppNavigator)
export default App
