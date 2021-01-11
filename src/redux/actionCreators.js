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

export const fetchDishes = () => async (dispatch) => {
  dispatch(dishesLoading(true))
  // setTimeout(() => {
  //   dispatch(addDishes(DISHES))
  // }, 2000)
  function delay() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(DISHES)
      }, 2000)
    })
  }
  const response = await delay()
  console.log('REPONSESE')
  console.log(response)
  dispatch(addDishes(response))
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
