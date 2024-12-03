import "../css/footer.css";
import Popup from "reactjs-popup";

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="copywright">
          <p>&copy; 2024 CoolFashion.</p>
        </div>
        <div className="Kontakt">
          <p>
            Telefon:{" "}
            <a href="tel:+46 123 456 78">
              <br></br>+46 123 456 78
            </a>
          </p>
          <p>
            Email:
            <a href="email:coolfashion@gritacademy.se">
              <br></br>
              coolfashion@gritacademy.se
            </a>
          </p>
        </div>
        <div className="location">
          <h3>Hitta oss</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.359035032362!2d13.00241111609665!3d55.59837588050644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a2772b064eeb%3A0x92c32cbcb4ddce96!2zRsOkbmdwYXJrZW4gTWFsbsOlLCDQkdCw0LHQsNC90LXRgdGC0LLQsA!5e0!3m2!1sen!2sse!4v1694792733543!5m2!1sen!2sse"></iframe>
        </div>

        <Popup
          trigger={<button className="contact-form-button">Kontakt</button>}
          modal
          closeOnDocumentClick
        >
          {(close) => (
            <div className="popup">
              <h3>Kontakta oss</h3>
              <form className="popup-form">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Din email"
                  required
                />

                <label htmlFor="message">Meddelande:</label>
                <textarea
                  id="message"
                  placeholder="Ditt meddelande"
                  required
                ></textarea>
                <div className="form-buttons">
                  <button className="popup-form-send" type="submit">
                    Skicka
                  </button>
                  <button
                    className="popup-form-close"
                    type="button"
                    onClick={close}
                  >
                    Stäng
                  </button>
                </div>
              </form>
            </div>
          )}
        </Popup>
        <div className="signup">
          <h3>Håll dig uppdaterad</h3>
          <form action="submit-newsletter.php" method="POST">
            <input
              type="email"
              name="email"
              placeholder="In med din email HÄR"
              required
            />
            <button type="submit">Prenumerera</button>
          </form>
        </div>
      </footer>
    </>
  );
}
