import React, { useEffect, useState } from 'react'
import { Button, Dimensions, FlatList, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Board from '../components/Board'
import { fetchBoards, solveBoards, validateBoards } from '../store'
import { useDispatch, useSelector } from 'react-redux'

export default function Game({route, navigation}) {
  const boards = useSelector(state => state.boards)
  const loadingBoards = useSelector(state => state.loadingBoards)
  const loadingSolve = useSelector(state => state.loadingSolve)
  const status = useSelector(state => state.status)
  const dispatch = useDispatch()
  const { name } = route.params
  const numCol = 3

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
  const encodeParams = (params) =>
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  const resetHandler = () => {
    dispatch(fetchBoards())
  }

  const solveHandler = () => {
    dispatch(solveBoards(encodeParams, boards))
  }

  const validateHandler = () => {
    dispatch(validateBoards(encodeParams, boards))
    console.log(status)
  }

  const changeVal = (text, indexChild, indexParent) => {
    const newData = boards.board.map((element, index) => {
      if (index === indexParent) {
        return element.map((el, i) => {
          if (i === indexChild) {
            return el = +text
          } else {
            return el
          }
        })
      } else {
        return element
      }
    })
    dispatch({
      type: 'UPDATE_BOARDS',
      payload: {board: newData}
    })
  }

  if (loadingBoards || loadingSolve) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Please wait...</Text>
      </View>
    )
  }

  console.log(JSON.stringify(boards))
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{ fontSize: 24, marginVertical: 20 }}>{ name }</Text>
      </View>
      <FlatList
        data={boards.board}
        renderItem={({ item, index }) => {
          return <Board boards={[item, index]} changeVal={changeVal}/>
        }}
        numColumns={numCol}
        keyExtractor={(item, index) => `cont${index}`}
      />
      <View style={styles.button}>
        <TouchableOpacity style={styles.button1}>
          <Button onPress={resetHandler} title="Reset"/>
          <Button onPress={solveHandler} title="Solve"/>
          <Button onPress={validateHandler} title="Validate"/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  button1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 40
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    marginBottom: 40,
    marginHorizontal: 10
  },
  innerContainer: {
    flex: 1,
    margin: 5
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
