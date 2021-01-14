import * as ActionTypes from './actionTypes'

export const Comments = (
  state = { errorMessage: null, comments: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        errorMessage: null,
        comments: action.payload,
      }
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errorMessage: action.payload, comments: [] }
    case ActionTypes.ADD_COMMENT:
      let comment = action.payload
      comment.id = state.comments.length
      comment.date = new Date().toISOString()
      // return state.concat(comment)
      return { ...state, comments: [...state.comments, comment] }
    default:
      return state
  }
}
