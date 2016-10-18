import { takeEvery } from 'redux-saga'
import { put, call, fork } from 'redux-saga/effects'
import { Api } from './Api'
import {GET_EXPENSES_SUCCESS, GET_EXPENSES_REQUEST, GET_EXPENSES_FAILURE} from './expenses'

function * fetchExpenses () {
  try {
    const {expenses} = yield call(Api.getExpenses)
    // console.log(`expenses ${JSON.stringify(expenses)}`)
    yield put({type: GET_EXPENSES_SUCCESS, payload: expenses})
    return true
  } catch (error) {
    yield put({type: GET_EXPENSES_FAILURE, error})
  }
}

export default function * rootSaga () {
  yield fork(takeEvery, GET_EXPENSES_REQUEST, fetchExpenses)
}
