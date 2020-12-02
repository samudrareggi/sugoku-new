import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

export default function Timer(props) {
  const { time } = props

  const timeH = () => {
    if (time.h === 0) {
      return <Text style={{ fontSize: 18 }}></Text>
    } else {
      return (time.h > 9) ? <Text style={{ fontSize: 18 }}>{time.h} : </Text> : <Text style={{ fontSize: 18 }}>0{time.h} : </Text>
    }
  }
  
  return (
  <View style={{ flexDirection: "row" }}>
    {timeH()}
    {(time.m > 9) ? <Text style={{ fontSize: 18 }}>{time.m} : </Text> : <Text style={{ fontSize: 18 }}>0{time.m} : </Text>}
    {(time.s > 9) ? <Text style={{ fontSize: 18 }}>{time.s}</Text> : <Text style={{ fontSize: 18 }}>0{time.s}</Text>}
  </View>
  )
}