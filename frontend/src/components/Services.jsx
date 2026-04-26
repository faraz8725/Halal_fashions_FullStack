


/*import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();

  // 🔥 DATA (saara ek jagah organized)
  const categories = [
    {
      title: "For Ladies",
      items: [
        {
          id: 1,
          images: ["/Presentation.png", "/image2.jpg", "/image3.jpg"],
          name: "Floral Suit",
          price: "₹999",
          description: "Beautiful floral printed suit for daily wear.",
          stock: 10,
        },
        {
          id: 2,
          images: ["/image2.jpg", "/image1.jpg"],
          name: "Party Wear Suit",
          price: "₹1499",
          description: "Perfect party wear with elegant design.",
          stock: 5,
        },
        {
          id: 3,
          images: ["/image3.jpg"],
          name: "Casual Kurti",
          price: "₹799",
          description: "Comfortable daily wear kurti.",
          stock: 8,
        },
      ],
    },
    {
      title: "For Girl Kids",
      items: [
        {
          id: 4,
          images: ["/image4.jpg", "/image5.jpg"],
          name: "Kids Frock",
          price: "₹599",
          description: "Cute frock for kids.",
          stock: 12,
        },
        {
          id: 5,
          images: ["/image5.jpg"],
          name: "Party Dress",
          price: "₹899",
          description: "Stylish party dress for kids.",
          stock: 6,
        },
        {
          id: 6,
          images: ["/image6.jpg"],
          name: "Summer Wear",
          price: "₹499",
          description: "Light and comfortable summer wear.",
          stock: 15,
        },
      ],
    },
  ];

  return (
    <div className="services-section">
      <h1>Services Provided By Us</h1>

      {/* 🔥 LOOP CATEGORY *}
      {categories.map((category, index) => (
        <div className="category-box" key={index}>
          <h2>{category.title}</h2>

          <div className="image-grid">
            {category.items.map((item) => (
              <div
                className="product-card"
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.images[0]} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Services; */


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
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
              />
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
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
              />
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