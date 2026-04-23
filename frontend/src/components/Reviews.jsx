function Reviews() {
  const reviews = [
    {
      text: "Amazing quality! Loved the fabric and fitting.",
      name: "Riya Sharma",
    },
    {
      text: "Very सुंदर dress 😍 totally worth the price!",
      name: "Anjali Verma",
    },
    {
      text: "Fast delivery and great customer service.",
      name: "Pooja Singh",
    },
  ];

  return (
    <div className="reviews-section">
      <h1>Customer Reviews</h1>

      <div className="reviews-container">
        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <p>"{r.text}"</p>
            <h4>- {r.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;