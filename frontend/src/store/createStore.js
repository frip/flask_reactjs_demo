import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'react-router'
import rootReducer from './reducers'
import { updateLocation } from './location'
import rootSaga from '../routes/Expenses/modules/saga'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [thunk, sagaMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
