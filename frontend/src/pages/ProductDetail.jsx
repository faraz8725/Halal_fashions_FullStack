/*import { useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    images: ["/image1.jpg", "/image2.jpg", "/image3.jpg"],
    name: "Floral Suit",
    price: "₹999",
    description: "Beautiful floral suit for all occasions.",
    stock: 10,
  },
];

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id == id);

  return (
    <div className="product-detail">
      <div className="left">
        <img src={product.images[0]} className="main-img" />

        <div className="thumbs">
          {product.images.map((img, i) => (
            <img key={i} src={img} />
          ))}
        </div>
      </div>

      <div className="right">
        <h2>{product.name}</h2>
        <p className="price">{product.price}</p>
        <p>{product.description}</p>
        <p>Available: {product.stock} pieces</p>

        <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail;  */


import { useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    images: ["/Presentation.png", "/Presentation.png"],
    name: "Floral Suit",
    price: "₹999",
    description: "Beautiful floral suit",
    stock: 10,
  },
];

function ProductDetail() {
  const { id } = useParams();

  // ⚠️ convert id to number (IMPORTANT)
  const product = products.find((p) => p.id === Number(id));

  // ✅ safety check
  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product Not Found 🚫</h2>;
  }

  return (
    <div className="product-detail">
      <div className="left">
        <img src={product.images[0]} className="main-img" />

        <div className="thumbs">
          {product.images.map((img, i) => (
            <img key={i} src={img} alt="" />
          ))}
        </div>
      </div>

      <div className="right">
        <h2>{product.name}</h2>
        <p className="price">{product.price}</p>
        <p>{product.description}</p>
        <p>Available: {product.stock}</p>
      </div>
    </div>
  );
}

export default ProductDetail;