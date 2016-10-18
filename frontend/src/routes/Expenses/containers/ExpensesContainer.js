import {connect} from 'react-redux'
import ExpensesTable from '../components/ExpensesTable'

const mapStateToProps = (state) => ({
  expenses: state.expenses
})

export default connect(mapStateToProps)(ExpensesTable)
