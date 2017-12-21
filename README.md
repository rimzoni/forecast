# Weather Forecast Application

Application provide 7-day forecast for selected City.

Implemented using:

 * [React](https://facebook.github.io/react)-[Redux](http://redux.js.org)
 * Routing with [react-router 4+](https://github.com/rackt/react-router)
 * Redux middleware Redux-thunk, Axios
 * ES6/ES7 with [babeljs](https://babeljs.io) (stage-0, react)
 * [Stylus](http://learnboost.github.io/stylus)
 * [Webpack 3+](https://webpack.github.io) dev and production
 * Eslint [standard](http://standardjs.com)
 * [Material-ui-next](https://material-ui-next.com) - [Material-icons]()
 * [Responsive Material-ui-next Grid](https://material-ui-next.com/layout/grid/) 
 * [Weather Icons](https://erikflowers.github.io/weather-icons/)
 * [OpenWeatherMap](http://openweathermap.org/api)
 * Google Geocode
 * Unit tests with [mocha](https://mochajs.org) + [chai](http://chaijs.com) - next release 

## Future Development

* Implement autocomplete for Cities on home screen.
* Handle errors if city doesnt exist on forecast page.

## Install
```sh
$ npm install
```

## Run - Development
```sh
$ npm run dev       # builds and hot reloads on changes
```

## Run - Production
```sh
$ npm run build     # builds production assets (transpile, minify, etc)
$ npm start         # Start express server and serves index.html
```

## Docker
To run a production version in [docker](https://www.docker.com):
```sh
$ docker build -t forecast/latest .   # Build docker container
$ docker run -p 4000:4000 -d forecast/latest  # Run docker container
$ docker ps # Get container id
$ docker stop container_id # Stoping the server
```
App will be running at <http://localhost:4000>

## PM2
To run a production version in [docker](https://www.docker.com):
```sh
$ pm2 start ecosystem.json   # Start server
$ pm2 status  # Check status of application
$ pm2 stop weather-forecast-app # Stoping the server
```
App will be running at <http://localhost:4000>

## Tests
```sh
$ npm run lint      # Runs eslint
$ npm test          # Runs mocha
$ npm run test:dev  # Run mocha in watch mode