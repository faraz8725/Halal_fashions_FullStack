


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // ✅ fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/product")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ separate categories
  const ladies = products.filter((p) => p.category === "ladies");
  const kids = products.filter((p) => p.category === "kids");

  return (
    <div className="services-section">
      <h1>Services Provided By Us</h1>

      {/* 🔥 LADIES */}
      <div className="category-box">
        <h2>For Ladies</h2>
        <div className="image-grid">
          {ladies.map((item) => (
            <div
              className="product-card"
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
            >
              {/* ✅ FIXED HERE */}
              <img src={item.image} alt={item.name} />

              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 KIDS */}
      <div className="category-box">
        <h2>For Girl Kids</h2>
        <div className="image-grid">
          {kids.map((item) => (
            <div
              className="product-card"
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
            >
              {/* ✅ FIXED HERE */}
              <img src={item.image} alt={item.name} />

              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;