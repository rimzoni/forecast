import React from 'react'
import Forecast from '../../components/Forecast'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { weatherActions } from '../../actions'

class ForecastPage extends React.Component {
  constructor (props) {
    super()
  }

  render () {
    return (
      <Forecast {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  return {
    location: state.location,
    forecast: state.forecast
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        weatherActions
      ),
      dispatch
    )
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForecastPage))
