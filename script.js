'use strict';

const Weather = ({data}) => {
   return (
    <div className="weather">
			<form onSubmit={newWeather} className="weather__search-form">
				<input type="text" className="weather__search-city" name="search-city" placeholder="Search another city" />
			</form>
			<h2 className="weather__city">{data.name}</h2>
			<span className="weather__date">now</span>
			<span className="weather__temp">{data.main.temp}&deg;</span>
			<span className="weather__description">{data.weather[0].main}</span>
		</div>
   )
}

function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d53ae71614252d7dc62952a645eafc29&units=metric&lang=ru`)
  .then(data => data.json())
  .then(data => {
    console.log(data);
    ReactDOM.render(<Weather data={data}/>, document.querySelector('.container'));
    })
  .catch(console.log)
}

function newWeather(event){
  event.preventDefault();
  getWeather(event.currentTarget.elements[0].value);
}

document.addEventListener('DOMContentLoaded', getWeather('Saint Petersburg'));

navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords.latitude, position.coords.longitude);
});
