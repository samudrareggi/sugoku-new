
import React from 'react';
import { Button, Dimensions, FlatList, TextInput, StyleSheet, Text, View } from 'react-native';

export default function Board({boards}) {
  const numCol = 3
  const onChangeText = () => {}
  const renderInnerItem = ({item, index}) => {
    return(
      <View style={styles.innerItem}>
        <TextInput
          keyboardType="number-pad"
          style={{ height: 30, borderColor: 'gray'}}
          value={item.toString()}
        />
      </View>
    )
  }
    return(
      <View style={styles.innerContainer}>
        <FlatList
          data={boards}
          renderItem={renderInnerItem}
          numColumns={numCol}
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