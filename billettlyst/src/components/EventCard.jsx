import "./EventCard.css";

function EventCard({ name, image, date, time, venue, country, artists }) {
  return (
    <div className="event-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{date}</p>
      <p>{time}</p>
      <p>{venue}</p>
      <p>{country}</p>
      {artists && artists.length > 0 && (
        <p className="artist-names">Med: {artists.join(", ")}</p>
      )}
    </div>
  );
}

export default EventCard;