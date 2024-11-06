document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservationForm');
    const reservationList = document.getElementById('reservationList');
    const reservations = [];

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const computerId = document.getElementById('computerSelect').value;
        const date = document.getElementById('dateInput').value;
        const time = document.getElementById('timeSelect').value;

        if (isTimeSlotAvailable(computerId, date, time)) {
            const newReservation = { computerId, date, time };
            reservations.push(newReservation);
            addReservationToList(newReservation);
            clearForm();
        } else {
            alert("该时间段已被预约");
        }
    });

    function isTimeSlotAvailable(computerId, date, time) {
        for (const res of reservations) {
            if (res.computerId === computerId && res.date === date) {
                if (time === 'allDay' || res.time === 'allDay') return false;
                if ((res.time === 'morning' && time === 'morning') ||
                    (res.time === 'afternoon' && time === 'afternoon')) return false;
            }
        }
        return true;
    }

    function addReservationToList(reservation) {
        const li = document.createElement('li');
        li.textContent = `计算机${reservation.computerId} - ${reservation.date} - ${reservation.time}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '取消预约';
        deleteButton.onclick = () => {
            cancelReservation(reservation);
            li.remove();
        };
        li.appendChild(deleteButton);
        reservationList.appendChild(li);
    }

    function cancelReservation(reservation) {
        reservations.splice(reservations.indexOf(reservation), 1);
    }

    function clearForm() {
        document.getElementById('dateInput').value = '';
        document.getElementById('timeSelect').value = 'morning';
    }
});