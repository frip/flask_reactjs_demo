import React, {PropTypes, Component} from 'react'

class ExpenseRow extends Component {
  render () {
    const {props: {expense}} = this
      return (
        <tr>
          <td>{expense.id}</td>
          <td>{expense.amount}</td>
          <td>{expense.note}</td>
          <td>{expense.timestamp}</td>
          <td>{expense.user}</td>
        </tr>
      )
  }
}

ExpenseRow.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    note: PropTypes.string,
    timestamp: PropTypes.string,
    user: PropTypes.string.isRequired
  })
}

export default ExpenseRow
