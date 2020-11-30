import { StatusBar } from 'expo-status-bar';
import React from 'react';
import useFetcher from './helpers/useFetcher'
import { Button, Dimensions, FlatList, ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [boards, loading, setBoards] = useFetcher('https://sugoku.herokuapp.com/board?difficulty=easy')

  const numCol = 3
  const renderItem = ({item, index}) => {
    return(
      <View style={styles.innerContainer}>
        <FlatList
          data={item}
          renderItem={renderInnerItem}
          numColumns={numCol}
          keyExtractor={(item, index) => `item${index}`}
        />
      </View>
    )
  }

  const renderInnerItem = ({item, index}) => {
    return(
      <View style={styles.innerItem}>
        <Text>{item}</Text>
      </View>
    )
  }
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
  const encodeParams = (params) =>
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

  const solveHandler = () => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(boards),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        setBoards({board: response.solution})
      })
      .catch(console.warn)
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Please wait...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={boards.board}
        renderItem={renderItem}
        numColumns={numCol}
        keyExtractor={(item, index) => `cont${index}`}
      />
      <View style={styles.button}>
        <Button onPress={solveHandler} title="Solve"/>
        <Button title="Validate"/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    width: 150,
    margin: 10
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 10
  },
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
  },
  item: {
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 3
  }
});
