document.addEventListener('DOMContentLoaded', function () {
    const calendarElement = document.getElementById('calendar');
    const contentDetailsElement = document.getElementById('content-details');
    const contentElement = document.getElementById('content');
    const editButton = document.getElementById('editButton');
    const backButton = document.getElementById('backButton');
    const searchInput = document.getElementById('searchInput');

    // Sample data from backend
    const contentData = {
        "2024-01-01": "Content for 2024-01-01",
        "2024-01-05": "Content for 2024-01-05",
        // Add more data as needed
    };

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
                const hasContent = contentData.hasOwnProperty(dateString);

                if (currentDate.getMonth() === month) {
                    if (hasContent) {
                        calendarHTML += `<td class="p-2 cursor-pointer text-blue-500" data-date="${dateString}">${currentDate.getDate()}</td>`;
                    } else {
                        calendarHTML += `<td class="p-2">${currentDate.getDate()}</td>`;
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

        if (contentData.hasOwnProperty(selectedDate)) {
            // Display content details
            contentElement.textContent = contentData[selectedDate];
            contentDetailsElement.classList.remove('hidden');
            editButton.style.display = 'block';
        } else {
            // No content for the selected date
            contentElement.textContent = 'No content for this date.';
            contentDetailsElement.classList.remove('hidden');
            editButton.style.display = 'none';
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
        const filteredContent = Object.entries(contentData)
            .filter(([date, content]) => date.includes(searchQuery) || content.toLowerCase().includes(searchQuery))
            .reduce((obj, [date, content]) => ({ ...obj, [date]: content }), {});

        // Update the calendar with filtered content
        generateCalendar(today.getFullYear(), today.getMonth(), filteredContent);
    });

    // Initial calendar generation
    generateCalendar(today.getFullYear(), today.getMonth());
});
