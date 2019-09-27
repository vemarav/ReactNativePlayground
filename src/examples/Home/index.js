import React from 'react'
import {View, ScrollView, Text, TouchableOpacity} from 'react-native'
import PageNames from '../../navigation/page-names'
import {isAndroid} from '../../utils/common'

class Home extends React.Component {
  _renderItem = pageNameKey => {
    const PageName = PageNames[pageNameKey]
    if (PageName === PageNames.Home) return null
    return (
      <TouchableOpacity
        key={`screen-${pageNameKey}`}
        onPress={() => this.props.navigation.navigate(PageName)}>
        <View
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#eee'
          }}>
          <Text
            style={{
              color: '#676767',
              fontSize: 20
            }}>
            {PageName}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{flex: 1, marginTop: isAndroid ? 0 : 36}}>
        <View
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#a0a0a0'
          }}>
          <Text style={{fontSize: 24}}>Examples</Text>
        </View>
        <ScrollView contentContainerStyle={{flex: 1}}>
          {Object.keys(PageNames).map(this._renderItem)}
        </ScrollView>
      </View>
    )
  }
}

export default Home
