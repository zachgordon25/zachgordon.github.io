$(() => {
  // let date = new Date();
  // console.log(date);

  $('form').on('click', '#submit', event => {
    event.preventDefault();
    $('#forecast').empty();
    let $zip = $('#zip-code');
    let zipCode = $zip.val();
    let endpoint = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&APPID=27191dbc29ccfde300356183b803d41f`;

    $.ajax({ url: endpoint }).then(data => {
      let weatherConditions = data.weather[0];
      let tempK = data.main.temp;
      let keyWord = data.weather[0].main;
      console.log(keyWord);

      // Using main weather term to search for a gif
      let gifEndpoint = `https://api.giphy.com/v1/gifs/translate?api_key=lutoU47bgWimQRM7XenOl702O4MDlPGG&s=${keyWord}&weirdness:10`;
      $.ajax({ url: gifEndpoint }).then(console.log(gifEndpoint));
      // convert Kelvin to Farenheit
      const tempConversion = () => {
        let tempF = Math.round(((tempK - 273.15) * 9) / 5 + 32);

        // mold object the way I want
        weatherConditions.temp = tempF;
        weatherConditions.name = data.name;
        delete weatherConditions.icon;
        delete weatherConditions.id;
        console.log(weatherConditions);

        // append information to body
        // $('#forecast').append(date);
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
