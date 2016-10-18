// ----------------------------------------------
// Constants
// ----------------------------------------------
export const GET_EXPENSES_REQUEST = 'GET_EXPENSES_REQUEST'
export const GET_EXPENSES_SUCCESS = 'GET_EXPENSES_SUCCESS'
export const GET_EXPENSES_FAILURE = 'GET_EXPENSES_FAILURE'

// ----------------------------------------------
// Actions
// ----------------------------------------------
export function loadExpenses () {
  return {
    type: GET_EXPENSES_REQUEST
  }
}

// ----------------------------------------------
// Reducer
// ----------------------------------------------
const initialState = {
  expenses_list: [{
    "id": 1,
    "amount": 10.0,
    "note": "Testbemerkung",
    "timestamp": "2016-10-15T15:16:18.562000+00:00",
    "user": "bob"
  }, {
    "id": 2,
    "amount": 20.0,
    "note": "test2",
    "timestamp": "2016-10-16T13:16:18.562000+00:00",
    "user": "alice"
  }]
}

export default function expensesReducer (state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSES_REQUEST:
      return Object.assign({}, state, {
        'isFetching': true,
        'error': undefined
      })
    case GET_EXPENSES_SUCCESS:
      return Object.assign({}, {
        'expenses_list': action.payload,
        'isFetching': undefined
      })
    case GET_EXPENSES_FAILURE:
      return Object.assign({}, state, {
        'isFetching': undefined,
        error: action.error
      })
    default:
      return state
  }
}
