import React, { useState } from 'react'
import { Button, Text, Image, TouchableOpacity, StyleSheet, TextInput, View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { useDispatch } from 'react-redux'
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

  console.log(checked)

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
      <View style={{flexDirection: 'row', alignItems: "center"}}>
        <RadioButton
          value="easy"
          color="#007BFF"
          status={ checked === 'easy' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('easy')}
        />
        <Text>Easy</Text>
        <RadioButton
          value="medium"
          color="#007BFF"
          status={ checked === 'medium' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('medium')}
        />
        <Text>Medium</Text>
        <RadioButton
          value="hard"
          color="#007BFF"
          status={ checked === 'hard' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('hard')}
        />
        <Text>Hard</Text>
        <RadioButton
          value="random"
          color="#007BFF"
          status={ checked === 'random' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('random')}
        />
        <Text>Random</Text>
      </View>
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
