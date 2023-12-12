import React from 'react';
import './indepthdetails.css';

import {
    displayLocalTime
} from './../../shared/date';

const InDepthDetails = ({ currentWeather, timeFormat, error }) => {

    const cardDetails = [
        {
            name: 'Wind speed',
            unit: 'meter/sec',
            value: currentWeather.wind.speed
        },
        {
            name: 'Wind direction',
            unit: null,
            value: `${currentWeather.wind.deg}°`
        },
        {
            name: 'Wind gust',
            unit: 'meter/sec',
            value: currentWeather.wind.gust
        },
        {
            name: 'Humidity',
            unit: '%',
            value: currentWeather.main.humidity
        },
        {
            name: 'Real Feel',
            unit: '°C',
            value: currentWeather.main.feels_like
        },
        {
            name: 'Cloudiness',
            unit: '%',
            value: currentWeather.clouds.all
        },
        {
            name: 'Pressure',
            unit: 'hPa',
            value: currentWeather.main.pressure
        },
        {
            name: 'Visibility',
            unit: 'km',
            value: currentWeather.visibility / 1000
        },
        {
            name: 'Sunrise',
            unit: displayLocalTime(currentWeather.sys.sunrise, currentWeather.timezone, timeFormat, 's').period,
            value: displayLocalTime(currentWeather.sys.sunrise, currentWeather.timezone, timeFormat, 's').time
        },
        {
            name: 'Sunset',
            unit: displayLocalTime(currentWeather.sys.sunset, currentWeather.timezone, timeFormat, 's').period,
            value: displayLocalTime(currentWeather.sys.sunset, currentWeather.timezone, timeFormat, 's').time
        }
    ];

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!currentWeather) {
        return <div>Loading...</div>;
    }

    return (
        <div className="weather-info-container">
            {
                cardDetails.map((card, index) => (
                    card.value ? (
                        <div key={index} className="weather-info-box">
                            <p className="title">{card.name}</p>
                            <p className="value">
                                <span className={card.name}>{card.value}</span>
                                <span className="unit">{card.unit}</span>
                            </p>
                        </div>
                    ) : null
                ))
            }
        </div>
    );
};

export default InDepthDetails;