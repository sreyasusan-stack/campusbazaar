import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import TopsellerCard from '../components/TopsellerCard';
import './Home.css';

function Home() {
  return (
    <>
      <Navbar />

      <section className="home-section hero">
  <h1 style={{ fontSize: '42px', lineHeight: '1.3' }}>
    Your Campus, Your <br />
    Marketplace, Your Creation.
  </h1>
</section>

<section className="home-section top-sellers-section">
  <h2 className="side-title">TOP <br/> SELLERS</h2>

<div className="card-row-wrapper">
  <div className="card-row">
    <TopsellerCard name="Madah Crochet Store" />
    <TopsellerCard name="Little Crafts" />
    <TopsellerCard name="Candle By" />
    <TopsellerCard name="ThriftCorner" />
  </div>
  </div>
</section>



      
<section>
  <h2>Popular Products</h2>

  <div className="card-row">
    
    <ProductCard image="https://media.istockphoto.com/id/2177207434/photo/autumn-candlelight-still-life-indoors.jpg?s=612x612&w=is&k=20&c=rhbh1IEzekOU5RSJdNrxYiVyLYafK1lxuAsGG1F8Log="
    name="Candles" />
    <ProductCard image="https://media.istockphoto.com/id/2238812607/photo/crochet-bunny-ballerina-in-pink-dress.jpg?s=612x612&w=is&k=20&c=DstLfaVYtdkbkBRKT3yKRPJAAoTbXBYe5j37xmBbSeY=" 
    name="Crochet Bunny" />
    <ProductCard image="https://images.pexels.com/photos/8105118/pexels-photo-8105118.jpeg" 
     name="Jewellery"/>
    <ProductCard image="https://www.decordoers.in/cdn/shop/files/Untitleddesign-2025-04-18T172850.723.jpg?v=1744978146&width=493" 
    name="Mugs"/>
  </div>
</section>
    </>
  );
}

export default Home;
