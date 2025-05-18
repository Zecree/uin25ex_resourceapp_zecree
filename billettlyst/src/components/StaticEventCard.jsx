import React from "react";
import "./StaticEventCard.css";

function StaticEventCard({ name, image, date, time, city, country }) {
  return (
    <div className="static-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{date}</p>
      <p>{time}</p>
      <p>{city}, {country}</p>
    </div>
  );
}

export default StaticEventCard;
