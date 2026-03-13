import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>DropTaxi</h3>
          <p>One way taxi and outstation cab service across South India. No return fare charged.</p>
          <p>
            <strong>Serving:</strong> Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana &amp; Puducherry.
          </p>
        </div>
        <div>
          <h3>Services</h3>
          <p><Link href="/one-way-cab-booking">One Way Cab Booking</Link></p>
          <p><Link href="/outstation-cabs">Outstation Cabs</Link></p>
          <p><Link href="/tariff">Tariff &amp; Pricing</Link></p>
          <p><Link href="/book-now">Book Now</Link></p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <p><Link href="/all-routes">All Routes &amp; Fares</Link></p>
          <p><Link href="/cities">Cities We Serve</Link></p>
          <p><Link href="/about-us">About Us</Link></p>
          <p><Link href="/reviews">Customer Reviews</Link></p>
          <p><Link href="/faq">FAQ</Link></p>
          <p><Link href="/blogs">Blog</Link></p>
        </div>
        <div>
          <h3>Popular Routes</h3>
          <p><Link href="/chennai-to-bangalore-taxi">Chennai to Bangalore</Link></p>
          <p><Link href="/bangalore-to-mysore-taxi">Bangalore to Mysore</Link></p>
          <p><Link href="/chennai-to-pondicherry-taxi">Chennai to Pondicherry</Link></p>
          <p><Link href="/hyderabad-to-vijayawada-taxi">Hyderabad to Vijayawada</Link></p>
          <p><Link href="/coimbatore-to-ooty-taxi">Coimbatore to Ooty</Link></p>
          <p><Link href="/madurai-to-chennai-taxi">Madurai to Chennai</Link></p>
        </div>
        <div>
          <h3>Top Cities</h3>
          <p><Link href="/drop-taxi-in-chennai">Drop Taxi Chennai</Link></p>
          <p><Link href="/drop-taxi-in-bangalore">Drop Taxi Bangalore</Link></p>
          <p><Link href="/drop-taxi-in-coimbatore">Drop Taxi Coimbatore</Link></p>
          <p><Link href="/drop-taxi-in-trichy">Drop Taxi Trichy</Link></p>
          <p><Link href="/drop-taxi-madurai">Drop Taxi Madurai</Link></p>
          <p><Link href="/drop-taxi-hyderabad">Drop Taxi Hyderabad</Link></p>
        </div>
        <div>
          <h3>Contact</h3>
          <p><a href="tel:+919994940558">99949 40558</a></p>
          <p><a href="mailto:enquiry@droptaxi.ai">enquiry@droptaxi.ai</a></p>
          <p><a href="https://t.me/droptaxiaibot" target="_blank" rel="noopener noreferrer">Telegram Booking</a></p>
          <p>Open 24x7</p>
          <div style={{ marginTop: "0.75rem" }}>
            <Link href="/contact">Contact Us</Link>
            {" | "}
            <Link href="/privacy-policy-2">Privacy</Link>
            {" | "}
            <Link href="/terms-and-conditions">Terms</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 DropTaxi. All rights reserved. One way taxi service across South India.</p>
      </div>
    </footer>
  );
}
