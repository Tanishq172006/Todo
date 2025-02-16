const monthYear = document.getElementById("monthYear");
        const calendarGrid = document.getElementById("calendarGrid");

        let currentDate = new Date();

        function renderCalendar(date) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            monthYear.textContent = `${date.toLocaleString("default", { month: "long" })} ${year}`;
            calendarGrid.innerHTML = "";

            // Add empty slots for days before the 1st of the month
            for (let i = 0; i < firstDayOfMonth; i++) {
                calendarGrid.innerHTML += `<div></div>`;
            }

            // Add days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const isToday =
                    day === currentDate.getDate() &&
                    month === currentDate.getMonth() &&
                    year === currentDate.getFullYear();

                calendarGrid.innerHTML += `<div class="${isToday ? "today" : ""}">${day}</div>`;
            }
        }

        function prevMonth() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        }

        function nextMonth() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        }

        renderCalendar(currentDate);