import React from 'react'
import {Table} from 'react-bootstrap'
import ExpensesRow from './ExpensesRow'

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

export const ExpensesTable = () => (
  <Table striped bordered condensed hover>
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

export default ExpensesTable
