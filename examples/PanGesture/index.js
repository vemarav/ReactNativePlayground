import React from 'react'
import {View, StyleSheet, Animated} from 'react-native'

import {
  PanGestureHandler,
  State
} from 'react-native-gesture-handler'

class App extends React.Component {
  constructor() {
    super()
    this.translateX = new Animated.Value(0)
    this.onGestureEvent = Animated.event([
      {
        nativeEvent: {
          translationX: this.translateX
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
    }
  }

  render() {
    return (
      <View style={{...styles.container}}>
        <PanGestureHandler
          onGestureEvent={this.onGestureEvent}
          onHandlerStateChange={this.onHandlerStateChange}>
          <Animated.View
            style={{
              ...styles.box,
              transform: [{translateX: this.translateX}]
            }}
          />
        </PanGestureHandler>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: '#256645'
  }
})

export default App
