import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilterSearch from "../components/FilterSearch";
import EventCard from "../components/EventCard";
import ArtistCard from "../components/ArtistCard";
import "./CategoryPage.css";

function CategoryPage() {
  const { slug } = useParams();
  const [events, setEvents] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    country: "",
    city: "",
    query: "",
  });

  const segmentMap = {
    musikk: "Music",
    sport: "Sports",
    teater: "Arts & Theatre",
  };

  const segmentName = segmentMap[slug.toLowerCase()] || "Music";

  const fetchEvents = (extra = "") => {
    fetch(`/api/events?segmentName=${encodeURIComponent(segmentName)}&size=50${extra}&apikey=rdlGyF1PkDgSmpwhydzjeCIkjDkAV7GA`)
      .then((res) => res.json())
      .then((data) => {
        const results = data._embedded?.events || [];
        setEvents(results);

        const allAttractions = results.flatMap((e) => e._embedded?.attractions || []);
        const uniqueAttractions = Array.from(new Map(allAttractions.map((item) => [item.id, item])).values());
        setAttractions(uniqueAttractions);
      })
      .catch((err) => {
        console.error("Feil ved henting av arrangementer:", err);
      });
  };

  useEffect(() => {
    fetchEvents("&countryCode=NO");
  }, [slug]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    let query = "";
    if (filters.date) query += `&startDateTime=${filters.date}T00:00:00Z`;
    if (filters.country) query += `&countryCode=${filters.country}`;
    if (filters.city) query += `&city=${filters.city}`;
    fetchEvents(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filters.query.trim()) {
      fetchEvents(`&keyword=${encodeURIComponent(filters.query.trim())}`);
    }
  };

  return (
    <div className="category-page">
      <h1>{slug.charAt(0).toUpperCase() + slug.slice(1)}</h1>

      <FilterSearch
        filters={filters}
        onChange={handleFilterChange}
        onFilter={handleFilterSubmit}
        onSearch={handleSearchSubmit}
      />

      <h2>Attraksjoner</h2>
      {attractions.length === 0 ? (
        <p>Ingen attraksjoner funnet.</p>
      ) : (
        <div className="artist-grid">
          {attractions.map((artist) => (
            <ArtistCard
              key={artist.id}
              name={artist.name}
              image={artist.images?.[0]?.url}
            />
          ))}
        </div>
      )}

      <h2>Arrangementer</h2>
      {events.length === 0 ? (
        <p>Ingen arrangementer funnet.</p>
      ) : (
        <div className="category-grid">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              name={event.name}
              image={event.images?.[0]?.url}
              date={event.dates?.start?.localDate}
              time={event.dates?.start?.localTime}
              venue={event._embedded?.venues?.[0]?.name}
              country={event._embedded?.venues?.[0]?.country?.name}
              artist={event._embedded?.attractions?.[0]?.name}
              showLink={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
