import './style.styl'
import React from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import { getWeatherBasedOnTimeOfDay, toUppercaseFirstLetter } from '../../utils/helper'
import Moment from 'moment'

import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Switch from 'material-ui/Switch'
import { ArrowBack } from 'material-ui-icons'
import Tooltip from 'material-ui/Tooltip'

// easier override of material classes
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 4,
    fontSize: theme.spacing.unit * 2,
    marginTop: 85,
    marginBottom: theme.spacing.unit * 2,
    height: 'auto',
    'min-height': 450,
    width: 'auto'
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
  },
  bar: {
    display: 'none'
  },
  checked: {
    background: '#FFFFFF',
    color: '#384f60',
    border: '1px solid #384f60',
    width: 60,
    height: 22,
    'border-radius': 20
  },
  default: {
    background: '#FFFFFF',
    color: '#384f60',
    border: '1px solid #384f60',
    width: 60,
    height: 22,
    'border-radius': 20,
    transform: 'translateX(14px)'
  },
  celsius: {
    'font-size': 15,
    'font-weight': 700,
    'line-height': 1.2,
    position: 'absolute',
    left: 13
  },
  switchChecked: {
    position: 'absolute',
    flex: '0 0 auto',
    width: 24,
    top: 1,
    height: 18,
    padding: 0,
    'font-size': '0.5rem',
    'text-align': 'center',
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    'border-radius': 20,
    border: '1px solid #384f60',
    right: 1
  },
  fahrenheit: {
    'font-size': 15,
    'font-weight': 700,
    'line-height': 1.2,
    position: 'absolute',
    right: 13,
    float: 'right'
  },
  switchUnchecked: {
    position: 'absolute',
    flex: '0 0 auto',
    width: 24,
    top: 1,
    height: 18,
    padding: 0,
    'font-size': '0.5rem',
    'text-align': 'center',
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    'border-radius': 20,
    border: '1px solid #384f60',
    left: 1
  },
  span: {
    'text-align': 'initial',
    width: 35,
    height: 15,
    position: 'realative'
  }
})

class Forecast extends React.Component {
  constructor (props) {
    super()
    this.props = props
    this.handleBackButton = this.handleBackButton.bind(this)
  }

  componentDidMount () {
    this.props.actions.getForecast(this.props.match.params.city, this.props.forecast.scaleType.celsius)
  }

  handleBackButton (e) {
    this.props.history.push(`/`)
  }

