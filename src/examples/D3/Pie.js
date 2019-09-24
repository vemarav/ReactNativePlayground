import React from 'react'
import {View, Text, Dimensions, StyleSheet, Animated} from 'react-native'
import Svg, {Circle} from 'react-native-svg'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import {SafeAreaView} from 'react-navigation'
let {width, height} = Dimensions.get('window')
height = height - 90

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const colors = [
  'violet',
  'indigo',
  'blue',
  'green',
  'yellow',
  'orange',
  'red'
]

class Pie extends React.Component {
  state = {
    toggle: false
  }
  radii = {
    animated: [
      new Animated.Value(10),
      new Animated.Value(20),
      new Animated.Value(30),
      new Animated.Value(40),
      new Animated.Value(50),
      new Animated.Value(60),
      new Animated.Value(70)
    ],
    initial: [10, 20, 30, 40, 50, 60, 70],
    final: [20, 40, 60, 80, 100, 120, 140]
  }

  animate = () => {
    if (!this.state.toggle) {
      this.radii.final.forEach((v, i) => {
        Animated.timing(this.radii.animated[i], {
          toValue: v,
          duration: 425
        }).start()
      })
    } else {
      this.radii.initial.forEach((v, i) => {
        Animated.timing(this.radii.animated[i], {
          toValue: v,
          duration: 425
        }).start()
      })
    }
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render() {
    const cx = width / 2
    const cy = height / 2 - 45

    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Svg
            width={width}
            height={height - 78}
            viewBox={`0 0 ${width} ${height}`}>
            {colors.map((fill, index) => (
              <AnimatedCircle
                {...{cx, cy, r: this.radii.animated[7 - index], fill}}
              />
            ))}
          </Svg>
          <View
            style={{
              flex: 1,
              backgroundColor: 'red',
              justifyContent: 'flex-end'
            }}>
            <TouchableWithoutFeedback onPress={this.animate}>
              <View
                style={{
                  backgroundColor: 'black',
                  height: 48,
                  width: width,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  {this.state.toggle ? 'Make it small' : 'Make it large'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Pie
