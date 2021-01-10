import * as ActionTypes from './actionTypes'
import { DISHES } from '../shared/dishes'

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    comment,
  },
})

export const fetchDishes = () => (dispatch, getState) => {
  console.log('My thunk')
  console.log(getState())
  dispatch(dishesLoading(true))

  setTimeout(() => {
    dispatch(addDishes(DISHES))
  }, 2000)
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
})

export const dishesFailed = (error) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: error,
})

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
})
