class Weather{
  constructor(city,country){
    this.apiKey='dd07fb153fcb6141c36e93678b69e156';
    this.city = city;
    this.country=country;
  }

  //Fetch weather from api
  async getWeather(){   //要把http加上
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&APPID=${this.apiKey}`);

    const responseData= await response.json();
    return responseData;
  }

  //Change weather location
  changeLocation(city,country){
    this.city=city;
    this.country=country;
  }
}