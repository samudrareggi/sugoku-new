import React from 'react'
import { useSelector } from "react-redux"
import { Button, FlatList, BackHandler, StyleSheet, Text, View } from 'react-native'

export default function Leaderboard(params) {
  const players = useSelector(state => state.players)

  const data = players.map(el => {
    let second = el.time.s
    let result = {}
    if (el.time.h !== 0) {
      second += (el.time.h * 3600)
    }
    if (el.time.m !== 0) {
      second += (el.time.m * 60)
    }

    return [el.name, second]
  })

  var sortedArray = data.sort((a, b) => {
    return a[1] - b[1];
  })

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row"}}>
      <Text>{item[0]} </Text>
      <Text>{item[1]}</Text>
    </View>
  )

  return (
    <FlatList
      data={sortedArray}
      renderItem={renderItem}
      keyExtractor={(item, index) => 'player' + index}
    />
  )
}