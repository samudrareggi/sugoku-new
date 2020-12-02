import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { fetchBoards, solveBoards, validateBoards } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import Board from '../components/Board'
import Timer from '../components/Timer'

export default function Game({ route, navigation }) {
  const defaultBoards = useSelector(state => state.defaultBoards)
  const boards = useSelector(state => state.boards)
  const loadingBoards = useSelector(state => state.loadingBoards)
  const loadingSolve = useSelector(state => state.loadingSolve)
  const grade = useSelector(state => state.grade)
  const status = useSelector(state => state.status)
  const [cheat, setCheat] = useState(false)
  const [time, setTime] = useState({ s:0, m:0, h:0 })
  const [interv, setInterv] = useState()
  const dispatch = useDispatch()
  const { name } = route.params

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
  const encodeParams = (params) =>
    Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&')

  useEffect(() => {
    dispatch(fetchBoards(grade))
    timerStart()
    return () => clearInterval(interv)
  }, [])

  useEffect(() => {
    if (status === 'solved') {
      navigation.replace('Finish', {
        name,
        status,
        time
      })

      dispatch({
        type: 'SET_PLAYER',
        payload: {
          name,
          time
        }
      })
    }
    return () => clearInterval(interv)
  }, [status])

  const resetHandler = () => {
    clearInterval(interv)
    setTime({ s:0, m:0, h:0 })
    timerStart()
    dispatch(fetchBoards(grade))
  }

  const solveHandler = () => {
    clearInterval(interv)
    setTime({ s:0, m:0, h:0 })
    timerStart()
    setCheat(true)
    dispatch(solveBoards(encodeParams, defaultBoards))
  }

  const validateHandler = () => {
    let inputBoard = cheat ? defaultBoards : boards

    dispatch(validateBoards(encodeParams, inputBoard))
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

  const timerStart = () => {
    let updatedS = time.s, updatedM = time.m, updatedH = time.h
    setInterv(setInterval(() => {
      if(updatedM === 59){
        updatedH++;
        updatedM = 0;
      }
      if(updatedS === 59){
        updatedM++;
        updatedS = 0;
      }
      updatedS++;
      setTime({ s:updatedS, m:updatedM, h:updatedH })
    }, 1000))
  }
  console.log(time.s)

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
    <View style={{ alignItems: "center", height: "100%"}}>
      <Text style={{ fontSize: 20, marginVertical: 50 }}>{name ? name : 'Player'}</Text>
      <Timer time={time}/>
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
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 360,
    width: 360,
    margin: 5,
    alignItems: "center",
    justifyContent: "center"
  }
})
