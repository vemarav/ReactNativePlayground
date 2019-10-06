import React from 'react'
import {
  TouchableWithoutFeedback,
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'
const SCREEN_DIMENSIONS = Dimensions.get('window')

class Thumbnail extends React.Component {
  thumbnail = React.createRef()

  measure = () =>
    new Promise(resolve =>
      this.thumbnail.current.measureInWindow((x, y, width, height) =>
        resolve({x, y, width, height})
      )
    )

  render() {
    const {image, onPress, selected} = this.props

    if (selected) {
      return (
        <View style={styles.itemWrapper}>
          <View style={styles.itemImage} />
        </View>
      )
    }

    return (
      <TouchableWithoutFeedback {...{onPress}}>
        <View style={styles.itemWrapper}>
          <Image
            ref={this.thumbnail}
            source={image}
            style={styles.itemImage}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    padding: 8
  },
  itemImage: {
    borderRadius: 10,
    width: SCREEN_DIMENSIONS.width / 2 - 20,
    height: 280
  }
})

export default Thumbnail
