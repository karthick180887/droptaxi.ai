import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { TRUST_BADGES, SITE_URL } from "@/lib/constants";

const homepageSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "DropTaxi",
    url: SITE_URL,
    logo: `${SITE_URL}/images/og-cover.png`,
    telephone: "+919994940558",
    email: "enquiry@droptaxi.ai",
    description:
      "One way intercity taxi service across South India with transparent fares and 24x7 support.",
    foundingDate: "2020",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+919994940558",
      contactType: "customer service",
      availableLanguage: ["English", "Tamil", "Hindi"],
      areaServed: "IN",
    },
    sameAs: ["https://wa.me/919994940558", "https://t.me/droptaxiaibot"],
  },
  {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `${SITE_URL}/#taxiservice`,
    name: "DropTaxi",
    url: SITE_URL,
    image: `${SITE_URL}/images/og-cover.png`,
    description:
      "One way intercity taxi service across South India with transparent fares and 24x7 support.",
    telephone: "+919994940558",
    email: "enquiry@droptaxi.ai",
    areaServed: [
      "Tamil Nadu",
      "Karnataka",
      "Kerala",
      "Andhra Pradesh",
      "Telangana",
      "Puducherry",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "INR 11/km onwards",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      ratingCount: "10000",
    },
    sameAs: ["https://wa.me/919994940558", "https://t.me/droptaxiaibot"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "DropTaxi",
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  },
];

