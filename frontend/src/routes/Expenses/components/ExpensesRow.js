import React, {PropTypes, Component} from 'react'
import {Button} from 'react-bootstrap'

class ExpenseRow extends Component {
  constructor (props) {
    super(props)
    this.state = {isOpen: true}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const isOpen = this.state.isOpen
    this.setState({isOpen: !isOpen})
  }

  render () {
    const {props: {expense}, state: {isOpen}} = this
    if (isOpen) {
      return (
        <tr>
          <td>{expense.id}</td>
          <td>{expense.amount}</td>
          <td>{expense.note}</td>
          <td>{expense.timestamp}</td>
          <td>{expense.user}</td>
          <td><Button onClick={this.handleClick}>Hide</Button></td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td>{expense.id}</td>
          <td colSpan="2">{expense.amount}</td>
          <td>{expense.timestamp}</td>
          <td>{expense.user}</td>
          <td><Button onClick={this.handleClick}>Show</Button></td>
        </tr>
      )
    }
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
