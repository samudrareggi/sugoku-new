import React, { useEffect, useState } from 'react'
import { Button, Dimensions, BackHandler, ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Finish({route, navigation}) {
  const {name, status} = route.params

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
  }, [BackHandler])

  const changeScreen = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Text >Congrats!! {name}</Text>
      <Text >Congrats!! {status}</Text>
      <TouchableOpacity style={styles.button}>
        <Button onPress={changeScreen} title="Play again"/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    alignItems: "center",
  },
  button: {
    width: 100
  },
});
