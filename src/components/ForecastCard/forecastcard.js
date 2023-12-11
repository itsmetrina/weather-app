import React from 'react';
import moment from 'moment';

import './forecastcard.css';

const ForecastCard = ({ forecast, error }) => {
    console.log(forecast,'forecast')
    const { dt, main, weather } = forecast;
    const { icon, description } = weather[0];
    const WEATHER_ICON_URL = process.env.REACT_APP_ICON_URL;

    const formatTime = (date, timezone) => {
        return moment.unix(date).add(timezone, 'seconds').format('H:mm');
    };

    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!forecast) {
        return <div>Loading...</div>;
    }

    return (
        <div className="forecast-card">
            <p className="time">{formatTime(dt)}</p>
            <p className="description">{toTitleCase(description)}</p>
            <img src={`${WEATHER_ICON_URL}/${icon}@2x.png`} alt="Weather Icon" />
            <p className="temperature">{main.temp}°C</p>
        </div>
    );
};

export default ForecastCard;