import * as ActionTypes from './actionTypes'

export const Dishes = (
  state = { isLoading: true, errorMessage: null, dishes: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        dishes: action.payload,
      }
    case ActionTypes.DISHES_LOADING:
      // return { ...state, isLoading: true, errorMessage: null, dishes: [] }
      return { isLoading: true, errorMessage: null, dishes: [] }
    // since we are not getting any information from the previous state, we don't need to make a copy
    // but use the spread operator ...state, is a good practice, I'll do it in the ADD.DISHES
    case ActionTypes.DISHES_FAILED:
      return { isLoading: false, errorMessage: action.payload, dishes: [] }
    default:
      return state
    // remember, accodding FCC is always important return the defaut state, since when an action is
    // dispatched, others reducers even not related to the action will run
  }
}
