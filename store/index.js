import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
const initialState = {
  boards: [],
  status: '',
  loadingBoards: false,
  loadingSolve: false,
  loadingValidate: false,
}

export function fetchBoards() {
  return (dispatch) => {
    dispatch({
      type: 'SET_BOARDS_LOADING',
      payload: true
    })
    fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
      .then(res => res.json())
      .then(data => {
          dispatch({
            type: 'FETCH_BOARDS',
            payload: data
          })
      })
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
      body: encodeParams(boards),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: 'SOLVE_BOARDS',
          payload: {board: response.solution}
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
      body: encodeParams(boards),
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
    case 'UPDATE_BOARDS':
      return {...state, boards: action.payload}
    case 'SET_SOLVE_LOADING':
      return {...state, loadingSolve: action.payload}
    case 'SOLVE_BOARDS':
      return {...state, boards: action.payload}
    case 'SET_VALIDATE_LOADING':
      return {...state, loadingValidate: action.payload}
    case 'VALIDATE_BOARDS':
      return {...state, status: action.payload}
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store