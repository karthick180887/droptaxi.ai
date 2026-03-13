import Link from "next/link";
import type { PageData } from "@/lib/types";
import QuoteForm from "@/components/QuoteForm";

interface RoutePageProps {
  data: PageData;
}

export default function RoutePage({ data }: RoutePageProps) {
  const rd = data.routeDetails;

  return (
    <main id="main-content" className="page-main">
      {/* Hero */}
      <section className="page-hero">
        <div className="container" data-reveal>
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumbs">
              {data.breadcrumbs.map((crumb, i) => (
                <li key={i}>
                  {crumb.href ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow">{data.eyebrow}</p>
          <h1>{data.h1}</h1>
          <p className="lead">{data.lead}</p>
        </div>
      </section>

      {/* Route Details Stats */}
      {rd && (
        <section className="section section-tint">
          <div className="container" data-reveal>
            <h2>Route Details</h2>
            <div className="feature-grid stats">
              <article>
                <h3>Distance</h3>
                <p>{rd.distance}</p>
              </article>
              <article>
                <h3>Duration</h3>
                <p>{rd.duration}</p>
              </article>
              {rd.highway && (
                <article>
                  <h3>Highway</h3>
                  <p>{rd.highway}</p>
                </article>
              )}
              {rd.tollEstimate && (
                <article>
                  <h3>Toll Estimate</h3>
                  <p>{rd.tollEstimate}</p>
                </article>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Route Snapshot + CTA */}
      <section className="section">
        <div className="container split" data-reveal>
          <div>
            <h2>{data.sectionTitle || "Route Snapshot"}</h2>
            {data.listItems && data.listItems.length > 0 && (
              <ul className="list-tight">
                {data.listItems.map((item, i) => (
                  <li key={i}>
                    <strong>{item.label}:</strong> {item.value}
                  </li>
                ))}
              </ul>
            )}
            {data.bodyText && <p>{data.bodyText}</p>}
          </div>
          <aside>
            <QuoteForm />
          </aside>
        </div>
      </section>

      {/* Fare Breakdown */}
      {rd?.fareBreakdown && rd.fareBreakdown.length > 0 && (
        <section className="section section-tint">
          <div className="container" data-reveal>
            <h2>Fare Breakdown</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Car Type</th>
                    <th>Fare</th>
                    <th>Per Km</th>
                  </tr>
                </thead>
                <tbody>
                  {rd.fareBreakdown.map((row, i) => (
                    <tr key={i}>
                      <td>{row.carType}</td>
                      <td>{row.fare}</td>
                      <td>{row.perKm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Route Description */}
      {rd?.routeDescription && (
        <section className="section">
          <div className="container" data-reveal>
            <h2>About This Route</h2>
            <p>{rd.routeDescription}</p>
          </div>
        </section>
      )}

      {/* Travel Tips */}
      {rd?.travelTips && rd.travelTips.length > 0 && (
        <section className="section section-tint">
          <div className="container" data-reveal>
            <h2>Travel Tips</h2>
            <ul className="list-tight check-list">
              {rd.travelTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Car Types */}
      {data.carTypes && data.carTypes.length > 0 && (
        <section className="section section-tint">
          <div className="container" data-reveal>
            <h2>Available Car Types</h2>
            <div className="feature-grid">
              {data.carTypes.map((car, i) => (
                <article key={i}>
                  <h3>{car.name}</h3>
                  <p>{car.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="section">
          <div className="container" data-reveal>
            <h2>FAQ: {data.h1}</h2>
            <div className="faq-list">
              {data.faqs.map((faq, i) => (
                <details key={i}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Explore More */}
      {data.relatedLinks && data.relatedLinks.length > 0 && (
        <section className="section section-tint">
          <div className="container" data-reveal>
            <h2>Explore More Pages</h2>
            <div className="landing-grid">
              {data.relatedLinks.map((link, i) => (
                <article className="landing-card" key={i}>
                  <h3>{link.title}</h3>
                  <p>{link.description}</p>
                  <Link href={link.href} className="text-link">
                    Open page
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
