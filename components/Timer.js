import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper'

export default function Timer(props) {
  const { time, styles } = props

  const timeH = () => {
    if (time.h === 0) {
      return styles ? <Text style={ styles ? styles.text : {}}>00</Text> : <Text></Text>
    } else {
      return (time.h > 9) ? <Text style={ styles ? styles.text : {}}>{time.h}</Text> : <Text style={ styles ? styles.text : {}}>0{time.h}</Text>
    }
  }
  
  const card = () => {
    return (
      <View style={{flexDirection: "row", justifyContent: "space-around", width: 200}}>
        <Card style={ styles ? styles.card1 : {}}>
          <Card.Content>
            {timeH()}
          </Card.Content>
        </Card>
        <Card style={ styles ? styles.card2 : {}}>
          <Card.Content>
            {(time.m > 9) ? <Text style={ styles ? styles.text : {}}>{time.m}</Text> : <Text style={ styles ? styles.text : {}}>0{time.m}</Text>}
          </Card.Content>
        </Card>
        <Card style={ styles ? styles.card3 : {}}>
          <Card.Content>
            {(time.s > 9) ? <Text style={ styles ? styles.text : {}}>{time.s}</Text> : <Text style={ styles ? styles.text : {}}>0{time.s}</Text>}
          </Card.Content>
        </Card>
      </View>
    )
  }

  const normal = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        {timeH()}
        {(time.m > 9) ? <Text style={{ fontSize: 18 }}>{time.m} : </Text> : <Text style={{ fontSize: 18 }}>0{time.m} : </Text>}
        {(time.s > 9) ? <Text style={{ fontSize: 18 }}>{time.s}</Text> : <Text style={{ fontSize: 18 }}>0{time.s}</Text>}
      </View>
    )
  }
  return (
    styles ? card() : normal()
  )
}