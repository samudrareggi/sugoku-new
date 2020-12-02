import React from 'react'
import { Text, View } from 'react-native'
import { RadioButton } from 'react-native-paper'

export default function Radio({ grade, checked, setChecked }) {
  return (
    <View style={{flexDirection: 'row', alignItems: "center"}}>
      <RadioButton
          value="easy"
          color="#DC5E69"
          status={ checked === 'easy' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('easy')}
        />
      <Text>Easy</Text>
      <RadioButton
        value="medium"
        color="#F28061"
        status={ checked === 'medium' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('medium')}
      />
      <Text>Medium</Text>
      <RadioButton
        value="hard"
        color="#F7B367"
        status={ checked === 'hard' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('hard')}
      />
      <Text>Hard</Text>
      <RadioButton
        value="random"
        color="#AABE7F"
        status={ checked === 'random' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('random')}
      />
      <Text>Random</Text>
    </View>
  )
}