import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Dishes } from './dishesReducer'
import { Comments } from './commentsReducer'
import { Promotions } from './promotionsReducer'
import { Leaders } from './leadersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const rootReducer = combineReducers({
  dishes: Dishes,
  comments: Comments,
  promotions: Promotions,
  leaders: Leaders,
})

const middleware = [thunk, logger]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
  // notice that we can pass applyMiddleware(thunk, logger) or use the rest operator
)
// initialState is optional, since it's defined in the reducer everything is okay
export default store
