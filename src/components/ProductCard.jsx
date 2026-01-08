import './ProductCard.css';

function ProductCard({ image, name }) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={image} alt={name} />
      </div>

      <p className="product-name">{name}</p>
    </div>
  );
}

export default ProductCard;

