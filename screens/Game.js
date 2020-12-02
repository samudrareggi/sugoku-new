import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
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
  const [time, setTime] = useState({ h:0, m:0, s:0 })
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
    switch (status) {
      case 'solved':
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
        break;
      case 'unsolved':
      case 'broken':
        clearInterval(interv)
        Alert.alert(
          'Validate Board',
            `Board : ${status}`,
            [
              { text: 'OK', onPress: () => {
                dispatch({
                  type: 'VALIDATE_BOARDS',
                  payload: ''
                })
                timerStart()} }
            ],
            { cancelable: false }
        )
        break
      default:
        break;
    }
    return () => clearInterval(interv)
  }, [status])

  const resetHandler = () => {
    clearInterval(interv)
    setTime({ h:0, m:0, s:0 })
    dispatch(fetchBoards(grade))
    timerStart()
  }

  const solveHandler = () => {
    clearInterval(interv)
    setTime({ h:0, m:0, s:0 })
    setCheat(true)
    dispatch(solveBoards(encodeParams, defaultBoards))
  }

  const validateHandler = () => {
    let inputBoard = cheat ? defaultBoards : boards

    dispatch(validateBoards(encodeParams, inputBoard))
  }

  const changeVal = (text, indexChild, indexParent) => {
    console.log(JSON.stringify(boards))
    const newData = boards.map((element, index) => {
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
        payload: newData
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
      setTime({ h:updatedH, m:updatedM, s:updatedS })
    }, 1000))
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
    <View style={{ alignItems: "center", height: "100%"}}>
      <Text style={{ fontSize: 20, marginVertical: 50 }}>{name ? name : 'Player'}</Text>
      <Timer time={time} styles={styles}/>
      <View style={styles.innerContainer}>
        {
          defaultBoards.map((el, index) => (
            <Board key={index} boards={[el, index]} changeVal={changeVal} />
          ))
        }
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity style={styles.button}>
            <Button color="#F28061" onPress={resetHandler} title="Reset" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Button color="#F7B367" onPress={solveHandler} title="Solve" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Button color="#AABE7F" onPress={validateHandler} title="Validate" />
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
  },
  text: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  card1: {
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    width: 55,
    height: 55,
    backgroundColor: "#F28061"
  },
  card2: {
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    width: 55,
    height: 55,
    backgroundColor: "#F7B367"
  },
  card3: {
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    width: 55,
    height: 55,
    backgroundColor: "#AABE7F"
  }
})
