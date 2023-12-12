import React, { useState, useEffect } from "react";
import "./weather.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import Message from "./Message/message";
import Search from "./Search/search";
import RecentCard from "./RecentCard/recentcard";
import ForecastDateSelection from "./ForecastDateSelection/forecastdateselection";
import InDepthDetails from "./InDepthDetails/indepthdetails";

import { displayCurrentDateTime, isDay, unixTimezoneFormatter } from "../shared/date";
import { fetchWeatherDataMerge } from "../shared/openweatherData";

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState("In-Depth");
    const [timeFormat, setTimeFormat] = useState('12');
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const fetchWeatherWithGeolocation = async () => {
        try {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const data = await fetchWeatherDataMerge(latitude, longitude, null);
                    setWeather(data);
                    setError(null);
                },
                async (warn) => {
                    console.warn(warn);
                    try {
                        const data = await fetchWeatherDataMerge(0, 0, null);
                        setWeather(data);
                        setError(null);
                    } catch (error) {
                        setError(error.message);
                    }
                }
            );
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchWeatherWithGeolocation();
    }, []);

    const fetchWeather = async (city) => {
        try {
            const data = await fetchWeatherDataMerge(null, null, city);
            setWeather(data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    const handleSearch = (city) => {
        fetchWeather(city);
    };

    const transformedArray = weather && weather[1] ? weather[1].list.reduce((acc, forecast) => {
        const date = forecast.dt_txt.split(' ')[0];
        const weekday = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
        const existingDateEntry = acc.find(entry => entry.date === date);
        if (existingDateEntry) {
            existingDateEntry.forecasted_list.push({
                ...forecast,
                timezone: weather[1].city.timezone
            });
        } else {
            acc.push({
                date,
                weekday: weekday,
                forecasted_list: [{
                    ...forecast,
                    timezone: weather[1].city.timezone
                }],
            });
        }
        return acc;
    }, []) : [];

    const filteredData = weather && weather[0] && weather[1] ? transformedArray.filter(item => {
        const itemDate = new Date(item.date);
        const weatherDate = new Date(unixTimezoneFormatter(weather[0].dt, weather[0].timezone));
        return itemDate > weatherDate;
    }) : [];

    if (weather && weather[0]) {
        document.body.className = isDay(weather[0].dt, weather[0].sys.sunrise, weather[0].sys.sunset, weather[0].timezone);
    }

    const hasError = error || !weather;

    const handleBackToInitialState = () => {
        fetchWeatherWithGeolocation();
    };

    if (!(weather && weather.length > 0)) {
        return <div>Loading...</div>;
    };

    return (
        <div className={`weather-container ${hasError ? "error-state" : ""}`}>
            {hasError && <Message message={error || "Empty response"} onBack={handleBackToInitialState} />}
            {!hasError && (<>
                <div className="weather-items">
                    <Search onSearch={handleSearch} />
                </div>
                <div className="weather-items selection-container">
                    <div className={`selection-text ${selectedTab === "In-Depth" ? "active" : ""}`}
                        onClick={() => setSelectedTab("In-Depth")}>
                        In-Depth
                    </div>
                    <div className={`selection-text ${selectedTab === "Weekly Forecast" ? "active" : ""}`}
                        onClick={() => setSelectedTab("Weekly Forecast")}>
                        Weekly Forecast
                    </div>
                </div>
                <div className="weather-items info">
                    <div className="current-time">
                        {displayCurrentDateTime(currentDateTime, timeFormat)}
                    </div>
                    <div className="time-format">
                        <select value={timeFormat} onChange={(e) => setTimeFormat(e.target.value)}>
                            <option value="24">24hr</option>
                            <option value="12">12hr</option>
                        </select>
                    </div>
                    <div className="github-icon">
                        <a
                            href="https://github.com/itsmetrina/weather-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="weather-items">
                    {weather[0] && (
                        <RecentCard currentWeather={weather[0]} timeFormat={timeFormat} error={error} />
                    )}
                </div>
                <div className="weather-items">
                    {selectedTab === "In-Depth" ? (
                        <>
                            {weather[0] && (
                                <InDepthDetails currentWeather={weather[0]} timeFormat={timeFormat} error={error} />
                            )}
                        </>
                    ) : (
                        <>
                            <ForecastDateSelection
                                forecast={filteredData}
                                timeFormat={timeFormat}
                                error={error}
                            />
                        </>
                    )}
                </div>
            </>)}
        </div>
    );
}
export default Weather;