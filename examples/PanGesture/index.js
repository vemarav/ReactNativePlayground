import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar
} from 'react-native'

import {
  PanGestureHandler,
  State,
  TapGestureHandler
} from 'react-native-gesture-handler'

class App extends React.Component {
  constructor() {
    super()
    this.translateX = new Animated.Value(0)
    this.translateY = new Animated.Value(0)
    this.onGestureEvent = Animated.event([
      {
        nativeEvent: {
          translationX: this.translateX,
          translationY: this.translateY
        }
      }
    ])
  }

  onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.timing(this.translateX, {
        toValue: 0,
        duration: 500
      }).start()
      Animated.timing(this.translateY, {
        toValue: 0,
        duration: 500
      }).start()
    }
  }

  goBack = () => {
    this.props.navigation.pop()
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 35}}>
        <StatusBar
          barStyle={'dark-content'}
          translucent
          backgroundColor={'transparent'}
        />
        <TapGestureHandler
          onHandlerStateChange={this.goBack}>
          <View
            style={{
              paddingHorizontal: 16,
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              paddingVertical: 16
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold'
              }}>{`◁ Go Back Simon`}</Text>
          </View>
        </TapGestureHandler>
        <View style={{...styles.container}}>
          <PanGestureHandler
            onGestureEvent={this.onGestureEvent}
            onHandlerStateChange={
              this.onHandlerStateChange
            }>
            <Animated.View
              style={{
                ...styles.box,
                transform: [
                  {translateX: this.translateX},
                  {translateY: this.translateY}
                ]
              }}
            />
          </PanGestureHandler>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#0275d8',
    shadowOffset: {width: 5, height: 5},
    shadowColor: '#000',
    shadowOpacity: 0.5,
    elevation: 10
  }
})

export default App
