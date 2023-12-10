import React from 'react';
import moment from 'moment';

import './forecastcard.css';

const ForecastCard = ({ forecast, error }) => {
    const { dt_txt, main, weather } = forecast;
    const { icon } = weather[0];
    const WEATHER_ICON_URL = process.env.REACT_APP_ICON_URL;

    const formatDate = (date) => {
        return date.format("MMMM Do YYYY");
    };

    const formatTime = (date) => {
        return date.format("dddd, h:mm:ss a");
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!forecast) {
        return <div>Loading...</div>;
    }

    return (
        <div className="forecast-card">
            <p className="date">{formatDate(moment(dt_txt))}</p>
            <p className="time">{formatTime(moment(dt_txt))}</p>
            <img src={`${WEATHER_ICON_URL}/${icon}@2x.png`} alt="Weather Icon" />
            <p className="temperature">{main.temp}°C</p>
        </div>
    );
};

export default ForecastCard;