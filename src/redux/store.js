import { createStore, combineReducers } from 'redux'
import { Dishes } from './dishesReducer'
import { Comments } from './commentsReducer'
import { Promotions } from './promotionsReducer'
import { Leaders } from './leadersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  dishes: Dishes,
  comments: Comments,
  promotions: Promotions,
  leaders: Leaders,
})

const store = createStore(rootReducer, composeWithDevTools())
// initialState is optional, since it's defined in the reducer everything is okay
export default store
