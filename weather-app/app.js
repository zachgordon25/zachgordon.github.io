$(() => {
  let zipCode = '94040';
  let countryCode = 'us';
  let endpoint = `api.openweathermap.org/data/2.5/forecast/hourly?zip=${zipCode},${countryCode}&APPID=27191dbc29ccfde300356183b803d41f`;
  $.ajax({ url: endpoint });
  console.log(endpoint);
  // const handleData = () => {
  //   console.log(endpoint);
  // };
});
