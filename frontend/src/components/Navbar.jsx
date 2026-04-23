import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav>
      <div className="logo">HALAL FASHIONS</div>

      <ul className={`nav-links ${open ? "active" : ""}`}>
         <li><a onClick={() => scrollToSection("about")}>About</a></li>
        <li><a onClick={() => scrollToSection("services")}>Shop Now</a></li>
        <li><a onClick={() => scrollToSection("services")}>Women</a></li>
        <li><a onClick={() => scrollToSection("services")}>Kids</a></li>
        <li><a onClick={() => scrollToSection("reviews")}>Reviews</a></li>
        
        <li><a onClick={() => scrollToSection("contact")}>Contact</a></li>
      </ul>

      <button className="btn" onClick={() => navigate("/login")}>
        Login
      </button>

      <div className="menu-toggle" onClick={() => setOpen(!open)}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;