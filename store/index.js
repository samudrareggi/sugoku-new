import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
const initialState = {
  boards: [],
  defaultBoards: [],
  grade: 'easy',
  status: '',
  loadingBoards: true,
  loadingSolve: false,
  loadingValidate: true,
  players: []
}

export function fetchBoards(grade) {
  return (dispatch) => {
    dispatch({
      type: 'SET_BOARDS_LOADING',
      payload: true
    })
    dispatch({
      type: 'VALIDATE_BOARDS',
      payload: ''
    })
    fetch('https://sugoku.herokuapp.com/board?difficulty=' + grade)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'FETCH_BOARDS',
          payload: data.board
        })
        return data
      })
      .then((data => {
        dispatch({
          type: 'SET_BOARDS',
          payload: data.board
        })
      }))
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        dispatch({
          type: 'SET_BOARDS_LOADING',
          payload: false
        })
      })
  }
}

export function solveBoards(encodeParams, boards) {
  return (dispatch) => {
    dispatch({
      type: 'SET_SOLVE_LOADING',
      payload: true
    })
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({board: boards}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: 'SOLVE_BOARDS',
          payload: response.solution
        })
      })
      .catch(console.warn)
      .finally(() => {
        dispatch({
          type: 'SET_SOLVE_LOADING',
          payload: false
        })
      })
  }
}

export function validateBoards(encodeParams, boards) {
  return (dispatch) => {
    dispatch({
      type: 'SET_VALIDATE_LOADING',
      payload: true
    })
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({board: boards}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: 'VALIDATE_BOARDS',
          payload: response.status
        })
      })
      .catch(console.warn)
      .finally(() => {
        dispatch({
          type: 'SET_VALIDATE_LOADING',
          payload: false
        })
      })
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BOARDS_LOADING':
      return {...state, loadingBoards: action.payload}
    case 'FETCH_BOARDS':
      return {...state, boards: action.payload}
    case 'SET_BOARDS':
      return {...state, defaultBoards: action.payload}
    case 'SET_GRADE':
      return {...state, grade: action.grade}
    case 'UPDATE_BOARDS':
      return {...state, boards: action.payload}
    case 'SET_SOLVE_LOADING':
      return {...state, loadingSolve: action.payload}
    case 'SOLVE_BOARDS':
      return {...state, defaultBoards: action.payload}
    case 'SET_VALIDATE_LOADING':
      return {...state, loadingValidate: action.payload}
    case 'VALIDATE_BOARDS':
      return {...state, status: action.payload}
    case 'SET_PLAYER':
      const newData = state.players.concat(action.payload)
      return {...state, players: newData}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store