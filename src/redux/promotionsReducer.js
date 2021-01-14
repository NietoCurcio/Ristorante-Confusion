import * as ActionTypes from './actionTypes'

export const Promotions = (
  state = { isLoading: true, errorMessage: null, promotions: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        promotions: action.payload,
      }
    case ActionTypes.PROMOS_LOADING:
      return { isLoading: true, errorMessage: null, promotions: [] }
    case ActionTypes.PROMOS_FAILED:
      return { isLoading: false, errorMessage: action.payload, promotions: [] }
    default:
      return state
  }
}
