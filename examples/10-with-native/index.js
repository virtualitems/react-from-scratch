import { createElement } from 'react'

import { AppRegistry, Text, View } from 'react-native'

function App() {
  return createElement(
    View,
    {
      style: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    createElement(Text, null, 'React Native is working!')
  )
}

AppRegistry.registerComponent('ReactFromScratch', () => App)
