import React, { useState, useEffect } from 'react';
import './weather.css';

import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import Message from './Message/message';
import Search from './Search/search';
import RecentCard from './RecentCard/recentcard';
import ForecastCard from './ForecastCard/forecastcard';
import InDepthDetails from './InDepthDetails/indepthdetails';

import { fetchWeatherDataMerge, fetchWeatherDataWithGeolocation } from './../services/weatherForecast';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [selectedTab, setSelectedTab] = useState('In-Depth');
    const [currentDate, setCurrentDate] = useState(moment());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(moment());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatDateTime = (date) => {
        return date.format("dddd, MMMM Do YYYY, h:mm:ss a");
    };

    const fetchWeatherWithGeolocation = async () => {
        try {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const data = await fetchWeatherDataMerge(latitude, longitude);
                    setWeather(data);
                    setError(null);
                },
                async (warn) => {
                    console.warn(warn);
                    const data = await fetchWeatherDataMerge(0, 0);
                    setWeather(data);
                    setError(null);
                }
            );
        } catch (error) {
            console.error(error);
            setError('Error fetching weather data');
        }
    };

    useEffect(() => {
        fetchWeatherWithGeolocation();
    }, []);

    const fetchWeather = async (city) => {
        try {
            const data = await fetchWeatherDataWithGeolocation(city);
            setWeather(data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error fetching weather data');
        }
    };

    const handleSearch = (city) => {
        fetchWeather(city);
    };

    if (!weather) {
        return <div>Loading...</div>;
    }

    const { list } = weather[1];
    if (list && list.length > 0 && list[0].sys && list[0].sys.pod) {
        document.body.className = list[0].sys.pod;
    }
    const hasError = error || !weather;

    return (
        <div className={`weather ${hasError ? 'error-state' : ''}`}>
            {hasError && <Message message={error || 'Empty response'} />}

            {!hasError && (
                <>
                    <div className="left-panel">
                        <div className="search-container">
                            <Search onSearch={handleSearch} />
                        </div>
                        {weather[0] && <RecentCard currentWeather={weather[0]} error={error} />}
                    </div>

                    <div className="right-panel">
                        <div className="right-panel-header">
                            <div className="selection-box">
                                <div className={`selection-text ${selectedTab === 'In-Depth' ? 'active' : ''}`} onClick={() => setSelectedTab('In-Depth')}>
                                    In-Depth
                                </div>
                                <div className={`selection-text ${selectedTab === 'Forecast' ? 'active' : ''}`} onClick={() => setSelectedTab('Forecast')}>
                                    Forecast
                                </div>
                            </div>
                            <div>
                                <div className="current-time">{formatDateTime(currentDate)}</div>
                                <div className="github-icon">
                                    <a href="https://github.com/itsmetrina/weather-app" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faGithub} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        {selectedTab === 'In-Depth' ? (
                            <div className="weatherInfo-container">
                                {weather[0] && <InDepthDetails currentWeather={weather[0]} error={error} />}
                            </div>
                        ) : (
                            <div className="forecast-container">
                                {list.slice(1).map((forecast, index) => (
                                    <ForecastCard key={index} forecast={forecast} error={error} />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}

        </div>
    );
};

export default Weather;