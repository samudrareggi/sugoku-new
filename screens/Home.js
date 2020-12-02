import React, { useState } from 'react'
import { Button, Text, Image, TouchableOpacity, StyleSheet, TextInput, View } from 'react-native'
import { useDispatch } from 'react-redux'
import Radio from '../components/Radio'

export default function Home({ navigation}) {
  const [value, setValue] = useState('Player')
  const [checked, setChecked] = useState('easy');
  const dispatch = useDispatch()

  const changeVal = (e) => {
    setValue(e)
  }
  const changeScreen = () => {
    dispatch({
      type: 'SET_GRADE',
      grade: checked
    })
    navigation.navigate('Game', {
      name: value
    })
  }

  return(
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 350, height: 150 }}
      />
      <Image
        source={require('../assets/sudoku.png')}
        style={{ width: 150, height: 150, marginTop: 50}}
      />
      <Text style={{marginTop: 20, fontSize: 24}}>Player Name</Text>
      <TextInput
        editable={true}
        style={styles.input}
        defaultValue={value}
        onChangeText={(text) => changeVal(text)}
      />
      <Radio checked={ checked } setChecked={ setChecked }/>
      <TouchableOpacity style={{ width: 100, marginTop: 10 }}>
        <Button color="#DC5E69" onPress={changeScreen} title="Start"/>
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
