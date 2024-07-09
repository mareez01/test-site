function displayEventDetails(eventId) {
    fetch(`https://your-backend-api.com/events/${eventId}`)
      .then(response => response.json())
      .then(event => {
        if (event) {
          document.getElementById('edetails').innerHTML = `
            <img src="${event.image}" alt="${event.name}">
            <h1>${event.name}</h1>
            <p>Date: ${event.date}</p>
            <p>Location: ${event.location}</p>
            <p>Description: ${event.description}</p>
          `;
        } else {
          document.getElementById('edetails').innerHTML = '<p>Event not found.</p>';
        }
      })
      .catch(error => console.error('Error fetching event details:', error));
  }
  