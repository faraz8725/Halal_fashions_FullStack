function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent 🚀");
  };

  return (
    <div className="contact-section">
      <h1>Contact Us</h1>

      <div className="contact-container">
        
        {/* Contact Info */}
        <div className="contact-info">
          <p><strong>📍 Address:</strong> Your City, India</p>
          <p><strong>📞 Phone:</strong> +91 9876543210</p>
          <p><strong>📧 Email:</strong> myshop@email.com</p>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;