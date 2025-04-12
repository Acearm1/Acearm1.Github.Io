document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('https://4iyafc4vcj.execute-api.us-east-2.amazonaws.com/dev/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) { // Check for HTTP errors (4xx or 5xx)
            return response.json().then(errorData => { // Try to parse error response as JSON
                const errorMessage = errorData.error || `HTTP error ${response.status}`;
                throw new Error(errorMessage); // Throw a more specific error
            }).catch(() => { // If parsing fails, use a generic error
                throw new Error(`HTTP error ${response.status}`);
            });
        }
        return response.json(); // Parse JSON for successful responses
    })
    .then(responseData => {
        if (responseData.message) {
            document.getElementById('responseMessage').textContent = responseData.message;
            document.getElementById('contactForm').reset();
        } else if (responseData.error) {
            document.getElementById('responseMessage').textContent = responseData.error;
        } else {
            document.getElementById('responseMessage').textContent = 'Thank you for reaching out!'; // Default success message
        }
    })
    .catch(error => {
        console.error('Error Sending message:', error);
        document.getElementById('responseMessage').textContent = error.message || 'Failed to send message. Please try again later.';
    });
});