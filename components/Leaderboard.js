import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { FlatList, Text, View } from 'react-native'
import Timer from './Timer'
export default function Leaderboard() {
  const players = useSelector(state => state.players)
  const [value, setValue] = useState()

  useEffect(() => {
    const data = players.map(el => {
      let second = el.time.s
      if (el.time.s === 0 && el.time.m === 0 && el.time.h === 0) {
        return [el.name, 99999999, el.time]
      }
      if (el.time.h !== 0) {
        second += (el.time.h * 3600)
      }
      if (el.time.m !== 0) {
        second += (el.time.m * 60)
      }
      return [el.name, second, el.time]
    })

    data.sort((a, b) => {
      return a[1] - b[1];
    })

    setValue(data)
  }, [])
console.log(value)
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", justifyContent:"space-between"}}>
      <Text style={{ fontSize: 18 }}>{item[0]} </Text>
      <Timer time={item[2]}/>
    </View>
  )

  return (
    <View style={{ width: 250}}>
      <FlatList
        data={value}
        renderItem={renderItem}
        keyExtractor={(item, index) => 'player' + index}
        />
    </View>
  )
}