import Link from "next/link";
import type { PageData } from "@/lib/types";
import QuoteForm from "@/components/QuoteForm";

interface CityPageProps {
  data: PageData;
}

export default function CityPage({ data }: CityPageProps) {
  const cd = data.cityDetails;

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

      {/* Booking Highlights + CTA */}
      <section className="section">
        <div className="container split" data-reveal>
          <div>
            <h2>{data.sectionTitle || "Booking Highlights"}</h2>
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

      {/* City Description */}
      {cd?.cityDescription && (
        <section className="section section-tint">
          <div className="container" data-reveal>
            <h2>About Drop Taxi in This City</h2>
            <p>{cd.cityDescription}</p>
          </div>
        </section>
      )}

      {/* Popular Routes */}
      {cd?.popularRoutes && cd.popularRoutes.length > 0 && (
        <section className="section">
          <div className="container" data-reveal>
            <h2>Popular Routes</h2>
            <div className="feature-grid">
              {cd.popularRoutes.map((route, i) => (
                <article key={i}>
                  <h3>
                    <Link href={route.href} className="text-link">
                      {route.name}
                    </Link>
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pickup Points */}
      {cd?.pickupPoints && cd.pickupPoints.length > 0 && (
        <section className="section section-tint">
          <div className="container" data-reveal>
            <h2>Pickup Points</h2>
            <ul className="list-tight check-list">
              {cd.pickupPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="section">
          <div className="container" data-reveal>
            <h2>Frequently Asked Questions</h2>
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
            <h2>Related Route Pages</h2>
            <div className="landing-grid">
              {data.relatedLinks.map((link, i) => (
                <article className="landing-card" key={i}>
                  <h3>{link.title}</h3>
                  <p>{link.description}</p>
                  <Link href={link.href} className="text-link">
                    Open route
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
