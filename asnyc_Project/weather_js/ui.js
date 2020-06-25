class UI{
  constructor(){
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.icon = document.getElementById('w-icon');
    this.details = document.getElementById('w-details');
    this.humidity = document.getElementById('w-humidity');
    this.dewpoint = document.getElementById('w-dewpoint');
    this.feels_like = document.getElementById('w-feels-like');
    this.wind = document.getElementById('w-wind');
    
  }

  paint(weather){
    this.location.textContent=`${weather.sys.country},${weather.name}`;
    this.desc.textContent=weather.weather[0].description;
    this.string.textContent=`${weather.main.temp} F`;
    this.icon.setAttribute(`src`,`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    this.humidity.textContent=`Relative Humidity : ${weather.main.humidity} %`;
    this.feels_like.textContent=`Feels Like : ${weather.main.feels_like} F`;
    this.dewpoint.textContent=`Pressure : ${weather.main.pressure} pa`;
    this.wind.textContent=`Wind Speed: ${weather.wind.speed} m/s`;
  }
}