import { combineReducers } from 'redux'
import { reducer as main } from './containers'

const rootReducer = combineReducers({
  main,
})

export default rootReducer