  render () {
    const { classes } = this.props
    const { data } = this.props.forecast
    const currentDay = this.props.forecast.data[0]
    const currentTimeOfDay = getWeatherBasedOnTimeOfDay(Moment(), currentDay)
    Moment.locale('en')
    const checkedToggle = () => {
      return (
        <span className={classes.span}>
          <i className={`wi wi-${this.props.forecast.scaleType.icon} ${classes.celsius}`} />
          <i className={`MuiSwitch-icon-156 ${classes.switchChecked}`} />
        </span>
      )
    }
    const uncheckedToggle = () => {
      return (
        <span className={classes.span}>
          <i className={`MuiSwitch-icon-156 ${classes.switchUnchecked}`} />
          <i className={`wi wi-${this.props.forecast.scaleType.icon} ${classes.fahrenheit}`} />
        </span>
      )
    }
    return (
      <Grid container justify='center' alignItems='center' spacing={24}>
        <Grid item lg={8} md={8} xs={12}>
          <Paper className={classes.root} >
            <Grid container justify='space-between' alignItems='baseline' spacing={24}>
              <Grid item lg={1} md={1}>
                <Tooltip id='tooltip-fab' title='Go back to home screen' placement='bottom'><ArrowBack className={`icon navigationIcons ${classes.button}`} onClick={this.handleBackButton} /></Tooltip>
              </Grid>
              <Grid item lg={9} md={9}>
                <h2 className='city'>{toUppercaseFirstLetter(this.props.match.params.city)}</h2>
              </Grid>
              <Grid item lg={2} md={2}>
                <Tooltip id='tooltip-fab' title='Change Scale' placement='bottom'>
                  <Switch
                    classes={{
                      checked: classes.checked,
                      bar: classes.bar,
                      default: classes.default
                    }}
                    checked={this.props.forecast.scaleType.celsius}
                    checkedIcon={checkedToggle()}
                    icon={uncheckedToggle()}
                    onChange={(event, checked) => { this.props.actions.changeScaleType(this.props.forecast.data, this.props.forecast.scaleType.celsius) }}
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container justify='space-around' alignItems='baseline' spacing={24}>
              <Grid item lg={12} md={12}>
                <h5 className='currentDate'>{Moment().format('dddd, MMMM Do YYYY')}</h5>
              </Grid>
            </Grid>
            <Grid container justify='space-around' alignItems='baseline' spacing={24}>
              <Grid item lg={12} md={12}>
                <h6 className='currentWeatherDesc'>{toUppercaseFirstLetter(currentDay.weather.description)}</h6>
              </Grid>
            </Grid>
            <Grid container justify='flex-start' alignContent='stretch' spacing={40}>
              <Grid item className='currentWeather'>
                {currentTimeOfDay.value} <span>{String.fromCharCode(this.props.forecast.scaleType.hex)}</span>
              </Grid>
              <Grid item className='currentWeather'>
                <i className={`wi wi-owm-${currentTimeOfDay.period}-${currentDay.weather.id}`} />
              </Grid>
              <Grid item lg={4} md={4}>
                <Grid container className='currentWeatherByHour' justify='flex-start' alignItems='stretch' alignContent='stretch' direction='column' spacing={8}>
                  <Grid item>
                    <Grid container justify='space-between' alignItems='stretch' alignContent='stretch' direction='row' spacing={8}>
                      <Grid item lg={3} md={3}>
                          Morning
                      </Grid>
                      <Grid item lg={9} md={9}>
                        {currentDay.temp.morn} <span>{String.fromCharCode(this.props.forecast.scaleType.hex)}</span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justify='space-between' alignItems='stretch' alignContent='stretch' direction='row' spacing={8}>
                      <Grid item lg={3} md={3}>
                          Day
                      </Grid>
                      <Grid item lg={9} md={9}>
                        {currentDay.temp.day} <span>{String.fromCharCode(this.props.forecast.scaleType.hex)}</span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justify='space-between' alignItems='stretch' alignContent='stretch' direction='row' spacing={8}>
                      <Grid item lg={3} md={3}>
                          Evening
                      </Grid>
                      <Grid item lg={9} md={9}>
                        {currentDay.temp.eve} <span>{String.fromCharCode(this.props.forecast.scaleType.hex)}</span>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justify='space-between' alignItems='stretch' alignContent='stretch' direction='row' spacing={8}>
                      <Grid item lg={3} md={3}>
                          Night
                      </Grid>
                      <Grid item lg={9} md={9}>
                        {currentDay.temp.night} <span>{String.fromCharCode(this.props.forecast.scaleType.hex)}</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid container justify='space-around' alignItems='center' alignContent='flex-end' className='centerBox' spacing={40}>
              { data.map((weekDay, key) => {
                return (
                  <Grid item key={key}>
                    <Grid container justify='center' alignItems='stretch' direction='column' spacing={16}>
                      <Grid item lg={12} md={12}>
                        <span className='forecastText'>{Moment().add(key, 'days').format('dddd')}</span>
                      </Grid>
                      <Grid item lg={12} md={12}>
                        <i className={`wi wi-owm-${weekDay.weather.id} forecastIcons`} />
                      </Grid>
                      <Grid item lg={12} md={12}>
                        <span className='forecastText' >{weekDay.temp.day} <span>{String.fromCharCode(this.props.forecast.scaleType.hex)}</span></span>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              }
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

Forecast.propTypes = {
  history: PropTypes.object,
  actions: PropTypes.object,
  match: PropTypes.object,
  forecast: PropTypes.object,
  classes: PropTypes.object
}

export default withStyles(styles, { name: 'Forecast' })(Forecast)
