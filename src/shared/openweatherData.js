const API_KEY = process.env.REACT_APP_API_KEY;
const WEATHER_URL = process.env.REACT_APP_API_URL;

export const handleErrors = (response) => {
	if (!response.ok) {
		console.error('Error response:', response);
		throw new Error('Error fetching data');
	}
	return response.json();
};

export const fetchWeatherDataMerge = async (lat, lon, city) => {
	try {
		let [currentWeatherResponse, forecastResponse] = [];
		if (city) {
			[currentWeatherResponse, forecastResponse] = await Promise.all([
				fetch(`${WEATHER_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`),
				fetch(`${WEATHER_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`),
			]);
		} else {
			[currentWeatherResponse, forecastResponse] = await Promise.all([
				fetch(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
				fetch(`${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
			]);
		}


		const [currentWeatherData, forecastData] = await Promise.all([
			handleErrors(currentWeatherResponse),
			handleErrors(forecastResponse),
		]);

		return [currentWeatherData, forecastData];
	} catch (error) {
		console.error(error);
		throw new Error(error.message);
	}
}