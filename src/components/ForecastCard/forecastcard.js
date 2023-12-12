import React from 'react';
import './forecastcard.css';

import { displayLocalTime } from './../../shared/date';

const ForecastCard = ({ forecast, timeFormat, error }) => {
    const { dt, main, weather, timezone } = forecast;
    const { icon, description } = weather[0];
    const WEATHER_ICON_URL = process.env.REACT_APP_ICON_URL;

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
            <p className="time">{displayLocalTime(dt, timezone, timeFormat)}</p>
            <p className="description">{toTitleCase(description)}</p>
            <img src={`${WEATHER_ICON_URL}/${icon}@2x.png`} alt="Weather Icon" />
            <p className="temperature">{main.temp}°C</p>
        </div>
    );
};

export default ForecastCard;