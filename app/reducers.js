import { combineReducers } from 'redux'
import { reducer as game } from './containers/game'

const rootReducer = combineReducers({
  game,
})

export default rootReducer
