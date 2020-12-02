import React, { useEffect, useState } from 'react'
import { Button, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image, BackHandler } from 'react-native'
import Board from '../components/Board'
import { fetchBoards, solveBoards, validateBoards } from '../store'
import { useDispatch, useSelector } from 'react-redux'

export default function Game({ route, navigation }) {
  const defaultBoards = useSelector(state => state.defaultBoards)
  const boards = useSelector(state => state.boards)
  const loadingBoards = useSelector(state => state.loadingBoards)
  const loadingSolve = useSelector(state => state.loadingSolve)
  const loadingValidate = useSelector(state => state.loadingValidate)
  const grade = useSelector(state => state.grade)
  const status = useSelector(state => state.status)
  const [cheat, setCheat] = useState(false)
  const dispatch = useDispatch()
  const { name } = route.params

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
  const encodeParams = (params) =>
    Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&')

  useEffect(() => {
    dispatch(fetchBoards(grade))
    BackHandler.addEventListener('hardwareBackPress', () => true)
  }, [])

  const resetHandler = () => {
    dispatch(fetchBoards(grade))
  }
  
  const solveHandler = () => {
    setCheat(true)
    dispatch(solveBoards(encodeParams, defaultBoards))
  }

  const validateHandler = () => {
    cheat ? dispatch(validateBoards(encodeParams, defaultBoards)) : dispatch(validateBoards(encodeParams, boards))
    if (!loadingValidate) {
      navigation.replace('Finish', {
        name,
        status
      })
    }
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
        payload: { board: newData }
    })
  }

  if (loadingBoards || loadingSolve) {
    return (
      <View style={styles.loading}>
      <Image
        source={require('../assets/Cube-loading.gif')}
        style={{ width: 150, height: 150 }}
      />
      <Image
        source={require('../assets/loading.gif')}
        style={{ width: 150, height: 150 }}
      />
      </View>
    )
  }

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginTop: 80, marginBottom: 50 }}>{name ? name : 'Player'}</Text>
      <View style={styles.innerContainer}>
        {
          defaultBoards.board.map((el, index) => (
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
