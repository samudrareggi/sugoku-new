
import React, { useState } from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';

export default function Board({ boards, changeVal }) {
  return (
    boards[0].map((el, index) => {
      if (el !== 0) {
        return (
          <Text style={styles.innerContainer} key={`inner${index}`}>
            {el.toString()}
          </Text>
        )
      }
      return (
        <TextInput
          key={`inner${index}`}
          maxLength={1}
          keyboardType="number-pad"
          style={styles.innerContainer1}
          defaultValue=''
          onChangeText={(text) => changeVal(text, index, boards[1])}
        />
      )
    })
  )
}

const styles = StyleSheet.create({

  innerContainer: {
    fontSize: 24,
    width: 40,
    height: 40,
    borderWidth: 1,
    backgroundColor: "#bce6eb"
  },
  innerContainer1: {
    fontSize: 24,
    width: 40,
    height: 40,
    borderWidth: 1,
    backgroundColor: "white"
  }
});