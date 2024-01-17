// fetch('http://localhost:8080/api/content')
// .then(Response => Response.json())
// .then(data => console.log(data));







// Mock data for demonstration
const calendarData = [
  { date: '2024-01-17', content: 'Lorem ipsum dolor sit amet.' },
  { date: '2024-01-18', content: null },
  // Add more data as needed
];

const calendarContainer = document.getElementById('calendar');
const contentDisplay = document.getElementById('contentDisplay');
const noContentMessage = document.getElementById('noContentMessage');
const contentDetails = document.getElementById('contentDetails');
const editButton = document.getElementById('editButton');
const createContentLink = document.getElementById('createContentLink');
const searchForm = document.getElementById('searchForm');

// Initialize calendar using your preferred calendar library (e.g., FullCalendar)
// You can replace this with your actual calendar implementation

// For example, using FullCalendar:
const calendar = new FullCalendar.Calendar(calendarContainer, {
  events: calendarData.map(item => ({ date: item.date, content: item.content })),
  dateClick: handleDateClick,
});

calendar.render();

function handleDateClick(info) {
  const selectedDate = info.dateStr;
  const selectedData = calendarData.find(item => item.date === selectedDate);

  if (selectedData && selectedData.content) {
    // Display content
    contentDetails.textContent = selectedData.content;
    editButton.addEventListener('click', () => {
      // Handle edit button click
      // You can redirect to an edit page or show a modal for editing
      alert('Edit button clicked');
    });

    contentDisplay.classList.remove('hidden');
    noContentMessage.classList.add('hidden');
  } else {
    // No content available
    contentDisplay.classList.add('hidden');
    noContentMessage.classList.remove('hidden');

    createContentLink.addEventListener('click', () => {
      // Handle create content link click
      // You can redirect to a create content page or show a modal for creating content
      alert('Create content link clicked');
    });
  }
}

// Search form submission
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchId = document.getElementById('searchId').value;
  const searchStatus = document.getElementById('searchStatus').value;
  const searchDescription = document.getElementById('searchDescription').value;

  // Implement search functionality using the provided search parameters
  // You can make an API request to your Spring Boot backend to retrieve search results
  // Update the calendar or show search results as needed
  alert(`Searching with ID: ${searchId}, Status: ${searchStatus}, Description: ${searchDescription}`);
});
