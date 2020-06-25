//Init storage
const storage= new Storage();
//Get stored location data
const weatherLocation = storage.getLocationData();

//Init weather class
const weather = new Weather(weatherLocation.city,weatherLocation.country);

//Init UI
const ui = new UI();

//Get weather on dom load
document.addEventListener('DOMContentLoaded',getWeather);

//Change location event
document.getElementById('w-change-btn').addEventListener('click',(e)=>{
  const city=document.getElementById('city').value;
  const country=document.getElementById('country').value;

  //Change location
  weather.changeLocation(city,country);
  //Set location in local storage
  storage.setLocationData(city,country);

  //Get and display weather again
  getWeather();

  //Close model
  $("#locModal").modal('hide');
})

//weather.changeLocation('hangzhou','cn');

function getWeather(){
    weather.getWeather()    //使用asnyc 返回promise，需要用then返回object
          .then(results=>{
            ui.paint(results);
          })
          .catch(err=>console.log(err));
}