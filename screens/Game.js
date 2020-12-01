import React, { useEffect, useState } from 'react'
import { Button, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Board from '../components/Board'
import { fetchBoards, solveBoards, validateBoards } from '../store'
import { useDispatch, useSelector } from 'react-redux'

export default function Game({ route, navigation }) {
  const [value, setValue] = useState(null)
  const defaultBoards = useSelector(state => state.defaultBoards)
  const boards = useSelector(state => state.boards)
  const loadingBoards = useSelector(state => state.loadingBoards)
  const loadingSolve = useSelector(state => state.loadingSolve)
  const status = useSelector(state => state.status)
  const dispatch = useDispatch()
  const { name } = route.params

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
  const encodeParams = (params) =>
    Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&')

  useEffect(() => {
    console.log('disiniii')
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
    
    navigation.navigate('Finish', {
      name
    })
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
    setValue({
      board: newData
    })
    dispatch({
        type: 'UPDATE_BOARDS',
        payload: { board: newData }
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
  console.log(JSON.stringify(defaultBoards))
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginVertical: 20 }}>{name ? name : 'Player'}</Text>
      <View style={styles.innerContainer}>
        {
          boards.board.map((el, index) => (
            <Board key={index} boards={[el, index]} changeVal={changeVal} />
          ))
        }
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity style={styles.button}>
          <Button onPress={resetHandler} title="Reset" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button onPress={solveHandler} title="Solve" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button onPress={validateHandler} title="Validate" />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    margin: 100
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  innerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 360,
    width: 360,
    margin: 5,
    alignItems: "center",
    justifyContent: "center"
  }
})
