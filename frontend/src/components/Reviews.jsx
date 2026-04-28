import { useEffect, useState } from "react";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", text: "" });
  const [loading, setLoading] = useState(false);

  // ✅ fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/review");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ✅ submit review
  const handleSubmit = async () => {
    if (!form.name || !form.text) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/review/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert("Failed to submit review");
        return;
      }

      setForm({ name: "", text: "" });
      fetchReviews();
    } catch (err) {
      console.error("Error submitting review:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reviews-section">
      <h1>Customer Reviews</h1>

      <div className="reviews-wrapper">
        
        {/* LEFT SIDE → REVIEWS */}
        <div className="reviews-container">
          {reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            reviews.map((r) => (
              <div className="review-card" key={r._id}>
                <p>"{r.text}"</p>
                <h4>- {r.name}</h4>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE → FORM */}
        <div className="review-form">
          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <textarea
            placeholder="Write your review..."
            value={form.text}
            onChange={(e) =>
              setForm({ ...form, text: e.target.value })
            }
          />

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Reviews;