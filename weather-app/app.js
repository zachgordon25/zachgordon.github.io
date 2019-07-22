$(() => {
  $('form').on('click', '#submit', event => {
    // Prevent auto refresh
    event.preventDefault();

    // Reset forecast and gif
    $('#forecast').empty();
    $('#gif').empty();
    $('body').append($('#gif-tag'));
    //  remove initial gif and tag
    $('#pronounce').hide();

    // Everything after this happens after zipcode input
    let $zipBar = $('#zip-bar');
    let zipCode = $zipBar.val();
    let weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&APPID=27191dbc29ccfde300356183b803d41f`;
    $.ajax({ url: weatherEndpoint }).then(data => {
      let weatherConditions = data.weather[0];
      let tempK = data.main.temp;

      ////////
      //GIF//
      //////

      // GIF searchword
      let keyword = data.weather[0].main;
      console.log(keyword);
      // Using main weather term to search for a gif
      let gifEndpoint = `https://api.giphy.com/v1/gifs/translate?api_key=lutoU47bgWimQRM7XenOl702O4MDlPGG&s=${keyword}`;

      $.ajax({ url: gifEndpoint }).then(gifData => {
        // gif link location in JSON file
        let gifImg = gifData.data.images.fixed_height_downsampled.url;
        let $gifDiv = $(`<img src=${gifImg}>`).attr('id', 'gif');
        $('#gif').append($gifDiv);
      });

      /////////////
      // WEATHER//
      ///////////

      // convert Kelvin to Farenheit
      const tempConversion = () => {
        let tempF = Math.round(((tempK - 273.15) * 9) / 5 + 32);

        // mold object the way I want
        weatherConditions.temp = tempF;
        weatherConditions.name = data.name;
        delete weatherConditions.icon;
        delete weatherConditions.id;

        // append information to body
        const $city = $('<h2>').text(weatherConditions.name);
        $('#forecast').append($city);
        const $temp = $('<h3>').text(
          `Current temperature: ${weatherConditions.temp}°F`
        );
        $('#forecast').append($temp);
        const $conditions = $('<h3>').text(
          `Current condition: ${weatherConditions.description}`
        );
        $('#forecast').append($conditions);

        // Setting up different css properties for each weather condition
        const weatherWords = [
          'Clear',
          'Rain',
          'Clouds',
          'Hail',
          'Haze',
          'Mist',
          'Thunderstorm',
          'Drizzle',
          'Smoke'
        ];
        if (keyword === weatherWords[0]) {
          $('body').attr('id', 'sunny');
        } else if (keyword === weatherWords[1]) {
          $('body').attr('id', 'rain');
        } else if (keyword === weatherWords[2]) {
          $('body').attr('id', 'cloud');
        } else if (keyword === weatherWords[3]) {
          $('body').attr('id', 'hail');
        } else if (keyword === weatherWords[4]) {
          $('body').attr('id', 'haze');
        } else if (keyword === weatherWords[5]) {
          $('body').attr('id', 'mist');
          $('h1').attr('id', 'mist-h1');
        } else if (keyword === weatherWords[6]) {
          $('body').attr('id', 'thunder');
        } else if (keyword === weatherWords[7]) {
          $('body').attr('id', 'drizzle');
        } else if (keyword === weatherWords[8]) {
          $('body').attr('id', 'smoke');
        } else {
          $('body').attr('id', 'default');
        }
      };
      tempConversion();
    });
  });

  //////////
  //MODAL//
  ////////

  // Made variables for buttons and modal
  const $aboutBtn = $('#about-button');
  const $close = $('#close-modal');
  const $modal = $('#about-modal');

  // Modal shows
  const open = () => {
    $modal.css('display', 'block');
  };

  // Modal hides
  const close = () => {
    $modal.css('display', 'none');
  };

  // Click events
  $aboutBtn.on('click', open);
  $close.on('click', close);
});
7;
