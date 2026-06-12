import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Deals from "../components/Deals";
import Products from "../components/Products";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Deals />
      <Products />
      <Footer />
      
    </>
  );
}

export default Home;