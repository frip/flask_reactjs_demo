import { combineReducers } from 'redux'
import locationReducer from './location'
import expenses from '../routes/Expenses/modules/expenses'

export default combineReducers({
  expenses,
  location: locationReducer
})
