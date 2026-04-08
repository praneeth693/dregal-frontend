import "./Carousel.css";

function Carousel() {
  return (
    <div className="carousel">

      
      <input type="radio" name="slide" id="slide1" defaultChecked />
      <input type="radio" name="slide" id="slide2" />
      <input type="radio" name="slide" id="slide3" />

      <div className="slides">

        <div className="slide">
          <img src="/images/banner1.jpg" alt="Banner1" />
          <div className="overlay">
            <h2>Launching Premium Phones</h2>
            <p>Elevate your everyday brand</p>
            <button>SHOP NOW</button>
          </div>
        </div>

        <div className="slide">
          <img src="/images/banner2.jpg" alt="Banner2" />
          <div className="overlay">
            <h2>Fresh Spring Collection</h2>
            <p>Trendy & Comfortable</p>
            <button>EXPLORE</button>
          </div>
        </div>

        <div className="slide">
          <img src="/images/banner3.jpg" alt="Banner3" />
          <div className="overlay">
            <h2>Flat 50% Off</h2>
            <p>Limited Time Offer</p>
            <button>GRAB NOW</button>
          </div>
        </div>

      </div>

      {/* Dots */}
      <div className="navigation">
        <label htmlFor="slide1" className="dot"></label>
        <label htmlFor="slide2" className="dot"></label>
        <label htmlFor="slide3" className="dot"></label>
      </div>

    </div>
  );
}

export default Carousel;


