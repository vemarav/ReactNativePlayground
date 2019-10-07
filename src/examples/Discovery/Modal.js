import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import Animated from 'react-native-reanimated'
import {PanGestureHandler, State} from 'react-native-gesture-handler'
import Video from 'react-native-video'

const SCREEN_DIMENSIONS = Dimensions.get('window')

const {
  and,
  block,
  call,
  cond,
  clockRunning,
  event,
  eq,
  greaterThan,
  interpolate,
  lessOrEq,
  set,
  spring,
  startClock,
  stopClock,
  Clock,
  Value
} = Animated

function runSpring(value, dest) {
  const clock = new Clock()
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  }

  const config = {
    damping: 7,
    mass: 1,
    stiffness: 121.7,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0)
  }

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    set(value, state.position)
  ]
}

class Modal extends React.Component {
  constructor(props) {
    super(props)
    const {x, y, width, height} = props.position
    this.translateX = new Value(x)
    this.translateY = new Value(y)
    this.width = new Value(width)
    this.height = new Value(height)
    this.velocityY = new Value(0)
    this.xstate = new Value(State.UNDETERMINED)
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
            translationY: this.translateY,
            velocityY: this.velocityY,
            state: this.xstate
          }
        }
      ],
      {useNativeDriver: true}
    )
    this.state = {isVideoLoaded: false}
  }

  videoLoaded = () => {
    this.setState({
      isVideoLoaded: true
    })
  }

  render() {
    const {story, position, onClose} = this.props
    const {translateX, translateY, width, height, onGestureEvent} = this
    const style = {
      ...StyleSheet.absoluteFillObject,
      width,
      height,
      transform: [{translateX}, {translateY}]
    }
    return (
      <View style={styles.container}>
        <Animated.Code>
          {() =>
            block([
              cond(
                eq(this.xstate, State.UNDETERMINED),
                runSpring(this.translateX, 0)
              ),
              cond(
                eq(this.xstate, State.UNDETERMINED),
                runSpring(this.translateY, 0)
              ),
              cond(
                eq(this.xstate, State.UNDETERMINED),
                runSpring(this.width, SCREEN_DIMENSIONS.width)
              ),
              cond(
                eq(this.xstate, State.UNDETERMINED),
                runSpring(this.height, SCREEN_DIMENSIONS.height)
              ),
              cond(
                and(
                  eq(this.xstate, State.END),
                  lessOrEq(this.velocityY, 0)
                ),
                block([
                  runSpring(translateX, 0),
                  runSpring(translateY, 0),
                  runSpring(width, SCREEN_DIMENSIONS.width),
                  runSpring(height, SCREEN_DIMENSIONS.height)
                ])
              ),
              cond(
                and(
                  eq(this.xstate, State.END),
                  greaterThan(this.velocityY, 0)
                ),
                block([
                  runSpring(translateX, position.x),
                  runSpring(translateY, position.y),
                  runSpring(width, position.width),
                  runSpring(height, position.height),
                  cond(eq(this.height, position.height), call([], onClose))
                ])
              ),
              cond(
                eq(this.xstate, State.ACTIVE),
                set(
                  height,
                  interpolate(height, {
                    inputRange: [0, height],
                    outputRange: [
                      SCREEN_DIMENSIONS.height,
                      position.height
                    ]
                  })
                )
              ),
              cond(
                eq(this.xstate, State.ACTIVE),
                set(
                  width,
                  interpolate(width, {
                    inputRange: [0, width],
                    outputRange: [SCREEN_DIMENSIONS.width, position.width]
                  })
                )
              )
            ])
          }
        </Animated.Code>
        <PanGestureHandler
          activeOffsetY={50}
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onGestureEvent}>
          <Animated.View {...{style}}>
            {this.state.isVideoLoaded ? null : (
              <ActivityIndicator style={styles.indicator} />
            )}
            <Video
              source={story.video}
              muted
              repeat
              resizeMode={'cover'}
              style={styles.modal}
              onReadyForDisplay={this.videoLoaded}
            />
            {this.state.isVideoLoaded ? null : (
              <Image style={styles.modal} source={story.image} />
            )}
          </Animated.View>
        </PanGestureHandler>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: SCREEN_DIMENSIONS.height,
    width: SCREEN_DIMENSIONS.width
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null
  },
  indicator: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Modal
