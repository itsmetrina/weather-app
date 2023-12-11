import React, { useState } from 'react';
import './forecastdateselection.css';

import moment from 'moment';

import ForecastCard from './../ForecastCard/forecastcard';

const ForecastDateSelection = ({ forecast, dates, error }) => {
    const [selectedDate, setSelectedDate] = useState(dates[0]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const formatDate = (date) => {
        return moment(date).format('DD MMMM YYYY');
    };

    const selectedForecast = forecast.find((item) => item.date === selectedDate);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!forecast && !dates) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="dateSlectionBox">
                {dates.map((date, index) => (
                    <button
                        key={index}
                        onClick={() => handleDateChange(date)}
                        disabled={date === selectedDate}
                    >
                        {formatDate(date)}
                    </button>
                ))}
            </div>
            <div className="forecast-container">
                {selectedForecast ? (
                    selectedForecast.forecastData.map((data, index) => (
                        <ForecastCard key={index} forecast={data} error={error} />
                    ))
                ) : (
                    <p>No forecast data available for the selected date.</p>
                )}
            </div>
        </>
    );
};

export default ForecastDateSelection;