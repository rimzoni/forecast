import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import HomePage from '../../containers/HomePage'
import ForecastPage from '../../containers/ForecastPage'

const RoutesApp = ({ location }) => (
  <div>
    <Route location={location} path='/' exact component={HomePage} />
    <Route location={location} path='/:city' exact component={ForecastPage} />
  </div>
)

RoutesApp.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default RoutesApp
