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
    default:
      return state
  }
}
