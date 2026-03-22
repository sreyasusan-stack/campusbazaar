import products from "../../data/products";
import ProductCard from "../../components/ProductCard";
import "./ProductList.css";

function ProductList() {
  return (
    <div className="product-page">

      <div className="product-header">
        <h2>All Products</h2>
        <p>Browse campus products from student sellers</p>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

    </div>
  );
}

export default ProductList;
