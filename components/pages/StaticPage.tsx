import Link from "next/link";
import type { PageData } from "@/lib/types";
import QuoteForm from "@/components/QuoteForm";

interface StaticPageProps {
  data: PageData;
}

const BOOKING_SLUGS = ["book-now", "contact"];

export default function StaticPage({ data }: StaticPageProps) {
  const showForm = BOOKING_SLUGS.includes(data.slug);

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

      {/* Content */}
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
          {showForm ? (
            <aside>
              <QuoteForm />
            </aside>
          ) : (
            <aside className="stat-card">
              <h3>{data.ctaTitle || "Confirm Your Booking"}</h3>
              <p>
                {data.ctaDescription ||
                  "Our team shares exact fare and confirms your trip quickly."}
              </p>
              <div className="cta-actions">
                <a
                  className="btn btn-primary"
                  href="https://t.me/droptaxiaibot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram Booking
                </a>
                <a className="btn btn-ghost" href="tel:+919994940558">
                  Call 99949 40558
                </a>
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* Content Sections */}
      {data.contentSections && data.contentSections.length > 0 &&
        data.contentSections.map((section, i) => (
          <section
            key={i}
            className={i % 2 === 0 ? "section section-tint" : "section"}
          >
            <div className="container" data-reveal>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          </section>
        ))}

      {/* FAQ */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="section section-tint">
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
        <section className="section">
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
