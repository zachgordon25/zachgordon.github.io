$(() => {
  // let date = new Date();
  // console.log(date);

  $('form').on('click', '#submit', event => {
    event.preventDefault();
    $('#forecast').empty();
    $('#gif').empty();
    let $zip = $('#zip-code');
    let zipCode = $zip.val();
    let weatherEndpoint = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&APPID=27191dbc29ccfde300356183b803d41f`;

    $.ajax({ url: weatherEndpoint }).then(data => {
      let weatherConditions = data.weather[0];
      let tempK = data.main.temp;
      console.log(`%c ${weatherEndpoint}`, 'color: green');

      // GIF searchword
      let keyword = data.weather[0].main;
      console.log(`%c ${keyword}`, 'color: red');

      // Using main weather term to search for a gif
      let gifEndpoint = `https://api.giphy.com/v1/gifs/translate?api_key=lutoU47bgWimQRM7XenOl702O4MDlPGG&s=${keyword}`;
      // let gifEndpoint = `https://api.giphy.com/v1/gifs/search?api_key=lutoU47bgWimQRM7XenOl702O4MDlPGG&q=${keyword}&limit=25&offset=0&rating=R&lang=en`;
      console.log(`%c ${gifEndpoint}`, 'color: yellow');
      $.ajax({ url: gifEndpoint }).then(gifData => {
        // let gifImg = gifData.data[0].images.fixed_height_downsampled.url;

        // gif link location in JSON file
        let gifImg = gifData.data.images.fixed_height_downsampled.url;
        console.log(`%c ${gifImg}`, 'color: blue');
        // console.log(gifData);
        let $gifDiv = $(`<img src=${gifImg}>`).attr('id', 'gif');
        let $gifTag = $(
          '<img id="badge" src="img/Poweredby_100px-White_VertLogo.png" />'
        );
        $('#gif').append($gifDiv);
        $('#gif').append($gifTag);
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
        console.log(weatherConditions);

        // append information to body
        // $('#forecast').append(date);
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
        // console.log($city);

        // Setting up different backgrounds for each weather condition
        const weatherWords = [
          'Clear',
          'Rain',
          'Clouds',
          'Hail',
          'Haze',
          'Mist',
          'Thunderstorm'
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
        } else if (keyword === weatherWords[6]) {
          $('body').attr('id', 'thunder');
        } else {
          $('body').attr('id', 'default');
        }
      };
      tempConversion();
    });
  });
  // Made variables for buttuns and modal
  const $aboutBtn = $('#about');
  const $close = $('#close');
  const $modal = $('#modal');

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
