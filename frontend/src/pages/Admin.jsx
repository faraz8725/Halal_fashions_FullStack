 /*


import { useState } from "react";

function Admin() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    sizes: "",
    category: "ladies",
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    data.append("image", file);

    const res = await fetch("http://localhost:5000/api/product/add", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    console.log(result);
    alert("Product Added");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>

      <input placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Price"
        onChange={(e) => setForm({ ...form, price: e.target.value })} />

      <input placeholder="Stock"
        onChange={(e) => setForm({ ...form, stock: e.target.value })} />

      <input placeholder="Sizes (S,M,L)"
        onChange={(e) => setForm({ ...form, sizes: e.target.value })} />

      <select onChange={(e) => setForm({ ...form, category: e.target.value })}>
        <option value="ladies">Ladies</option>
        <option value="kids">Kids</option>
      </select>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
}

export default Admin; */

import { useEffect, useState } from "react";
import "../App.css";


function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);

  // 🔥 GET ALL PRODUCTS
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/product");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 ADD / UPDATE
  const handleSubmit = async () => {
    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    if (file) data.append("image", file);

    const url = editId
      ? `http://localhost:5000/api/product/${editId}`
      : "http://localhost:5000/api/product/add";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: data,
    });

    alert(editId ? "Updated" : "Added");

    setEditId(null);
    setForm({});
    setFile(null);
    fetchProducts();
  };

  // 🔥 DELETE
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/product/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  // 🔥 EDIT FILL
  const editProduct = (p) => {
    setEditId(p._id);
    setForm({
      name: p.name,
      price: p.price,
      stock: p.stock,
      sizes: p.sizes.join(","),
      category: p.category,
    });
  };

 return (
  <div className="admin-container">
    <h1>Admin Panel</h1>

    {/* FORM */}
    <div className="admin-form">
      <input placeholder="Name"
        value={form.name || ""}
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Price"
        value={form.price || ""}
        onChange={(e) => setForm({ ...form, price: e.target.value })} />

      <input placeholder="Stock"
        value={form.stock || ""}
        onChange={(e) => setForm({ ...form, stock: e.target.value })} />

      <input placeholder="Sizes (S,M,L)"
        value={form.sizes || ""}
        onChange={(e) => setForm({ ...form, sizes: e.target.value })} />

      <select
        value={form.category || "ladies"}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="ladies">Ladies</option>
        <option value="kids">Kids</option>
      </select>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button className="btn-primary" onClick={handleSubmit}>
        {editId ? "Update" : "Add"} Product
      </button>
    </div>

    {/* LIST */}
    <h2>All Products</h2>

    <div className="product-grid">
      {products.map((p) => (
        <div className="product-card-admin" key={p._id}>
          <img
            src={`http://localhost:5000/uploads/${p.image}`}
          />
          <h3>{p.name}</h3>
          <p>{p.price}</p>

          <div className="actions">
            <button onClick={() => editProduct(p)}>Edit</button>
            <button onClick={() => deleteProduct(p._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
  

}

export default Admin;