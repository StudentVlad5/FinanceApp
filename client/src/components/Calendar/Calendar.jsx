import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import closeIcon from '../../images/close-button-svgrepo-com.svg';
import './Calendar.scss';
import { BASE_URL } from '../../vendor/constants';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar({ isOpen, onOpen, onClose }) {
  const [currentDate, setCurrentDate] = useState(() => {
    const savedDate = localStorage.getItem('currentDate');
    return savedDate ? new Date(savedDate) : new Date();
  });

  const [monthViewOfTheCalendar, setMonthViewOfTheCalendar] = useState(true);

  const [celebrateDates, setCelebrateDates] = useState([]);

  const [appointments, setAppointments] = useState([]);
  const [appointmentsFromBD, setappointmentsFromBD] = useState();

  const [draggingAppointment, setDraggingAppointment] = useState(null);
  const [draggingOverDate, setDraggingOverDate] = useState(null);

  const [searchAppopintment, setSearchAppopintment] = useState('');

  useEffect(() => {
    fetch(`https://date.nager.at/api/v3/PublicHolidays/${currentDate.getFullYear()}/%2B49`)
      .then((response) => response.json())
      .then((data) => {
        setCelebrateDates(data);
      });
  }, [currentDate.getFullYear()]);

  useEffect(() => {
    if (JSON.stringify(appointments) !== JSON.stringify(appointmentsFromBD))
      fetch(`${BASE_URL}/get`)
        .then((response) => response.json())
        .then((data) => {
          setAppointments(data);
          setappointmentsFromBD(data);
        });
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('currentDate', currentDate);
  }, [currentDate]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const currentMonthIndex = currentDate.getMonth();

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

  const currentYearMonth = `${currentDate.toLocaleString('en-US', {
    month: 'long',
  })} ${currentDate.getFullYear()}`;

  const handleDateChange = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const handleResetClick = () => {
    setCurrentDate(new Date());
  };

  const [selectedAppointment, setSelectedAppointment] = useState({});

  function handleAppointmentClick(appointment) {
    setSelectedAppointment(appointment);
    onOpen();
  }
  const getDayClassName = (date, isCurrentMonth, isToday) => {
    if (!isCurrentMonth || date < 1 || date > daysInMonth) {
      return 'calendar__day_inactive';
    }
    if (isToday) {
      return 'calendar__day_today';
    }
    return '';
  };

  const getDateAppointments = (date) => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.time);
      return (
        appointmentDate.getFullYear() === currentDate.getFullYear() &&
        appointmentDate.getMonth() === currentDate.getMonth() &&
        appointmentDate.getDate() === date
      );
    });
  };

  const handleAddAppointment = async (date) => {
    const appointmentName = window.prompt('Enter appointment name');
    if (appointmentName) {
      const appointment = {
        time: date.toISOString(),
        name: appointmentName,
      };
      try {
        const response = await fetch(`${BASE_URL}/create`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointment),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('data', data);
          });
      } catch (e) {
        console.log('error');
      }
      setAppointments([appointment]);
    }
  };

  const handleDragStart = (appointment) => {
    setDraggingAppointment(appointment);
  };

  const handleDragOver = (event, date) => {
    event.preventDefault();
    setDraggingOverDate(date);
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    if (draggingAppointment && draggingOverDate !== null) {
      try {
        await fetch(`${BASE_URL}/edit/${draggingAppointment._id}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: draggingAppointment.name,
            time: new Date(draggingOverDate).toISOString(),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setAppointments([]);
          });
      } catch (e) {
        console.log('error');
      }
      setDraggingAppointment(null);
      setDraggingOverDate(null);
    }
  };

  const dateBoxes = monthViewOfTheCalendar
    ? Array.from({ length: Math.ceil((daysInMonth + firstDayOfWeek) / 7) }, (_, i) => i).map(
        (week) => (
          <div className='calendar__week' key={week}>
            {Array.from({ length: 7 }, (_, i) => i).map((day) => {
              const date = week * 7 + day + 1 - firstDayOfWeek;
              const isCurrentMonth = currentDate.getMonth() === currentMonthIndex;
              const isToday =
                new Date().toDateString() ===
                new Date(currentDate.getFullYear(), currentMonthIndex, date).toDateString();

              let dateText;
              if (date < 0) {
                dateText = prevMonthLastDay + date;
              } else if (date > daysInMonth + 1) {
                dateText = date - daysInMonth;
              } else if (date === 0) {
                dateText = `${new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
                  .toLocaleString('en-US', {
                    month: 'long',
                  })
                  .slice(0, 3)}  ${prevMonthLastDay + date} `;
              } else if (date === 1) {
                dateText = `${currentDate
                  .toLocaleString('en-US', {
                    month: 'long',
                  })
                  .slice(0, 3)}  ${date} `;
              } else if (date === daysInMonth) {
                dateText = `${currentDate
                  .toLocaleString('en-US', {
                    month: 'long',
                  })
                  .slice(0, 3)}  ${date}`;
              } else if (date === daysInMonth + 1) {
                dateText = `${new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
                  .toLocaleString('en-US', {
                    month: 'long',
                  })
                  .slice(0, 3)}  ${date - daysInMonth}`;
              } else {
                dateText = date;
              }

              return (
                <div
                  className={`calendar__day ${getDayClassName(date, isCurrentMonth, isToday)}`}
                  key={`${week}-${day}`}
                  onDoubleClick={() => {
                    if (isCurrentMonth && date >= 1 && date <= daysInMonth) {
                      const selectedDate = new Date(
                        currentDate.getFullYear(),
                        currentMonthIndex,
                        date,
                      );
                      handleAddAppointment(selectedDate);
                    }
                  }}
                  onDragOver={(event) =>
                    handleDragOver(
                      event,
                      new Date(currentDate.getFullYear(), currentMonthIndex, date),
                    )
                  }
                  onDrop={(event) => {
                    if (isCurrentMonth && date >= 1 && date <= daysInMonth) {
                      handleDrop(event);
                    }
                  }}
                >
                  <div className='calendar__day-number'>{dateText}</div>
                  {celebrateDates.map((celebrate) => {
                    if (
                      celebrate?.date ===
                      new Date(currentDate.getFullYear(), currentMonthIndex, date + 1)
                        .toISOString()
                        .split('T')[0]
                    ) {
                      return (
                        <div key={celebrate.name} className='calendar__appointment celebrate'>
                          {celebrate.name}
                        </div>
                      );
                    }
                  })}
                  {getDateAppointments(date).length !== 0 && (
                    <div>cards: {getDateAppointments(date).length}</div>
                  )}
                  {getDateAppointments(date).map((appointment) => {
                    if (
                      appointment?.name.toLowerCase().includes(searchAppopintment.toLowerCase())
                    ) {
                      return (
                        <div
                          key={appointment._id}
                          className='calendar__appointment'
                          onClick={() => handleAppointmentClick(appointment)}
                          draggable
                          onDragStart={() => handleDragStart(appointment)}
                        >
                          {appointment.name}
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
        ),
      )
    : Array.from({ length: 1 }, () => {
        const currentWeekDates = [];
        const startOfWeek =
          currentDate.getDate() - currentDate.getDay() <= 0
            ? new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() - currentDate.getDay(),
              )
            : new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() - currentDate.getDay(),
              );
        for (let j = 0; j < 7; j += 1) {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + j);
          currentWeekDates.push(date);
        }
        return (
          <div className='calendar__week'>
            {currentWeekDates.map((date, ind) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const isCurrentMonth = date.getMonth() === currentMonthIndex;
              return (
                <div
                  onDoubleClick={() => {
                    if (date && isCurrentMonth) {
                      const selectedDate = new Date(
                        currentDate.getFullYear(),
                        currentMonthIndex,
                        date.getDate(),
                      );
                      handleAddAppointment(selectedDate);
                    }
                  }}
                  key={ind + date}
                  className={`calendar__day ${getDayClassName(
                    date.getDate(),
                    isCurrentMonth,
                    isToday,
                  )}`}
                  onDragOver={(event) => handleDragOver(event, date)}
                  onDrop={(event) => {
                    if (date && isCurrentMonth) {
                      handleDrop(event);
                    }
                  }}
                >
                  <div className='calendar__day-number'>
                    {`${date.getDate()} ${
                      date.getDate() === 1
                        ? new Date(date.getFullYear(), date.getMonth(), 1)
                            .toLocaleString('en-US', {
                              month: 'long',
                            })
                            .slice(0, 3)
                        : ''
                    } ${
                      date.getDate().toString() ===
                      new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate().toString()
                        ? new Date(date.getFullYear(), date.getMonth() + 1, 0)
                            .toLocaleString('en-US', {
                              month: 'long',
                            })
                            .slice(0, 3)
                        : ''
                    }`}
                  </div>
                  {celebrateDates.map((celebrate) => {
                    if (
                      celebrate?.date ===
                      new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
                        .toISOString()
                        .split('T')[0]
                    ) {
                      return (
                        <div key={celebrate.name} className='calendar__appointment celebrate'>
                          {celebrate.name}
                        </div>
                      );
                    }
                  })}
                  {getDateAppointments(date.getDate()).length !== 0 && (
                    <div>cards: {getDateAppointments(date.getDate()).length}</div>
                  )}
                  {getDateAppointments(date.getDate()).map((appointment) => {
                    if (appointment?.name.toLowerCase().includes(searchAppopintment.toLowerCase()))
                      return (
                        <div
                          key={appointment._id}
                          className='calendar__appointment'
                          onClick={() => handleAppointmentClick(appointment)}
                          draggable
                          onDragStart={() => handleDragStart(appointment)}
                        >
                          {appointment.name}
                        </div>
                      );
                  })}
                </div>
              );
            })}
          </div>
        );
      });

  const handleWeekChange = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + increment * 7);
    setCurrentDate(newDate);
  };

  return (
    <div className='calendar'>
      {isOpen ? (
        <Modal
          onClose={onClose}
          appointmentDetails={selectedAppointment}
          setAppointments={setAppointments}
          appointments={appointments}
        />
      ) : (
        ''
      )}
      <div className='calendar__header'>
        <div className='calendar__controls'>
          {monthViewOfTheCalendar ? (
            <>
              <button
                className='calendar__button calendar__button_prev'
                onClick={() => handleDateChange(-1)}
                type='button'
              >
                Prev Month
              </button>
              <button
                className='calendar__button calendar__button_next'
                onClick={() => handleDateChange(1)}
                type='button'
              >
                Next Month
              </button>
            </>
          ) : (
            <>
              <button
                className='calendar__button calendar__button_prev'
                onClick={() => handleWeekChange(-1)}
                type='button'
              >
                Prev Week
              </button>
              <button
                className='calendar__button calendar__button_next'
                onClick={() => handleWeekChange(1)}
                type='button'
              >
                Next Week
              </button>
            </>
          )}
        </div>
        <h1 className='calendar__title'>{currentYearMonth}</h1>
        <div className='calendar__buttonContainer'>
          <button
            className='calendar__button calendar__button_reset'
            onClick={handleResetClick}
            type='button'
          >
            Today
          </button>
          <button
            className={
              monthViewOfTheCalendar
                ? 'calendar__button calendar__button_reset'
                : 'calendar__button calendar__button_reset active'
            }
            onClick={() => setMonthViewOfTheCalendar(false)}
            type='button'
          >
            Week
          </button>
          <button
            className={
              !monthViewOfTheCalendar
                ? 'calendar__button calendar__button_reset'
                : 'calendar__button calendar__button_reset active'
            }
            onClick={() => setMonthViewOfTheCalendar(true)}
            type='button'
          >
            Month
          </button>
        </div>
      </div>
      <div className='calendar__body'>
        <div className='calendar__week'>
          {days.map((day, i) => (
            <div className='calendar__day-name' key={day + i}>
              {day}
            </div>
          ))}
        </div>
        {dateBoxes}
      </div>
      <div className='calendar__search'>
        <span>Search appointment</span>
        <div>
          <input
            type='text'
            value={searchAppopintment}
            onChange={(event) => setSearchAppopintment(event.target.value)}
          />
          <img src={closeIcon} alt='clear search' onClick={() => setSearchAppopintment('')} />
        </div>
      </div>
    </div>
  );
}

Calendar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Calendar;
