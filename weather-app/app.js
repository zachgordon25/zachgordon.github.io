$(() => {
  let zipCode = '06854';
  let endpoint = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&APPID=27191dbc29ccfde300356183b803d41f`;

  $.ajax({ url: endpoint }).then(data => {
    console.log(data);
    let tempK = data.main.temp;
    let weatherConditions = data.weather[0];

    // convert Kelvin to Farenheit
    const tempConversion = () => {
      let tempF = Math.round(((tempK - 273.15) * 9) / 5 + 32);
      // console.log(tempF);

      weatherConditions.temp = tempF;
      delete weatherConditions.icon;
      delete weatherConditions.id;
      console.log(weatherConditions);
    };
    tempConversion();
  });
});
