import {connect} from 'react-redux'
import ExpensesTable from '../components/ExpensesTable'
import {loadExpenses} from '../modules/expenses'

const mapStateToProps = (state) => ({
expenses: state.expenses
})

const mapDispatchToProps = {
  loadExpenses
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable)
