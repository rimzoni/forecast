import React from 'react'
import Home from '../../components/Home'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { geoLocationActions } from '../../actions'

class HomePage extends React.Component {
  constructor (props) {
    super()
  }
  render () {
    return (
      <Home {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  return {
    location: state.location
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        geoLocationActions
      ),
      dispatch
    )
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  HomePage
))
