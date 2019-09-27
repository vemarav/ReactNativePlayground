import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native'
import Svg, {Path} from 'react-native-svg'
import * as shape from 'd3-shape'
import {random as randomColor} from '../../utils/ColorUtil'

let {width} = Dimensions.get('window')

class Slice extends React.Component {
  constructor() {
    super()
    this.arcGenerator = shape
      .arc()
      .outerRadius(100)
      .padAngle(0)
      .innerRadius(0)
  }

  createPieArc = (index, endAngle, data) => {
    const arcs = shape
      .pie()
      .startAngle(0)
      .endAngle(endAngle)(data)
    let arcData = arcs[index]
    return this.arcGenerator(arcData)
  }

  render() {
    const {index, endAngle, color, data} = this.props
    return (
      <Path
        {...{index}}
        d={this.createPieArc(index, endAngle, data)}
        fill={color}
      />
    )
  }
}

const AnimatedSlice = Animated.createAnimatedComponent(Slice)

class Pie extends React.Component {
  constructor() {
    super()
    this.animatedAngle = new Animated.Value(0.01)
    this.state = {isExpanded: false}
    this.data = [20, 30, 50]
    this.colors = []
    this.data.map(_ => this.colors.push(randomColor()))
  }

  animate = () => {
    if (this.state.isExpanded) {
      Animated.timing(this.animatedAngle, {
        toValue: 0.01,
        duration: 625,
        easing: Easing.inOut(Easing.sin)
      }).start()
    } else {
      Animated.timing(this.animatedAngle, {
        toValue: 2,
        duration: 625,
        easing: Easing.inOut(Easing.sin)
      }).start()
    }
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render() {
    const endAngle = Animated.multiply(this.animatedAngle, Math.PI)
    const svg = {height: width * 0.6, width: width * 0.6}
    return (
      <View style={styles.container}>
        <View style={styles.pie}>
          <Svg
            width={svg.height}
            height={svg.width}
            viewBox={`${-svg.height / 2} ${-svg.width / 2}
              ${svg.height} ${svg.width}`}>
            {this.data.map((_, index) => {
              return (
                <AnimatedSlice
                  index={index}
                  color={this.colors[index]}
                  endAngle={endAngle}
                  data={this.data}
                />
              )
            })}
          </Svg>
          <View>
            {this.data.map((item, index) => (
              <View style={styles.legend}>
                <View
                  style={{
                    ...styles.colorBox,
                    backgroundColor: this.colors[index]
                  }}
                />
                <Text style={{color: this.colors[index]}}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={this.animate}>
          <View style={{backgroundColor: randomColor(), ...styles.button}}>
            <Text style={styles.buttonText}>
              {this.state.isExpanded ? 'Shrink' : 'Expand'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pie: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  legend: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center'
  },
  colorBox: {
    width: 10,
    height: 10,
    marginRight: 8
  },
  button: {
    padding: 16,
    width: width,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default Pie
