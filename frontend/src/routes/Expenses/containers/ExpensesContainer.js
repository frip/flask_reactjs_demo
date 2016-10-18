import {connect} from 'react-redux'
import ExpensesTable from '../components/ExpensesTable'

const expenses = {
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

const mapStateToProps = (state) => ({
  expenses
})

export default connect(mapStateToProps)(ExpensesTable)
