import React, { useEffect, useState } from 'react'
import { Button, Text, Image, TouchableOpacity, StyleSheet, TextInput, View } from 'react-native'
import { fetchBoards } from '../store'
import { useDispatch } from 'react-redux'

export default function Home({ navigation}) {
  const [value, setValue] = useState('Player')
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  const changeVal = (e) => {
    setValue(e)
  }
  const changeScreen = () => {
    navigation.navigate('Game', {
      name: value
    })
  }

  return(
    <View style={styles.container}>
      <Image
        source={require('../assets/sudoku.png')}
        style={{ width: 150, height: 150 }}
      />
      <Text style={{marginTop: 20, fontSize: 24}}>Player Name</Text>
      <TextInput
        editable={true}
        style={styles.input}
        defaultValue={value}
        onChangeText={(text) => changeVal(text)}
      />
      <TouchableOpacity style={{ width: 100, marginTop: 10 }}>
        <Button onPress={changeScreen} title="Start"/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    height: 30,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 18,
    marginVertical: 15,
    paddingHorizontal: 20
  }
});
