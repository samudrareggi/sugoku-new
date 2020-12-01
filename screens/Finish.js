import React, { useEffect, useState } from 'react'
import { Button, Dimensions, FlatList, ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Board from '../components/Board'
import { fetchBoards, solveBoards, validateBoards } from '../store'
import { useDispatch, useSelector } from 'react-redux'

export default function Finish({route, navigation}) {
  const {name} = route.params

  const changeScreen = () => {
    navigation.navigate('Home')
  }
  
  return (
    <View >
      <Text >Congrats!! {name}</Text>
      <Button onPress={changeScreen} title="Play again"/>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    width: 150,
    margin: 10
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flexWrap: 'wrap',
    height: '80%',
    margin: 5
  },
  innerContainer: {
    width: '30%',
    height: '25%',
    margin: 5,
    borderWidth: 1
  },
  innerItem: {
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: 50
  },
  item: {
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 3
  }
});
