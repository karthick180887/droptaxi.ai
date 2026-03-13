"use client";
import { useState, useCallback, type FormEvent } from "react";
import PlacesAutocomplete from "./PlacesAutocomplete";

function formatTimeToAMPM(time24: string): string {
  const [hoursStr, minutes] = time24.split(":");
  let hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

export default function QuoteForm() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [carType, setCarType] = useState("Sedan");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onPickupChange = useCallback((val: string) => setPickup(val), []);
  const onDropChange = useCallback((val: string) => setDrop(val), []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup,
          drop,
          date,
          time: time ? formatTimeToAMPM(time) : "Not specified",
          carType,
          phone,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        setPickup("");
        setDrop("");
        setDate("");
        setTime("");
        setCarType("Sedan");
        setPhone("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="quote-card">
        <h2>Booking Received!</h2>
        <p style={{ margin: "1.5rem 0", lineHeight: 1.6 }}>
          Our team will call you shortly to confirm your trip and fare.
        </p>
        <button
          className="btn btn-primary btn-full"
          onClick={() => setStatus("idle")}
        >
          Book Another Trip
        </button>
      </div>
    );
  }

  return (
    <div className="quote-card">
      <h2>Get Instant Quote</h2>
      <form className="quote-form" onSubmit={handleSubmit}>
        <label htmlFor="pickup">Pickup City</label>
        <PlacesAutocomplete
          id="pickup"
          placeholder="e.g. Chennai"
          value={pickup}
          onChange={onPickupChange}
          required
        />

        <label htmlFor="drop">Drop City</label>
        <PlacesAutocomplete
          id="drop"
          placeholder="e.g. Bangalore"
          value={drop}
          onChange={onDropChange}
          required
        />

        <label htmlFor="date">Travel Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="time">Pickup Time</label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <label htmlFor="carType">Car Type</label>
        <select
          id="carType"
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
        >
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Innova Crysta">Innova Crysta</option>
        </select>

        <label htmlFor="phone">Your Phone</label>
        <div className="phone-input-group">
          <span className="phone-prefix">+91</span>
          <input
            id="phone"
            type="tel"
            placeholder="98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9 ]/g, ""))}
            pattern="[0-9 ]{10,12}"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          style={{ marginTop: "1rem" }}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Get Instant Quote"}
        </button>
        {status === "error" && (
          <p style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "0.5rem" }}>
            Something went wrong. Please call us at 99949 40558.
          </p>
        )}
      </form>
      <p className="form-note">
        We respond within minutes. No spam, no hidden charges.
      </p>
    </div>
  );
}
