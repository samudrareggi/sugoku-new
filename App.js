import React from 'react'
import Home from './pages/Home'
import store from './store'
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  )
}
