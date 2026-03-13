import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | DropTaxi",
  description: "The page you are looking for does not exist. Browse our one way taxi routes and city pages.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="page-main">
      <section className="section" style={{ textAlign: "center", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="container">
          <p className="eyebrow">404</p>
          <h1>Page Not Found</h1>
          <p className="lead" style={{ maxWidth: "40ch", margin: "0 auto 2rem" }}>
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="cta-actions" style={{ justifyContent: "center" }}>
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link href="/all-routes" className="btn btn-ghost">
              View All Routes
            </Link>
          </div>
          <nav style={{ marginTop: "2rem" }} aria-label="Helpful links">
            <p>
              <Link href="/cities">Cities We Serve</Link>
              {" | "}
              <Link href="/contact">Contact Us</Link>
              {" | "}
              <Link href="/faq">FAQ</Link>
            </p>
          </nav>
        </div>
      </section>
    </main>
  );
}
