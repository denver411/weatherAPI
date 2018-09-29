'use strict';

// const place = {city: "Saint Petersburg", geo: null};

const Weather = ({ data }) => {
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
      <h2 className="weather__city">{data.city.name}</h2>
      <span className="weather__date">now</span>
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
      <WeatherBlock data={data.list[8]}/>
      <WeatherBlock data={data.list[16]}/>
      <WeatherBlock data={data.list[24]}/>
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

const WeatherBlock = ({ data }) => {
  console.log (data);
  const weekDay = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  };
  return (
    <div className="block">
      <h3 className="block__title">{weekDay[new Date(data.dt_txt).getDay()]}</h3>
      <img
        className="block__icon"
        src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
      />
      <span className="block__temp">{data.main.temp_min.toFixed(0)}&deg; / {data.main.temp_max.toFixed(0)}&deg;</span>
      <span className="block__description">{data.weather[0].main}</span>
    </div>
  );
};
// document.addEventListener('DOMContentLoaded', getWeather('Saint Petersburg'));

navigator.geolocation.getCurrentPosition(function(position) {
  const geo = { lat: position.coords.latitude, lon: position.coords.longitude };
  getWeather(geo);
  // console.log(position.coords.latitude, position.coords.longitude);
}, () => getWeather("Saint Petersburg"));
