
# Weather-App

Welcome to the Weather App, a React-based web application that provides current weather information and forecasts using OpenWeatherMap APIs. This project aims to showcase my skills in React and enhance my understanding of working with external APIs.
## Demo

https://itsmetrina.github.io/weather-app/


## Tech Stack

- React
- CSS
- OpenWeatherMap APIs


## Features

- Current Weather: Get real-time weather data for your location or any city around the world.
- 5-Day Forecast: Plan ahead with a 5-day weather forecast.
- Geolocation: Automatically detect and display the weather for the user's current location.
- City Search: Search for weather information by entering the name of a city.
- Error Handling: Display informative messages if there are API errors or empty responses.
- Day/Night Mode: Automatically switch between light and dark modes based on the time of day.
- Responsive Design: Enjoy a seamless experience across various devices.
- Live previews
## API Reference

#### Geolocation API

```http
  GET /geo/1.0/direct?q=${location}&limit=1&appid={api_key}/&units=metric
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `appid` | `string` | **Required**. Your API key |
| `q` | `string` | **Required**. Name of the location |
| `limit` | `number` | Limit the number of results (default 1)|

#### Current Weather API

```http
  GET /data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={api_key}/&units=metric
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `appid` | `string` | **Required**. Your API key |
| `lat` | `number` | **Required**. Latitude of the location |
| `lon` | `number` | **Required**. Longitude of the location|

#### Forecast API

```http
  GET /data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid={api_key}/&units=metric
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `appid` | `string` | **Required**. Your API key |
| `lat` | `number` | **Required**. Latitude of the location |
| `lon` | `number` | **Required**. Longitude of the location|




## Run Locally

Clone the project

```bash
  git clone https://github.com/itsmetrina/weather-app.git
```

Go to the project directory

```bash
  cd weather-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Acknowledgements

- Layout inspired by various free weather website templates.
- OpenWeatherMap for providing the Geolocation, Current Weather, and Forecast APIs.
