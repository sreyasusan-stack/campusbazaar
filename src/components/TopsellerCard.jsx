/*import './TopsellerCard.css';

function TopsellerCard({ name }) {
  return (
    <div className="top-seller-card">
      <div className="top-seller-avatar"></div>
      <p>{name}</p>
    </div>
  );
}

export default TopsellerCard;

*/

import './TopsellerCard.css';

function TopsellerCard({ name, image }) {
  return (
    <div className="top-seller-card">
      {image
        ? <img className="top-seller-image" src={image} alt={name} />
        : <div className="top-seller-avatar" />
      }
      <p>{name}</p>
    </div>
  );
}

export default TopsellerCard;

