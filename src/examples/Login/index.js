import React from 'react'
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native'
import {runTiming} from './runTiming'
import Animated from 'react-native-reanimated'
import {TapGestureHandler, State} from 'react-native-gesture-handler'
import Svg, {Image, Circle, ClipPath} from 'react-native-svg'

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  interpolate,
  Extrapolate,
  concat
} = Animated

let {width, height} = Dimensions.get('screen')
height = height - 84

class App extends React.Component {
  constructor() {
    super()

    this.buttonOpacity = new Value(1)
    this.onStateChange = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ])

    this.onCloseState = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ])

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    })

    this.bgYRange = -height / 3 - 50

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [this.bgYRange, 0]
    })

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    })

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP
    })

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    })

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    })
  }

  navigate = () => {
    this.props.navigation.navigate('PanGesture')
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-end'
        }}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{translateY: this.bgY}]
          }}>
          <Svg width={width} height={height + 50}>
            <ClipPath id="clip">
              <Circle r={height + 50} cx={width / 2} />
            </ClipPath>
            <Image
              href={require('../../assets/login/bg.jpg')}
              width={width}
              height={height + 50}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View
          style={{
            height: height / 3,
            justifyContent: 'center'
          }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [
                  {
                    translateY: this.buttonY
                  }
                ]
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                SIGN IN
              </Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: '#2E71DC',
              opacity: this.buttonOpacity,
              transform: [
                {
                  translateY: this.buttonY
                }
              ]
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white'
              }}>
              SIGN IN WITH FACEBOOK
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              zIndex: this.textInputZindex,
              opacity: this.textInputOpacity,
              transform: [{translateY: this.textInputY}],
              height: height / 3,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: 'center'
            }}>
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    transform: [
                      {
                        rotate: concat(this.rotateCross, 'deg')
                      }
                    ]
                  }}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
              placeholder="EMAIL"
              placeholderTextColor="black"
              style={styles.textInput}
            />
            <TextInput
              placeholder="PASSWORD"
              placeholderTextColor="black"
              style={styles.textInput}
            />
            <TapGestureHandler onHandlerStateChange={this.navigate}>
              <Animated.View style={styles.button}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}>
                  SIGN IN
                </Text>
              </Animated.View>
            </TapGestureHandler>
          </Animated.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderRadius: 35,
    backgroundColor: 'white',
    marginHorizontal: 20,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 3,
    borderColor: 'rgba(0,0,0,.1)',
    borderWidth: 0.5
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,.2)'
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 3,
    borderColor: 'rgba(0,0,0,.1)',
    borderWidth: 0.5
  }
})

export default App
