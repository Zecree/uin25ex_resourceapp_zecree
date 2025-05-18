import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArtistCard from '../components/ArtistCard';
import './EventPage.css';

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);

  useEffect(() => {
    fetch(`/api/events/${id}?apikey=rdlGyF1PkDgSmpwhydzjeCIkjDkAV7GA`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        if (data.name) {
          fetch(`/api/events?keyword=${encodeURIComponent(data.name)}&size=20&apikey=rdlGyF1PkDgSmpwhydzjeCIkjDkAV7GA`)
            .then(res => res.json())
            .then(result => {
              const list = result._embedded?.events?.filter(e => e.id !== data.id) || [];
              setRelatedEvents(list);
            });
        }
      })
      .catch((err) => {
        console.error('Feil ved henting av arrangement:', err);
      });
  }, [id]);

  if (!event) return <p>Fant ikke arrangementet.</p>;

  const image = event.images?.[0]?.url;
  const venue = event._embedded?.venues?.[0]?.name;
  const date = event.dates?.start?.localDate;
  const time = event.dates?.start?.localTime;
  const city = event._embedded?.venues?.[0]?.city?.name;
  const country = event._embedded?.venues?.[0]?.country?.name;
  const genres = event.classifications?.[0]?.genre?.name;
  const segment = event.classifications?.[0]?.segment?.name;
  const promoter = event.promoter?.name;
  const ticketUrl = event.url;
  const artistList = event._embedded?.attractions || [];

  return (
    <div className="event-page">
      <h2>{event.name}</h2>

      <div className="genre-list">
        <strong>Sjanger:</strong> {segment} {genres}
        <p><strong>Dato:</strong> {date} {time}</p>
        <p><strong>Sted:</strong> {venue}, {city}, {country}</p>
        <p><strong>Følg oss på sosiale medier:</strong> {promoter || "Ingen informasjon"}</p>

        {ticketUrl && (
          <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
            <button className="les-mer-btn">Les mer</button>
          </a>
        )}
      </div>

      <h3>Festivalpass:</h3>
      <div className="pass-grid">
        {relatedEvents.map(pass => (
          <div key={pass.id} className="event-card">
            <img src={pass.images?.[0]?.url} alt={pass.name} />
            <h4>{pass.name}</h4>
            <div className='event-info'>
              <p>{pass._embedded?.venues?.[0]?.name}</p>
              <p>{pass.dates?.start?.localDate}</p>
            </div>
            <div className="eventcardbutton">
              <button>Kjøp</button>
              <button>Legg til ønskeliste</button>
            </div>
          </div>
        ))}
      </div>

      <h3>Artister:</h3>
      <div className="artist-grid">
        {artistList.map(artist => (
          <ArtistCard
            key={artist.id}
            name={artist.name}
            image={artist.images?.[0]?.url}
          />
        ))}
      </div>
    </div>
  );
}

export default EventPage;
