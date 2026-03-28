import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import TopsellerCard from '../components/TopsellerCard';
import { supabase } from "../supabaseClient";
import './Home.css';

function Home() {
  const [topProducts, setTopProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetchTopProducts();
    fetchPopularProducts();
  }, []);

  async function fetchTopProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .limit(4);
    if (error) console.error(error);
    else setTopProducts(data);
  }

  async function fetchPopularProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .range(4, 7);  // gets products 5-8 so different from top section
    if (error) console.error(error);
    else setPopularProducts(data);
  }

  return (
    <div className="home">
      <Navbar />

      {/* HERO */}
      <section className="home-section hero">
        <h1 style={{ fontSize: '42px', lineHeight: '1.3' }}>
          Your Campus, Your <br />
          Marketplace, Your Creation.
        </h1>
      </section>

      {/* TOP SELLERS */}
      <section className="home-section top-sellers-section">
        <h2 className="side-title">TOP <br /> SELLERS</h2>
        <div className="card-row-wrapper">
          <div className="card-row">
            {topProducts.map(product => (
              <TopsellerCard
                key={product.id}
                name={product.name}
                image={product.image_urls}
              />
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="popular-products">
        <h2 className="popular-title">Popular Products</h2>
        <Link to="/buyer/products">
          <button className="view-all-btn">View All Products</button>
        </Link>
        <div className="card-row" style={{ marginTop: "24px" }}>
          {popularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;