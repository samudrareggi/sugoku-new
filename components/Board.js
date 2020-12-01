
import React, { useState } from 'react';
import { Button, Dimensions, FlatList, TextInput, StyleSheet, Text, View } from 'react-native';

export default function Board({boards, changeVal}) {
  const numCol = 3
  const renderInnerItem = ({item, index}) => {
    return(
      <View style={styles.innerItem}>
        <TextInput
          editable={true}
          keyboardType="number-pad"
          style={{ height: 30, borderColor: 'gray'}}
          defaultValue={item.toString()}
          onChangeText={(text) => changeVal(text, index, boards[1])}
        />
      </View>
    )
  }
    return(
      <View style={styles.innerContainer}>
        <FlatList
          data={boards[0]}
          renderItem={renderInnerItem}
          numColumns={numCol}
          keyExtractor={(item, index) => `D${index}`}
          listKey={(item, index) => 'D' + index.toString()}
        />
      </View>
    )
}

const styles = StyleSheet.create({

  innerContainer: {
    flex: 1,
    margin: 5
  },
  innerItem: {
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: 50
  }
});