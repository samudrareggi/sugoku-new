import React, { useEffect } from 'react'
import { Button, BackHandler, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { Card } from 'react-native-paper'
import Timer from '../components/Timer'
import Leaderboard from '../components/Leaderboard'

export default function Finish({route, navigation}) {
  const {name, status, time} = route.params
  const dispatch = useDispatch()

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)
  }, [BackHandler])

  const changeScreen = () => {
    dispatch({
      type: 'VALIDATE_BOARDS',
      payload: ''
    })

    navigation.navigate('Home')
  }

  return (
    <View style={{ height: "100%"}}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Text style={{ fontSize: 32, fontWeight: "900" }}>Game Over</Text>
          <Text style={{ fontSize: 24 }}>{name}</Text>
          <Text>Time</Text>
          <Timer time={time}/>
          <Text style={{ fontSize: 18}}>Leaderboard</Text>
          <Leaderboard/>
          <TouchableOpacity style={styles.button}>
            <Button onPress={changeScreen} title="Play again"/>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    width: 100,
    marginTop: 100
  },
  card: {
    flex: 1,
    alignItems: "center",
    marginVertical: "20%",
    marginHorizontal: "10%",
    borderRadius: 20,
    elevation: 5,
  }
})
