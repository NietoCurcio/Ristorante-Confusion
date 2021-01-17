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
    .then(
      (response) => {
        // here is when we get a response from the server
        console.log('First argument promise (we get a response)')
        if (response.ok) return response
        else {
          console.log('reponse is not ok ' + response.ok + response.status)
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          )
          error.response = response
          throw error
        }
      },
      (error) => {
        // when we do not hear anything from the server, test with the server not runing
        console.log('Second argument promise')
        let errMsg = new Error(error.message)
        throw errMsg
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => {
      console.log('Catch rejected promise')
      console.log(error)
      dispatch(dishesFailed(error.message))
    })
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
    .then(
      (response) => {
        // here is when we get a response from the server
        console.log('First argument promise (we get a response)')
        if (response.ok) return response
        else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          )
          error.response = response
          throw error
        }
      },
      (error) => {
        // when we do not hear anything from the server, test with the server not runing
        console.log('Second argument promise')
        let errMsg = new Error(error.message)
        throw errMsg
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => {
      console.log('Catch rejected promise')
      dispatch(commentsFailed(error.message))
    })
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
    .then(
      (response) => {
        // here is when we get a response from the server
        console.log('First argument promise (we get a response)')
        if (response.ok) return response
        else {
          let error = new Error(
            'Error ' + response.status + ': ' + response.statusText
          )
          error.response = response
          throw error
        }
      },
      (error) => {
        // when we do not hear anything from the server, test with the server not runing
        console.log('Second argument promise')
        let errMsg = new Error(error.message)
        throw errMsg
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => {
      console.log('Catch rejected promise')
      dispatch(promosFailed(error.message))
    })
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
