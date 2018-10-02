'use strict';

const Weather = ({ data }) => {
  const startListItem = (24 - new Date(data.list[0].dt_txt).getHours()) / 3;

  return (
    <div className="weather">
      <form onSubmit={newWeather} className="weather__search-form">
        <input
          type="text"
          className="weather__search-city"
          name="search-city"
          placeholder="Search another city"
        />
      </form>
      <h2 className="weather__city"> {data.city.name} </h2>
      <span className="weather__date"> now </span>
      <div className="weather__today">
        <span className="weather__temp">
          {data.list[0].main.temp.toFixed(1)}
          &deg;
        </span>
        <img
          className="weather__icon"
          src={`https://openweathermap.org/img/w/${
            data.list[0].weather[0].icon
          }.png`}
        />
        <span className="weather__description">
          {data.list[0].weather[0].main}
        </span>
      </div>
      <div className="weather__forecast">
        <WeatherBlock data={data.list} startItem={startListItem} />
        <WeatherBlock data={data.list} startItem={startListItem + 8} />
        <WeatherBlock data={data.list} startItem={startListItem + 16} />
      </div>
    </div>
  );
};

const getWeather = data => {
  const place = data.lat ? `lat=${data.lat}&lon=${data.lon}` : `q=${data}`;
  console.log(place);
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?${place}&APPID=d53ae71614252d7dc62952a645eafc29&units=metric&lang=ru`
  )
    .then(data => data.json())
    .then(data => {
      console.log(data);
      ReactDOM.render(
        <Weather data={data} />,
        document.querySelector('.container')
      );
    })
    .catch(console.log);
};

const newWeather = event => {
  event.preventDefault();
  getWeather(event.currentTarget.elements[0].value);
};

const WeatherBlock = ({ data, startItem }) => {
 
  let minTemp = data[startItem].main.temp_min;
  let maxTemp = data[startItem].main.temp_max;
  for (let i = startItem + 1; i < startItem + 8; i++) {
    minTemp = Math.min(minTemp, data[i].main.temp_min);
    maxTemp = Math.max(maxTemp, data[i].main.temp_max);
  }

  const weekDay = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };
  const dateWeek = new Date(data[startItem].dt_txt);
  
  return (
    <div className="block">
      <h3 className="block__title"> {weekDay[dateWeek.getDay()]} </h3>
      <img
        className="block__icon"
        src={`https://openweathermap.org/img/w/${data[startItem].weather[0].icon}.png`}
      />
      <span className="block__temp">
        {maxTemp.toFixed(0)}
        &deg; / {minTemp.toFixed(0)}
        &deg;
      </span>
      <span className="block__description">
        {data[startItem].weather[0].main}
      </span>
    </div>
  )
};
// document.addEventListener('DOMContentLoaded', getWeather('Saint Petersburg'));

navigator.geolocation.getCurrentPosition(
  function(position) {
    const geo = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };
    getWeather(geo);
    // console.log(position.coords.latitude, position.coords.longitude);
  },
  () => getWeather('Saint Petersburg')
);
