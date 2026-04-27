

/*
import { useParams } from "react-router-dom";



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

export default ProductDetail;  */


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // ✅ fetch single product
  useEffect(() => {
    fetch(`http://localhost:5000/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  // loading
  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="product-detail">
      <div className="left">
        <img src={product.image} className="main-img" />

        {/* agar future me multiple images aaye */}
        {product.images && (
          <div className="thumbs">
            {product.images.map((img, i) => (
              <img key={i} src={img} alt="" />
            ))}
          </div>
        )}
      </div>

      <div className="right">
        <h2>{product.name}</h2>
        <p className="price">{product.price}</p>
        <p>{product.description}</p>
        <p>Available: {product.stock}</p>
        <p>Sizes: {product.sizes?.join(", ")}</p>
      </div>
    </div>
  );
}

export default ProductDetail;