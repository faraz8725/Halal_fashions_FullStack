
function Services() {
  const ladies = [
    { img: "/image1.jpg", name: "Floral Suit", price: "₹999" },
    { img: "/image2.jpg", name: "Party Wear Suit", price: "₹1499" },
    { img: "/image3.jpg", name: "Casual Kurti", price: "₹799" },
  ];

  const kids = [
    { img: "/image4.jpg", name: "Kids Frock", price: "₹599" },
    { img: "/image5.jpg", name: "Party Dress", price: "₹899" },
    { img: "/image6.jpg", name: "Summer Wear", price: "₹499" },
  ];

  return (
    <div className="services-section">
      <h1>Services Provided By Us</h1>

      {/* Ladies Section */}
      <div className="category-box">
        <h2>For Ladies</h2>
        <div className="image-grid">
          {ladies.map((item, i) => (
            <div className="product-card" key={i}>
              <img src={item.img} alt="" />
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Kids Section */}
      <div className="category-box">
        <h2>For Girl Kids</h2>
        <div className="image-grid">
          {kids.map((item, i) => (
            <div className="product-card" key={i}>
              <img src={item.img} alt="" />
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


