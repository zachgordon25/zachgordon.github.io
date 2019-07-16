$(() => {
  let zipCode = '94040';
  let countryCode = 'us';
  let endpoint = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=27191dbc29ccfde300356183b803d41f`;
  $.ajax({ url: endpoint }).then(data => {
    console.log(data);
  });
  // const handleData = () => {
  //   console.log(endpoint);
  // };
});
