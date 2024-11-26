import "../css/footer.css";
import Popup from "reactjs-popup";

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="copywright">
          <p>&copy; 2024 CoolFashion.</p>
        </div>
        <div className="contacts">
          <p>
            Phone:{" "}
            <a href="tel:+46 123 456 78">
              <br></br>+46 123 456 78
            </a>
          </p>
          <p>
            Email to:
            <a href="email:coolfashion@gritacademy.se">
              <br></br>
              coolfashion@gritacademy.se
            </a>
          </p>
        </div>
        <div className="location">
          <h3>Our Location</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.359035032362!2d13.00241111609665!3d55.59837588050644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a2772b064eeb%3A0x92c32cbcb4ddce96!2zRsOkbmdwYXJrZW4gTWFsbsOlLCDQkdCw0LHQsNC90LXRgdGC0LLQsA!5e0!3m2!1sen!2sse!4v1694792733543!5m2!1sen!2sse"></iframe>
        </div>

        <Popup
          trigger={<button className="contact-form-button">Contact Us</button>}
          modal
          closeOnDocumentClick
        >
          {(close) => (
            <div className="popup">
              <h3>Contact Us</h3>
              <form className="popup-form">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email address"
                  required
                />

                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  placeholder="Your message"
                  required
                ></textarea>
                <div className="form-buttons">
                  <button className="popup-form-send" type="submit">
                    Send
                  </button>
                  <button
                    className="popup-form-close"
                    type="button"
                    onClick={close}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          )}
        </Popup>
        <div className="signup">
          <h3>Stay Updated</h3>
          <form action="submit-newsletter.php" method="POST">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </footer>
    </>
  );
}
