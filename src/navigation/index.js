import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import PageNames from './page-names'

// import screens
import Home from '../examples/Home'
import Login from '../examples/Login'
import PanGesture from '../examples/PanGesture'
import Pie from '../examples/D3/Pie'
import Discovery from '../examples/Discovery'

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
    },
    [PageNames.Discovery]: {
      screen: Discovery,
      navigationOptions: {
        title: PageNames.Discovery
      }
    }
  },
  {
    initialRouteName: PageNames.Home
  }
)
const App = createAppContainer(AppNavigator)
export default App
