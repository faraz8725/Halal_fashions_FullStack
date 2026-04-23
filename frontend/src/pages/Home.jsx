import Navbar from "../components/Navbar";
import About from "../components/About";
import Services from "../components/Services";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";

function Home() {
  return (
    <>
      <Navbar />

      <div className="video-container">
        <video autoPlay muted loop>
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      <section id="about"><About /></section>
      <section id="services"><Services /></section>
      <section id="reviews"><Reviews /></section>
      <section id="contact"><Contact /></section>
    </>
  );
}

export default Home;