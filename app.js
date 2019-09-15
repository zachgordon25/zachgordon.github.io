$(() => {
  window.jQuery ? console.log('linked') : console.log('not linked');
  // Made variables for buttons and modal
  const $contactBtn = $('#contact-button');
  const $close = $('#close-modal');
  const $modal = $('#contact-modal');

  // Modal shows
  const open = () => {
    $modal.css('display', 'block');
  };

  // Modal hides
  const close = () => {
    $modal.css('display', 'none');
  };

  // Click events
  $contactBtn.on('click', open);
  $close.on('click', close);
});
