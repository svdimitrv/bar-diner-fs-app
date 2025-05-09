import React, { useState } from "react";
import axios from "axios";
import '../styles/ReservationForm.scss'
import ContentWrapper from "./ContentWrapper";
import '../types/ReservationItem';
import { ReservationItem } from "../types/ReservationItem";

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState<ReservationItem>({
    date: "",
    time: "",
    partySize: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation submitted:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5043/api/reservations",
        formData
      );

      if (response.data.success) {
        alert("Reservation successful!");
        setFormData({
          date: "",
          time: "",
          partySize: "",
          name: "",
          email: "",
          phone: "",
        });
      }
    } catch (error: any) {
      console.error("Reservation failed:", error);
      alert("There was a problem with your reservation.");
    }
  };

  return (
    <ContentWrapper>
      <div className="reservation-container">
        <h1>RESERVATIONS</h1>
        <p>
          Book a table for your <strong className="barra-text ">BARRA</strong>{" "}
          experience.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <select
              name="partySize"
              value={formData.partySize}
              onChange={handleChange}
              required
            >
              <option value="">Select party size</option>
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">RESERVE</button>
        </form>
      </div>
    </ContentWrapper>
  );
};

export default ReservationForm;
