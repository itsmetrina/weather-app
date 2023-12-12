export const unixTimezoneFormatter = (unixTimestamp, timezoneOffset) => {
    return new Date((unixTimestamp + timezoneOffset) * 1000).toUTCString();
}

export const displayLocalWeekday = (unixTimestamp, timezoneOffset) => {
    const localTime = new Date((unixTimestamp + timezoneOffset) * 1000);
    const formatOptions = {
        weekday: 'long',
        timeZone: 'UTC',
    };
    return new Intl.DateTimeFormat('en-US', formatOptions).format(localTime);
};

export const displayLocalDate = (unixTimestamp, timezoneOffset) => {
    const localTime = new Date((unixTimestamp + timezoneOffset) * 1000);
    const formatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    };
    return new Intl.DateTimeFormat('en-US', formatOptions).format(localTime);
};

const extractTime = (formattedTime) => {
    return formattedTime.split(' ')[0];
};

const extractPeriod = (formattedTime) => {
    return formattedTime.split(' ')[1];
};

export const displayLocalTime = (unixTimestamp, timezoneOffset, hourFormat, responseType) => {
    const localTime = new Date((unixTimestamp + timezoneOffset) * 1000);
    const formatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: hourFormat === '12',
        timeZone: 'UTC',
    };
    const formattedTime = new Intl.DateTimeFormat('en-US', formatOptions).format(localTime);

    if (responseType === 's') {
        return {
            time: extractTime(formattedTime),
            period: extractPeriod(formattedTime),
        };
    } else return formattedTime;
};

export const displayCurrentDateTime = (currentDateTime, hourFormat) => {
    const formatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: hourFormat === '12',
    };
    const formattedTime = new Intl.DateTimeFormat('en-US', formatOptions).format(currentDateTime);
    return formattedTime;
};

export const isDay = (dt, sunrise, sunset, timezoneOffset) => {
    const formatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZone: 'UTC'
    };

    const dtFormatter = new Intl.DateTimeFormat('en-US', formatOptions);

    const localDt = new Date((dt + timezoneOffset) * 1000);
    const localSunrise = new Date((sunrise + timezoneOffset) * 1000);
    const localSunset = new Date((sunset + timezoneOffset) * 1000);

    const formattedDt = dtFormatter.format(localDt);
    const formattedSunrise = dtFormatter.format(localSunrise);
    const formattedSunset = dtFormatter.format(localSunset);

    return (formattedDt >= formattedSunrise && formattedDt <= formattedSunset) ? 'd' : 'n';
};

export const customDateFormat = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);
    const [month, day, year] = formattedDate.split(' ');
    return `${month} ${day} ${year}`;
}