import React from 'react';
import './indepthdetails.css';

import moment from 'moment';

const InDepthDetails = ({ currentWeather, error }) => {
    const formatTime = (date) => {
        return date.format("h:mm:ss");
    };

    const formatAMPM = (date) => {
        return date.format("a");
    };

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
            name: 'Max Temperarture',
            unit: '°C',
            value: currentWeather.main.temp_max
        },
        {
            name: 'Min Temperarture',
            unit: '°C',
            value: currentWeather.main.temp_min
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
            unit: formatAMPM(moment.unix(currentWeather.sys.sunrise)),
            value: formatTime(moment.unix(currentWeather.sys.sunrise))
        },
        {
            name: 'Sunset',
            unit: formatAMPM(moment.unix(currentWeather.sys.sunset)),
            value: formatTime(moment.unix(currentWeather.sys.sunset))
        }
    ];

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!currentWeather) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {
                cardDetails.map((card, index) => (
                    <div key={index} className="weather-info-box">
                        <p className="title">{card.name}</p>
                        <p className="value">
                            <span className={card.name}>{card.value}</span>
                            <span className="unit">{card.unit}</span>
                        </p>
                    </div>
                ))
            }
        </>
    );
};

export default InDepthDetails;