export default function Home() {
  return (
    <>
      <Header />
      {homepageSchema.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main id="main-content">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-bg"></div>
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">One Way Taxi Across South India</p>
              <h1>Fast, Safe, and Affordable Intercity Cabs Without Return Fare</h1>
              <p className="lead">
                Book one way cabs from Chennai, Bengaluru, Hyderabad, Kochi, Coimbatore, Madurai, and 100+ cities.
                Clean cars, verified drivers, and transparent pricing.
              </p>
              <div className="hero-cta">
                <a className="btn btn-primary" href="tel:+919994940558">Call 99949 40558</a>
                <Link className="btn btn-ghost" href="/routes">View Popular Routes</Link>
              </div>
              <div className="trust-badges">
                {TRUST_BADGES.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
            </div>
            <aside data-reveal>
              <QuoteForm />
            </aside>
          </div>
        </section>

        {/* Hero Banner */}
        <section className="hero-banner" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-highway.png"
            alt="DropTaxi sedan driving on scenic South Indian highway at golden hour"
            width={1200}
            height={500}
            loading="eager"
          />
          <div className="hero-banner-overlay">
            <p className="hero-banner-text">Trusted by 10,000+ travellers across South India</p>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="section">
          <div className="container" data-reveal>
            <h2>Popular One Way Taxi Routes</h2>
            <p className="section-intro">High-demand routes with competitive pricing across South India.</p>
            <div className="route-grid">
              {[
                { title: "Chennai to Bengaluru Taxi", fare: "4,799", slug: "chennai-to-bangalore-taxi" },
                { title: "Bengaluru to Mysuru Taxi", fare: "2,299", slug: "bangalore-to-mysore-taxi" },
                { title: "Coimbatore to Chennai Taxi", fare: "5,699", slug: "coimbatore-to-chennai-taxi" },
                { title: "Hyderabad to Vijayawada Taxi", fare: "4,299", slug: "hyderabad-to-vijayawada-taxi" },
                { title: "Madurai to Chennai Taxi", fare: "5,299", slug: "madurai-to-chennai-taxi" },
                { title: "Chennai to Pondicherry Taxi", fare: "2,099", slug: "chennai-to-pondicherry-taxi" },
              ].map((route) => (
                <Link key={route.slug} href={`/${route.slug}`} className="route-card" style={{ textDecoration: "none" }}>
                  <h3>{route.title}</h3>
                  <p>Starts from INR {route.fare}</p>
                </Link>
              ))}
            </div>
            <Link className="text-link" href="/all-routes">See full route list and fare guide</Link>
          </div>
        </section>

        {/* Most Booked Pages */}
        <section className="section section-tint">
          <div className="container" data-reveal>
            <h2>Most Booked Route and City Pages</h2>
            <p className="section-intro">
              Built using real search demand for one way taxi and drop taxi queries in India.
            </p>
            <div className="landing-grid">
              {[
                { title: "Drop Taxi in Chennai", desc: "High-intent city booking page for Chennai one way cabs.", href: "/drop-taxi-in-chennai" },
                { title: "Drop Taxi in Coimbatore", desc: "Targeted for Coimbatore outstation and intercity rides.", href: "/drop-taxi-in-coimbatore" },
                { title: "Drop Taxi in Trichy", desc: "Dedicated page for Trichy one way taxi bookings.", href: "/drop-taxi-in-trichy" },
                { title: "Chennai to Pondicherry Taxi", desc: "Popular weekend and airport route with fixed one way fare.", href: "/chennai-to-pondicherry-taxi" },
                { title: "Bangalore to Chennai Taxi", desc: "High-volume intercity business and family travel route page.", href: "/bangalore-to-chennai-taxi" },
                { title: "Hyderabad to Vijayawada Taxi", desc: "Key AP-Telangana one way cab route with quick confirmations.", href: "/hyderabad-to-vijayawada-taxi" },
                { title: "One Way Cab Booking", desc: "Central booking page for one way and outstation taxi queries.", href: "/one-way-cab-booking" },
                { title: "All Route Pages", desc: "Explore 20 additional SEO route pages created from live demand.", href: "/all-routes" },
              ].map((card) => (
                <article key={card.href} className="landing-card">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <Link href={card.href}>Open page</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Fleet & Service Gallery */}
        <section className="section">
          <div className="container" data-reveal>
            <h2>Our Fleet &amp; Service</h2>
            <p className="section-intro">Clean, well-maintained vehicles with professional drivers across South India.</p>
            <div className="trust-gallery">
              <figure className="trust-gallery-item trust-gallery-large">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/fleet-showcase.png" alt="DropTaxi fleet — Mini, Sedan, Etios, SUV, Innova and Innova Crysta vehicles" width={600} height={400} loading="lazy" />
                <figcaption>Our Fleet — Mini, Sedan, Etios, SUV, Innova &amp; Innova Crysta</figcaption>
              </figure>
              <figure className="trust-gallery-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/car-interior.png" alt="Clean taxi interior with comfortable seats" width={400} height={300} loading="lazy" />
                <figcaption>Spotless Interiors</figcaption>
              </figure>
              <figure className="trust-gallery-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/driver-professional.png" alt="Professional DropTaxi driver in uniform" width={400} height={300} loading="lazy" />
                <figcaption>Verified Professional Drivers</figcaption>
              </figure>
              <figure className="trust-gallery-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/happy-customers.png" alt="Happy family with luggage beside DropTaxi cab" width={400} height={300} loading="lazy" />
                <figcaption>Happy Travellers</figcaption>
              </figure>
              <figure className="trust-gallery-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/airport-pickup.png" alt="DropTaxi driver at airport arrivals with name board" width={400} height={300} loading="lazy" />
                <figcaption>Airport Pickup Service</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Why DropTaxi */}
        <section className="section section-tint">
          <div className="container" data-reveal>
            <h2>Why DropTaxi Works Better for One Way Travel</h2>
            <div className="feature-grid">
              <article>
                <h3>Transparent Pricing</h3>
                <p>Fair per-km pricing with no hidden extras. You pay for the drop route, not return distance.</p>
              </article>
              <article>
                <h3>Intercity Specialists</h3>
                <p>Dedicated one way taxi operations across highways and city corridors in South India.</p>
              </article>
              <article>
                <h3>Fleet for Every Need</h3>
                <p>Choose from Mini, Sedan, Etios, SUV, Innova, and Innova Crysta based on passengers and luggage.</p>
              </article>
              <article>
                <h3>On-Time Pickups</h3>
                <p>Route planning and live tracking reduce delays for airport drops, business trips, and family travel.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Service Coverage */}
        <section className="section">
          <div className="container split" data-reveal>
            <div>
              <h2>Service Coverage Across South India</h2>
              <p>
                We handle one way outstation taxi bookings between major South Indian cities, airports, business hubs,
                and tourist destinations.
              </p>
              <ul className="check-list">
                <li>Tamil Nadu: Chennai, Coimbatore, Madurai, Trichy, Salem, Tirunelveli</li>
                <li>Karnataka: Bengaluru, Mysuru, Mangaluru, Hubballi, Belagavi</li>
                <li>Kerala: Kochi, Trivandrum, Kozhikode, Thrissur, Kannur</li>
                <li>Andhra Pradesh: Vijayawada, Visakhapatnam, Tirupati, Nellore</li>
                <li>Telangana: Hyderabad, Warangal, Khammam, Karimnagar</li>
                <li>Puducherry: Puducherry City and nearby route pickups</li>
              </ul>
              <Link className="btn btn-ghost" href="/cities">Explore all cities we serve</Link>
            </div>
            <div className="stat-card">
              <h3>What Customers Value</h3>
              <div className="stats">
                <p><strong>10,000+</strong> Completed Trips</p>
                <p><strong>100+</strong> City Connections</p>
                <p><strong>24x7</strong> Dispatch Support</p>
                <p><strong>4.8/5</strong> Average Service Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* How Booking Works */}
        <section className="section section-tint">
          <div className="container" data-reveal>
            <h2>How Booking Works</h2>
            <div className="steps">
              <article><span>1</span><h3>Share Your Route</h3><p>Send pickup, drop, and date via our form or Telegram.</p></article>
              <article><span>2</span><h3>Get Final Fare</h3><p>Receive clear fare with vehicle options and inclusions.</p></article>
              <article><span>3</span><h3>Confirm in Minutes</h3><p>Pay advance, receive driver details, and travel stress-free.</p></article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container" data-reveal>
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <details>
                <summary>Do you charge return fare for one way taxi?</summary>
                <p>No. Our pricing is optimized for one way drops. Toll, parking, and state tax are added only when applicable.</p>
              </details>
              <details>
                <summary>Can I pre-book for airport or railway station drop?</summary>
                <p>Yes. We recommend booking at least 4-12 hours early for guaranteed availability.</p>
              </details>
              <details>
                <summary>Which payment methods are accepted?</summary>
                <p>UPI, bank transfer, and cash options are available depending on booking type.</p>
              </details>
              <details>
                <summary>Is the fare fixed after confirmation?</summary>
                <p>Yes. Confirmed bookings have fixed fare except extra waiting time or route changes requested by customer.</p>
              </details>
              <details>
                <summary>What is your one way taxi price per km?</summary>
                <p>One way fares vary by route and car type. Share pickup and drop points to get exact final pricing in minutes.</p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="cta-band">
          <div className="container cta-inner" data-reveal>
            <h2>Need a one way taxi today?</h2>
            <p>Talk to our dispatch team and lock your fare now.</p>
            <div className="cta-actions">
              <a className="btn btn-primary" href="tel:+919994940558">Call Now</a>
              <a className="btn btn-ghost" href="https://t.me/droptaxiaibot" target="_blank" rel="noopener noreferrer">Telegram Booking</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
