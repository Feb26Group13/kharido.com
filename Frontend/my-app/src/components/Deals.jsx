import mobileImg from "../assets/mobile.jpg";
import laptopImg from "../assets/laptop.jpg";
import headphoneImg from "../assets/headphone.jpg";

function Deals() {
  return (
    <section className="section">
      <h2>Today's Deals</h2>

      <div className="cards">
        <div className="card">
             <img src={mobileImg} alt="Mobile" />
          <h3>Smartphone</h3>
          <p>40% OFF</p>
        </div>

        <div className="card">
              <img src={laptopImg} alt="Laptop" />
          <h3>Laptop</h3>
          <p>25% OFF</p>
        </div>

        <div className="card">
                 <img src={headphoneImg} alt="Headphones" />
          <h3>Headphones</h3>
          <p>50% OFF</p>
        </div>
      </div>
    </section>
  );
}

export default Deals;