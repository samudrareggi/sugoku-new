import React from 'react'
import Home from './screens/Home'
import Game from './screens/Game'
import Finish from './screens/Finish'
import store from './store'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none" >
          <Stack.Screen name="Home" component={ Home }/>
          <Stack.Screen name="Game" component={ Game }/>
          <Stack.Screen name="Finish" component={ Finish }/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
