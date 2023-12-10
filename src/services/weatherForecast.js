const API_KEY = process.env.REACT_APP_API_KEY;
const WEATHER_URL = process.env.REACT_APP_API_URL;
const GEOLOCATION_URL = process.env.REACT_APP_GEOLOCATION_API_URL;

export const handleErrors = (response) => {
	if (!response.ok) {
		console.error('Error response:', response);
		throw new Error('Error fetching data');
	}
	return response.json();
};

export const fetchGeolocationData = async (city, limit = 1) => {
	try {
		const geolocationResponse = await fetch(
			`${GEOLOCATION_URL}/direct?q=${city}&limit=${limit}&appid=${API_KEY}`
		);

		const geolocationData = await handleErrors(geolocationResponse);

		if (geolocationData.length === 0) {
			throw new Error('No geolocation data found for the specified location');
		}

		const { lat, lon } = geolocationData[0];
		return { lat, lon };
	} catch (error) {
		console.error(error);
		throw new Error('Error fetching geolocation data');
	}
};

export const fetchWeatherDataWithGeolocation = async (city) => {
	try {
		const { lat, lon } = await fetchGeolocationData(city);
		return await fetchWeatherDataMerge(lat, lon);
	} catch (error) {
		console.error(error);
		throw new Error('Error fetching weather data with geolocation');
	}
};

export const fetchWeatherDataMerge = async (lat, lon) => {
	try {
		const [currentWeatherResponse, forecastResponse] = await Promise.all([
			fetch(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
			fetch(`${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
		]);

		const [currentWeatherData, forecastData] = await Promise.all([
			handleErrors(currentWeatherResponse),
			handleErrors(forecastResponse),
		]);

		return [currentWeatherData, forecastData];
	} catch (error) {
		console.error(error);
		throw new Error('Error fetching weather data with geolocation');
	}
}