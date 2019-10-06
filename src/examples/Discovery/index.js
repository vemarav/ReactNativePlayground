import React from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import {stories} from '../../__mocks__/stories'
import Modal from './Modal'
import Thumbnail from './Thumbnail'

class Discovery extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state

    if (params && params.hideHeader) {
      return {header: null}
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedStory: null,
      position: {}
    }

    this.thumbnails = {}
    stories.map(story => (this.thumbnails[story.id] = React.createRef()))
  }

  setStory = async selectedStory => {
    let position = {}
    if (selectedStory) {
      const {id} = selectedStory
      position = await this.thumbnails[id].current.measure()
    }

    this.setState({selectedStory, position}, () => {
      this.props.navigation.setParams({hideHeader: true})
    })
  }

  renderItem = ({item: story}) => {
    const {selectedStory} = this.state
    return (
      <Thumbnail
        ref={this.thumbnails[story.id]}
        onPress={() => this.setStory(story)}
        selected={selectedStory && selectedStory.id === story.id}
        {...story}
      />
    )
  }

  onModalClose = () => {
    this.setState(
      {
        selectedStory: null,
        position: {}
      },
      () => {
        this.props.navigation.setParams({hideHeader: false})
      }
    )
  }

  render() {
    const {selectedStory, position} = this.state

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          extraData={this.state.selectedStory}
          keyExtractor={item => item.id}
          data={stories}
          renderItem={this.renderItem}
          numColumns={2}
        />
        {selectedStory ? (
          <Modal
            onClose={this.onModalClose}
            story={selectedStory}
            {...{position}}
          />
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    paddingTop: 8,
    paddingHorizontal: 4,
    paddingBottom: 32
  }
})

export default Discovery
