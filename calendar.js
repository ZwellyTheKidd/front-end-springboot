document.addEventListener('DOMContentLoaded', function () {
    const calendarElement = document.getElementById('calendar');
  
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
          if (currentDate.getMonth() === month) {
            calendarHTML += `<td class="p-2">${currentDate.getDate()}</td>`;
          } else {
            calendarHTML += '<td></td>';
          }
  
          currentDate.setDate(currentDate.getDate() + 1);
        }
        calendarHTML += '</tr>';
      }
  
      calendarHTML += '</tbody></table>';
  
      calendarElement.innerHTML = calendarHTML;
    }
  
    // Initial calendar generation
    generateCalendar(today.getFullYear(), today.getMonth());
  });
  