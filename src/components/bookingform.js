// BookingForm.js
import React, { useEffect, useState } from "react";
import { IconCar, IconInfoCircleFilled, IconX } from "@tabler/icons-react";
import { IconMapPinFilled } from "@tabler/icons-react";
import { IconCalendarEvent } from "@tabler/icons-react";

function BookingForm() {
  const [modal, setModal] = useState(false);
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handlePickTime = (e) => {
    setPickTime(e.target.value);
  };

  const handleDropTime = (e) => {
    setDropTime(e.target.value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (pickTime === "") {
      errorMsg.style.display = "flex";
    } else {
      setModal(!modal);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv.scroll(0, 0);
      errorMsg.style.display = "none";
    }
  };

  useEffect(() => {
    if (modal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  const confirmBooking = async (e) => {
    e.preventDefault();

    const bookingData = {
      pickTime,
      dropTime,
      firstname,
      lastName,
      phone,
      email,
    };

    try {
      const response = await fetch("http://localhost:8080/saveBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        window.location.href = '/success-page'; // Redirect to success page
      } else {
        console.error("Error saving booking data");
      }
    } catch (error) {
      console.error("Error saving booking data:", error);
    }
  };

  return (
    <>
      <section id="booking-section" className="book-section">
        <form className="box-form">
          <div className="box-form__car-type">
            <label>
              <IconCar className="input-icon" /> &nbsp; Select Your Car Type <b>*</b>
            </label>
            <input
              id="picktime"
              value={pickTime}
              onChange={handlePickTime}
              type="date"
            ></input>
          </div>

          <div className="box-form__car-time">
            <label htmlFor="droptime">
              <IconCalendarEvent className="input-icon" /> &nbsp; Drop-off <b>*</b>
            </label>
            <input
              id="droptime"
              value={dropTime}
              onChange={handleDropTime}
              type="date"
            ></input>
          </div>

          <button onClick={openModal} type="submit">
            Search
          </button>
        </form>
      </section>

      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        <div className="booking-modal__title">
          <h2>Complete Reservation</h2>
          <IconX onClick={openModal} />
        </div>

        <div className="booking-modal__message">
          <h4>
            <IconInfoCircleFilled /> Upon completing this reservation enquiry,
            you will receive:
          </h4>
          <p>
            Your voucher to produce on arrival at the desk .
          </p>
        </div>

        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h5>Location & Date</h5>
              <span>
                <IconMapPinFilled />
                <div>
                  <h6>Pick-Up Date & Time</h6>
                  <p>
                    {pickTime} /{" "}
                    <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>
              <span>
                <label>
                  First Name <b>*</b>
                </label>
                <input
                  value={firstname}
                  onChange={handleFirstName}
                  type="text"
                  placeholder="Enter your first name"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>
              <span>
                <label>
                  Last Name <b>*</b>
                </label>
                <input
                  value={lastName}
                  onChange={handleLastName}
                  type="text"
                  placeholder="Enter your last name"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
              <span>
                <label>
                  Phone Number <b>*</b>
                </label>
                <input
                  value={phone}
                  onChange={handlePhone}
                  type="tel"
                  placeholder="Enter your phone number"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>
            <div className="info-form__1col">
              <span>
                <label>
                  Email <b>*</b>
                </label>
                <input
                  value={email}
                  onChange={handleEmail}
                  type="email"
                  placeholder="Enter your email address"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>
              <div className="reserve-button">
                <button onClick={confirmBooking}>Reserve Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingForm;
