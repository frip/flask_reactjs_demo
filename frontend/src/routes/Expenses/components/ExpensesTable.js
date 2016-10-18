import React from 'react'
import {Table} from 'react-bootstrap'
import ExpensesRow from './ExpensesRow'

export const ExpensesTable = (props) => {
  const {expenses} = props
  return (<Table striped bordered condensed hover>
    <thead>
    <tr>
      <th>Id</th>
      <th>Amount</th>
      <th>Note</th>
      <th>Timestamp</th>
      <th>User</th>
      <td/>
    </tr>
    </thead>
    <tbody>
    {expenses.expenses_list.map((exp, i) => (
      <ExpensesRow expense={exp} key={i}/>
    ))}
    </tbody>
  </Table>
)
}

export default ExpensesTable
