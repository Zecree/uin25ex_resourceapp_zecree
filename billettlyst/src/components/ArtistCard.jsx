import './ArtistCard.css';

function ArtistCard({ name, image }) {
  return (
    <div className="artist-card">
      <img src={image} alt={name} />
      <p>{name}</p>
    </div>
  );
}

export default ArtistCard;