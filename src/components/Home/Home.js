import './style.styl'
import React from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Input from 'material-ui/Input'
import Typography from 'material-ui/Typography'
import Tooltip from 'material-ui/Tooltip'
import { SnackbarContent } from 'material-ui/Snackbar'
import { LinearProgress } from 'material-ui/Progress'
import { Search, Close, ArrowForward } from 'material-ui-icons'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    fontSize: theme.spacing.unit * 2,
    marginTop: 85,
    marginBottom: theme.spacing.unit * 2,
    height: 'auto',
    'min-height': 450,
    width: 'auto'
  }),
  search: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 20,
    paddingBottom: theme.spacing.unit * 2,
    fontSize: theme.spacing.unit * 2
  }),
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  button: {
    'padding-left': 25,
    cursor: 'pointer',
    width: 30,
    height: 30,
    top: 7,
    position: 'relative',
    fill: '#384f60'
  }
})
class Home extends React.Component {
  constructor (props) {
    super()
    this.state = {
      locationFetching: false,
      position: {},
      city: '',
      useLocation: false,
      error: ''
    }
    this.props = props
    this.getCurrentLocation = this.getCurrentLocation.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeLocation = this.removeLocation.bind(this)
    this.removeError = this.removeError.bind(this)
  }

  getCurrentLocation () {
    this.setState({ locationFetching: true })
    let geolocation = navigator.geolocation
    const location = new Promise((resolve, reject) => {
      if (!geolocation) {
        this.setState({ locationFetching: false })
        this.setState({error: 'Not supported by browser.'})
        reject(new Error('Not supported by browser.'))
      }
      geolocation.getCurrentPosition((position) => {
        this.props.actions.getCoordinates(position.coords)
        this.setState({ locationFetching: false })
        this.setState({useLocation: true})
        resolve(this.props.location.isFetching)
      }, () => {
        this.setState({ locationFetching: false })
        this.setState({error: 'Premission denied.'})
        reject(new Error('Premission denied.'))
      })
    })
    return location
  }
  removeLocation (e) {
    this.setState({useLocation: false})
  }

  removeError (e) {
    this.setState({error: ''})
  }
  handleSubmit (e) {
    if (this.props.location.city && this.state.useLocation === true) {
      this.props.history.push(`/${this.props.location.city}`)
    } else {
      this.props.history.push(`/${this.state.city}`)
    }
  }

  render () {
    const { classes } = this.props

    const currentLocationText = () => {
      return <span>use my <Tooltip id='tooltip-fab' title='Get location by browser locator' placement='bottom'><span className='border' onClick={this.getCurrentLocation}>current position</span></Tooltip></span>
    }

    return (
      <Grid container justify='center' alignItems='stretch' alignContent='center' direction='column' spacing={0}>
        {this.state.error ? <SnackbarContent
          className={classes.snackbar}
          message={this.state.error}
          action={<Tooltip id='tooltip-fab' title='Remove' placement='bottom'><Close className={`icon navigationIcons ${classes.button}`} onClick={this.removeError} /></Tooltip>}
        /> : ''}
        <Grid container justify='center' alignItems='center' alignContent='stretch' direction='row' spacing={0}>
          <Grid item lg={8} md={8} xs={12}>
            <Paper className={classes.root}>
              <Grid container justify='center' alignItems='stretch' alignContent='center' direction='column' spacing={8}>
                <Grid item lg={12} md={12} xs={12}>
                  <Grid container justify='space-around' alignItems='stretch' alignContent='center' direction='row' spacing={24}>
                    <Grid item lg={8} md={8} >
                      {!this.state.useLocation ? (
                        <div className={classes.search}>
                          <Input
                            fullWidth
                            id='city'
                            name='city'
                            placeholder='City'
                            // defaultValue={this.state.city}
                            onChange={(e) => this.setState({ city: e.target.value })}
                            endAdornment={<Search type='submit' className='icon' />}
                          />
                          {this.state.locationFetching ? (
                            <LinearProgress className={classes.progress} color='accent' />
                          ) : ''}
                        </div>
                      ) : (
                        <div className={classes.search} >
                          <Typography type='display1'>
                            7 day forecast for {this.props.location.city}
                            <Tooltip id='tooltip-fab' title='Remove' placement='bottom'><Close className={`icon navigationIcons ${classes.button}`} onClick={this.removeLocation} /></Tooltip>
                          </Typography>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <Grid container justify='space-around' alignItems='stretch' alignContent='center' direction='row' spacing={24}>
                    <Grid item lg={1} md={1}>
                      {!this.state.useLocation ? 'or' : ''}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <Grid container justify='space-around' alignItems='stretch' alignContent='center' direction='row' spacing={24}>
                    <Grid item lg={3} md={3}>
                      {!this.state.useLocation ? currentLocationText() : ''}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <Grid container justify='flex-end' alignItems='flex-end' alignContent='stretch' direction='row' spacing={24}>
                    <Grid item lg={2} md={2}>
                      <Tooltip id='tooltip-fab' title='Proceed' placement='bottom'>
                        <ArrowForward className={`icon navigationIcons ${classes.button}`} onClick={this.handleSubmit} />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object,
  actions: PropTypes.object,
  location: PropTypes.object,
  city: PropTypes.string,
  classes: PropTypes.object
}

export default withStyles(styles, { name: 'Home' })(Home)
