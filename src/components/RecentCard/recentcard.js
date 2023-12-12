import React from "react";

import "./recentcard.css";
import {
    displayLocalWeekday,
    displayLocalDate,
    displayLocalTime
} from './../../shared/date';

const RecentCard = ({ currentWeather, timeFormat, error }) => {
    const { weather, main, sys, dt, name, timezone } = currentWeather;
    const { description, icon } = weather[0];
    const WEATHER_ICON_URL = process.env.REACT_APP_ICON_URL;

    // const convertUTCtoLocalDate = (dt, timezone) => {
    //     return moment.unix(dt).add(timezone, 'seconds').format('MMMM Do YYYY');
    // }

    // const convertUTCtoLocalTime = (dt, timezone) => {
    //     return moment.unix(dt).add(timezone, 'seconds').format('dddd, H:mm:ss');
    // }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!currentWeather) {
        return <div>Loading...</div>;
    }

    return (
        <div className="weather-summary">
            <div className="weather-img">
                <img src={`${WEATHER_ICON_URL}/${icon}@2x.png`} alt="Weather Icon" />
            </div>
            <div className="temperature">
                <p>
                    <span className="value">{main.temp}</span>
                    <span className="unit-format">°C</span>
                </p>
                <p className="weathertext">{description}</p>
            </div>
            <div className="date-info">
                <p className="weekday">{displayLocalWeekday(dt, timezone)}</p>
                <p className="date">{displayLocalDate(dt, timezone)}</p>
                <p className="time">{displayLocalTime(dt, timezone, timeFormat)}</p>
                <p className="daystatus">{sys.pod === 'n' ? 'Night' : 'Day'}</p>
            </div>
            <div className="location-info">
                <p className="location">{name}</p>
            </div>
        </div>
    );
};

export default RecentCard;