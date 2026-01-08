import './TopsellerCard.css';

function TopsellerCard({ name }) {
  return (
    <div className="top-seller-card">
      <div className="top-seller-avatar"></div>
      <p>{name}</p>
    </div>
  );
}

export default TopsellerCard;



