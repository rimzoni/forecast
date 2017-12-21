import './App.styl'
import 'typeface-roboto'
import '../../assets/css/weather-icons.min.css'
import { MuiThemeProvider, createMuiTheme } from 'material-ui'
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { resetErrorMessage } from '../../actions'
import RoutesApp from '../../components/Routes'

const theme = createMuiTheme({
  overrides: {
    body: {
      root: {
        background: 'linear-gradient(45deg, #EF8279 30%, #fd7a56 90%)'
      }
    }
  }
})
class App extends React.Component {
  handleDismissClick () {
    return e => {
      e.preventDefault()
      this.props.resetErrorMessage()
    }
  }

  renderErrorMessage () {
    const { errorMessage } = this.props
    if (!errorMessage) return null

    return (
      <p className='error'>
        {errorMessage}
        <span className='close' onClick={this.handleDismissClick()}>
          &#x2718;
        </span>
      </p>
    )
  }

  render () {
    return (
      <BrowserRouter>
        <Route
          render={props => (
            <MuiThemeProvider theme={theme}>
              <RoutesApp
                location={props.location}
              />
            </MuiThemeProvider>
          )}
        />
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  errorMessage: PropTypes.any,
  resetErrorMessage: PropTypes.func
}

export default connect(
  state => ({
    errorMessage: state.errorMessage
  }),
  { resetErrorMessage: resetErrorMessage }
)(App)
