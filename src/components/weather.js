import React, { useState, useEffect } from "react";
import "./weather.css";

import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import Message from "./Message/message";
import Search from "./Search/search";
import RecentCard from "./RecentCard/recentcard";
import ForecastDateSelection from "./ForecastDateSelection/forecastdateselection";
import InDepthDetails from "./InDepthDetails/indepthdetails";

import { fetchWeatherDataMerge } from "./../services/weatherForecast";

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState("In-Depth");
    const [currentDate, setCurrentDate] = useState(moment());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(moment());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatDateTime = (date) => {
        return date.format("dddd, MMMM Do YYYY, H:mm:ss");
    };

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

    const filterForecastRecords = (list) => {
        const currentDate = moment().format("YYYY-MM-DD");
        return list.filter(
            (item) => moment(item.dt_txt).format("YYYY-MM-DD") !== currentDate
        );
    };

    const handleSearch = (city) => {
        fetchWeather(city);
    };

    if (!weather) {
        return <div>Loading...</div>;
    };

    const { list } = weather[1];

    const filteredForecastList = filterForecastRecords(list).reduce(
        (acc, forecast) => {
            const date = moment(forecast.dt_txt).format("YYYY-MM-DD");
            const existingEntry = acc.find((entry) => entry.date === date);
            if (existingEntry) {
                existingEntry.forecastData.push(forecast);
            } else {
                acc.push({
                    date,
                    forecastData: [forecast],
                });
            }
            return acc;
        },
        []
    );

    const formattedDateArray = filteredForecastList.map((item) => item.date);

    const isDay = (dt, sunrise, sunset, timezone) => {
        const localDt = moment.unix(dt).add(timezone, 'seconds');
        const localSunrise = moment.unix(sunrise).add(timezone, 'seconds');
        const localSunset = moment.unix(sunset).add(timezone, 'seconds');
        return (localDt >= localSunrise && localDt <= localSunset) ? 'd' : 'n';
    }

    if (weather[0]) {
        document.body.className = isDay(weather[0].dt, weather[0].sys.sunrise, weather[0].sys.sunset, weather[0].timezone);
    };

    const hasError = error || !weather;

    const handleBackToInitialState = () => {
        fetchWeatherWithGeolocation();
    };

    return (
        <div className={`weather ${hasError ? "error-state" : ""}`}>
            {hasError && <Message message={error || "Empty response"} onBack={handleBackToInitialState} />}
            {!hasError && (
                <>
                    <div className="left-panel">
                        <div className="search-container">
                            <Search onSearch={handleSearch} />
                        </div>
                        {weather[0] && (
                            <RecentCard currentWeather={weather[0]} error={error} />
                        )}
                    </div>
                    <div className="right-panel">
                        <div className="right-panel-header">
                            <div className="selection-box">
                                <div
                                    className={`selection-text ${selectedTab === "In-Depth" ? "active" : ""
                                        }`}
                                    onClick={() => setSelectedTab("In-Depth")}
                                >
                                    In-Depth
                                </div>
                                <div
                                    className={`selection-text ${selectedTab === "Weekly Forecast" ? "active" : ""
                                        }`}
                                    onClick={() => setSelectedTab("Weekly Forecast")}
                                >
                                    Weekly Forecast
                                </div>
                            </div>
                            <div>
                                <div className="current-time">
                                    {formatDateTime(currentDate)}
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
                            </div>
                        </div>
                        {selectedTab === "In-Depth" ? (
                            <div className="weatherInfo-container">
                                {weather[0] && (
                                    <InDepthDetails currentWeather={weather[0]} error={error} />
                                )}
                            </div>
                        ) : (
                            <>
                                <ForecastDateSelection
                                    forecast={filteredForecastList}
                                    dates={formattedDateArray}
                                    error={error}
                                />
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
export default Weather;