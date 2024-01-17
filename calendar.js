document.addEventListener('DOMContentLoaded', function () {
    const calendarElement = document.getElementById('calendar');
    const contentDetailsElement = document.getElementById('content-details');
    const contentElement = document.getElementById('content');
    const editButton = document.getElementById('editButton');
    const backButton = document.getElementById('backButton');
    const createContentButton = document.getElementById('createContentButton');
    const backToCalendarButton = document.getElementById('backToCalendarButton');
    const searchInput = document.getElementById('searchInput');
    const createContentElement = document.getElementById('create-content');

    // Sample data from backend
    const contentData = [
        {
            id: 1,
            title: "Content for 2024-01-01",
            desc: "Description for 2024-01-01",
            status: "ACTIVE",
            contentType: "TYPE_A",
            dateCreated: "2024-01-04T12:00:00",
            dateUpdated: "2024-01-01T14:30:00",
            url: "https://example.com/content/1"
        },
        {
            id: 2,
            title: "Content for 2024-01-05",
            desc: "Description for 2024-01-05",
            status: "INACTIVE",
            contentType: "TYPE_B",
            dateCreated: "2024-01-05T10:00:00",
            dateUpdated: "2024-01-05T16:45:00",
            url: "https://example.com/content/2"
        },
        // Add more content objects as needed
    ];

    // Get the current date
    const today = new Date();

    // Function to generate a calendar for the given month and year
    function generateCalendar(year, month) {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);

        let calendarHTML = '<table class="table-auto">';
        calendarHTML += '<thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead>';
        calendarHTML += '<tbody>';

        let currentDate = startDate;

        while (currentDate <= endDate) {
            calendarHTML += '<tr>';
            for (let i = 0; i < 7; i++) {
                const dateString = currentDate.toISOString().split('T')[0];
                const contentForDate = contentData.find(content => content.dateCreated.split('T')[0] === dateString);

                if (currentDate.getMonth() === month) {
                    if (contentForDate) {
                        calendarHTML += `<td class="p-2 cursor-pointer text-blue-500" data-date="${dateString}">${currentDate.getDate()}</td>`;
                    } else {
                        calendarHTML += `<td class="p-2 cursor-pointer text-red-500" data-date="${dateString}">${currentDate.getDate()}</td>`;
                    }
                } else {
                    calendarHTML += '<td></td>';
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }
            calendarHTML += '</tr>';
        }

        calendarHTML += '</tbody></table>';

        calendarElement.innerHTML = calendarHTML;

        // Add click event listener for date cells
        const dateCells = document.querySelectorAll('[data-date]');
        dateCells.forEach(cell => {
            cell.addEventListener('click', handleDateClick);
        });
    }

    // Function to handle date cell click
    function handleDateClick(event) {
        const selectedDate = event.target.getAttribute('data-date');
        const contentForDate = contentData.find(content => content.dateCreated.split('T')[0] === selectedDate);

        if (contentForDate) {
            // Display content details
            contentElement.innerHTML = `
                <h3>${contentForDate.title}</h3>
                <p>${contentForDate.desc}</p>
                <p>Status: ${contentForDate.status}</p>
                <p>Type: ${contentForDate.contentType}</p>
                <p>Date Created: ${contentForDate.dateCreated}</p>
                <p>Date Updated: ${contentForDate.dateUpdated}</p>
                <p>URL: <a href="${contentForDate.url}" target="_blank">${contentForDate.url}</a></p>
            `;
            contentDetailsElement.classList.remove('hidden');
            editButton.style.display = 'block';
            createContentElement.classList.add('hidden');
        } else {
            // No content for the selected date
            contentDetailsElement.classList.add('hidden');
            createContentElement.classList.remove('hidden');
        }
    }

    // Back button click event
    backButton.addEventListener('click', function () {
        contentDetailsElement.classList.add('hidden');
    });

    // Search input event listener
    searchInput.addEventListener('input', function () {
        const searchQuery = searchInput.value.toLowerCase();

        // Filter content based on search query
        const filteredContent = contentData.filter(content =>
            content.title.toLowerCase().includes(searchQuery) ||
            content.desc.toLowerCase().includes(searchQuery) ||
            content.status.toLowerCase().includes(searchQuery)
        );

        // Update the calendar with filtered content
        generateCalendar(today.getFullYear(), today.getMonth());
    });

    // Initial calendar generation
    generateCalendar(today.getFullYear(), today.getMonth());
});
