import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Dishes } from './dishesReducer'
import { Comments } from './commentsReducer'
import { Promotions } from './promotionsReducer'
import { Leaders } from './leadersReducer'
import { Auth } from './authReducer'
import { favorites } from './favoritesReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
// import { createForms } from 'react-redux-form'
import { InitialFeedback } from './forms'

const rootReducer = combineReducers({
  dishes: Dishes,
  comments: Comments,
  promotions: Promotions,
  leaders: Leaders,
  auth: Auth,
  favorites,
  // ...createForms({
  //   feedback: InitialFeedback,
  // }),
})

// const middleware = [thunk, logger]
const middleware = [thunk]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
  // notice that we can pass applyMiddleware(thunk, logger) or use the rest operator
)
// initialState is optional, since it's defined in the reducer everything is okay
export default store
