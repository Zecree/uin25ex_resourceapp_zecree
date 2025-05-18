import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StaticEventCard from "../components/StaticEventCard";
import "./Home.css";

function Home() {
  const [events, setEvents] = useState([]);
  const [cityEvents, setCityEvents] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Oslo");

  const allowedCities = {
    Oslo: "NO",
    Stockholm: "SE",
    Berlin: "DE",
    London: "GB",
    Paris: "FR",
  };

  useEffect(() => {
    fetch("/api/events?keyword=festival&size=120&apikey=rdlGyF1PkDgSmpwhydzjeCIkjDkAV7GA")
      .then((res) => res.json())
      .then((data) => {
        const allEvents = data._embedded?.events || [];

        const filtered = allEvents.filter((event) => {
          const city = event._embedded?.venues?.[0]?.city?.name;
          const country = event._embedded?.venues?.[0]?.country?.countryCode;
          return Object.keys(allowedCities).includes(city) && allowedCities[city] === country;
        });

        setEvents(filtered);
      })
      .catch((err) => console.error("Feil ved henting av festivaler:", err));
  }, []);

  useEffect(() => {
    const country = allowedCities[selectedCity];
    const city = selectedCity;

    fetch(`/api/events?city=${city}&countryCode=${country}&size=10&apikey=rdlGyF1PkDgSmpwhydzjeCIkjDkAV7GA`)
      .then((res) => res.json())
      .then((data) => {
        const result = data._embedded?.events || [];
        setCityEvents(result);
      })
      .catch((err) => console.error("Feil ved henting av by-arrangementer:", err));
  }, [selectedCity]);

  return (
    <div className="home-container">
      <h1>Sommerens festivaler!</h1>
      <div className="festival-grid">
        {events.slice(0, 4).map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.images?.[0]?.url} alt={event.name} />
            <h3>{event.name}</h3>
            <Link to={`/event/${event.id}`}>
              <button>Les mer om {event.name}</button>
            </Link>
          </div>
        ))}
      </div>

      <h2>Hva skjer i verdens storbyer!</h2>
      <div className="city-buttons">
        {Object.keys(allowedCities).map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={selectedCity === city ? "active" : ""}
          >
            {city}
          </button>
        ))}
      </div>

      <h2>I {selectedCity} kan du oppleve:</h2>
      {cityEvents.length === 0 ? (
        <p>Ingen arrangementer funnet i {selectedCity}.</p>
      ) : (
        <div className="event-grid">
          {cityEvents.map((event) => (
            <StaticEventCard
              key={event.id}
              name={event.name}
              image={event.images?.[0]?.url}
              date={event.dates?.start?.localDate}
              time={event.dates?.start?.localTime}
              city={event._embedded?.venues?.[0]?.city?.name}
              country={event._embedded?.venues?.[0]?.country?.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
