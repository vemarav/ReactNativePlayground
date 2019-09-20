console.disableYellowBox = true
import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'
import App from './src/navigation'
AppRegistry.registerComponent(appName, () => App)
