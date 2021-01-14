import * as ActionTypes from './actionTypes'
import { DISHES } from '../shared/dishes'
import { baseUrl } from '../shared/baseURL'

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
  // function delay() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(DISHES)
  //     }, 2000)
  //   })
  // }
  // const response = await delay()
  // dispatch(addDishes(response))
  fetch(baseUrl + 'dishes')
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
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

export const fetchComments = () => async (dispatch) => {
  fetch(baseUrl + 'comments')
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
}

export const commentsFailed = (error) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: error,
})

export const addComments = (comments) => {
  return {
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
  }
}

export const fetchPromos = () => async (dispatch) => {
  dispatch(promosLoading(true))
  fetch(baseUrl + 'promotions')
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
})

export const promosFailed = (error) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: error,
})

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
})
