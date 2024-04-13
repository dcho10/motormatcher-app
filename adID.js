// extract ad ID from the URL
function getAdIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('adId'); 
}

// to submit the inquiry
document.getElementById('inquiryForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
// Prevent the form from submitting normally

// getthe ad ID from the URL
  const adId = getAdIdFromUrl(); 
  const message = document.getElementById('messageInput').value;

  // create inquiry data
  const inquiryData = {
      adId: adId,
      message: message
  };

  // send inquiry to the back-end
  fetch('/inquiry', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(inquiryData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.text();
  })
  .then(data => {
    // log the response from the server
      console.log(data); 
  })
  .catch(error => {
    // error message to the user
      console.error('There was an issue with your fetch:', error);

  });
});
