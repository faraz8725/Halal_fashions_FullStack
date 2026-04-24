function Admin() {
  const [file, setFile] = useState(null);

  const uploadImage = async () => {
    const form = new FormData();
    form.append("image", file);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: form,
    });

    const data = await res.json();
    return data.url;
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}