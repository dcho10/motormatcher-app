document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  let formData = new FormData();
  formData.append('photo', document.getElementById('photoInput').files[0]);

  fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); // Log the response from the server
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
});