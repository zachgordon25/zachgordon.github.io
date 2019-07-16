$(() => {
  let date = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York'
  });
  console.log(date);

  $('form').on('click', '#submit', event => {
    event.preventDefault();
    $('#forecast').empty();
    let $zip = $('#zip-code');
    let zipCode = $zip.val();
    let endpoint = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&APPID=27191dbc29ccfde300356183b803d41f`;
    $.ajax({ url: endpoint }).then(data => {
      console.log(data);
      let weatherConditions = data.weather[0];
      let tempK = data.main.temp;
      // $zip.hid();

      // convert Kelvin to Farenheit
      const tempConversion = () => {
        let tempF = Math.round(((tempK - 273.15) * 9) / 5 + 32);

        // mold object the way I want
        weatherConditions.temp = tempF;
        weatherConditions.name = data.name;
        delete weatherConditions.icon;
        delete weatherConditions.id;
        console.log(weatherConditions);

        const $city = $('<h1>').text(weatherConditions.name);
        $('#forecast').append($city);
        const $temp = $('<h2>').text(
          `Current temp: ${weatherConditions.temp}°F`
        );
        $('#forecast').append($temp);
        const $conditions = $('<h3>').text(
          `Current condition: ${weatherConditions.description}`
        );
        $('#forecast').append($conditions);
        // console.log($city);
      };
      tempConversion();
    });
  });
});
