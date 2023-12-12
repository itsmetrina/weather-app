import React, { useState } from 'react';
import './forecastdateselection.css';

import ForecastCard from './../ForecastCard/forecastcard';

import { customDateFormat } from './../../shared/date';

const ForecastDateSelection = ({ forecast, timeFormat, error }) => {
    var date_arr = [];
    for (let i = 0; i < forecast.length; i++) {
        date_arr.push(forecast[i].date);
    }

    const [selectedDate, setSelectedDate] = useState(date_arr[0]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const selectedForecast = forecast.find((item) => item.date === selectedDate);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!forecast && !date_arr) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="date-slection-box">
                <div className="weekday">
                    {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
                <div className="dates">
                    {date_arr.map((date, index) => (
                        <button
                            key={index}
                            onClick={() => handleDateChange(date)}
                            disabled={date === selectedDate}
                        >
                            {customDateFormat(date)}
                        </button>
                    ))}
                </div>
            </div>
            <div className="forecast-container">
                {selectedForecast ? (
                    selectedForecast.forecasted_list.map((data, index) => (
                        <ForecastCard key={index} forecast={data} timeFormat={timeFormat} error={error} />
                    ))
                ) : (
                    <p>No forecast data available for the selected date.</p>
                )}
            </div>
        </>
    );
};

export default ForecastDateSelection;