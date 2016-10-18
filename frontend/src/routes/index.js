import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Expenses from './Expenses'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={Expenses} />
  </Route>
)
