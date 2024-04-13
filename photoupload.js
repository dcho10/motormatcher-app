// Prevent the form from submitting normally
document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

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
        // Log the response from the server
        console.log(data); 
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
});