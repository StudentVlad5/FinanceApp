import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';
import bin from '../../images/rubbish-bin-svgrepo-com.svg';
import edit from '../../images/edit-3-svgrepo-com.svg';
import mark from '../../images/check-mark-svgrepo-com.svg';
import greenMark from '../../images/check-mark-svgrepo-com-green.svg';
import { BASE_URL } from '../../vendor/constants';

function Modal({ onClose, appointmentDetails, setAppointments, appointments }) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(appointmentDetails.time).toLocaleString('en-US', options);

  const modalRef = useRef();
  const [statusEdit, setStatusEdit] = useState(false);
  const [nameAppointment, setNameAppointment] = useState(appointmentDetails?.name);

  const handleEditAppointment = async (event) => {
    event.preventDefault();
    setStatusEdit(!statusEdit);
    if (statusEdit) {
      try {
        await fetch(`${BASE_URL}/edit/${appointmentDetails._id}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: nameAppointment, time: appointmentDetails.time }),
        })
          .then((response) => response.json())
          .then((data) => {
            setAppointments([]);
          });
      } catch (e) {
        console.log('error');
      }
    }
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'Enter') {
        handleEditAppointment(e);
      }
    }
    function handleOutsideClick(e) {
      if (!modalRef.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const handleDeleteAppointment = async (event) => {
    event.preventDefault();
    if (appointments) {
      try {
        const response = await fetch(`${BASE_URL}/delete/${appointmentDetails._id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw response;
      } catch (e) {
        console.log('error');
      }
      const newAppointments = [];
      appointments.forEach((item) => {
        if (item._id !== appointmentDetails._id) {
          newAppointments.push(item);
          setAppointments(newAppointments);
        }
        onClose();
      });
    }
  };

  return (
    <div className='modal'>
      <div ref={modalRef} className='modal__content'>
        <h1 className='modal__title'>Appointment</h1>
        <p className='modal__appointment'>
          <span className='modal__bold'>Date: </span>
          {formattedDate}
        </p>
        <p className='modal__appointment'>
          <span className='modal__bold'>Name: </span>
          {statusEdit ? (
            <input
              type='text'
              value={nameAppointment}
              onChange={(event) => setNameAppointment(event.target.value)}
              placeholder='search appointment'
            />
          ) : (
            nameAppointment
          )}
        </p>

        <div className='modal__buttons'>
          <button className='modal__button' type='button' onClick={onClose}>
            Close
          </button>
        </div>
        <button
          type='button'
          className='modal__appointment_delete'
          onClick={(event) => handleDeleteAppointment(event)}
        >
          <img src={bin} alt='delete appointment' />
        </button>
        <button
          type='button'
          className='modal__appointment_edit'
          onClick={(event) => handleEditAppointment(event)}
        >
          {!statusEdit && (
            <img className='modal__appointment_edit' src={edit} alt='edit appointment' />
          )}
          {statusEdit && appointmentDetails?.name === nameAppointment && (
            <img className='modal__appointment_edit' src={mark} alt='edit appointment' />
          )}
          {statusEdit && appointmentDetails?.name !== nameAppointment && (
            <img className='modal__appointment_edit' src={greenMark} alt='edit appointment' />
          )}
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  setAppointments: PropTypes.func.isRequired,
  appointmentDetails: PropTypes.shape({
    time: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Modal;
