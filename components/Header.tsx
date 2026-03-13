"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const closeAll = useCallback(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeAll]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    setOpenDropdown(null);
  };

  const handleTriggerClick = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleMouseEnter = (name: string) => {
    if (window.innerWidth <= 760) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setOpenDropdown(name);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 760) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/" aria-label="DropTaxi Home">
          <span className="brand-mark" aria-hidden="true">DT</span>
          <span>DropTaxi</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-nav"
          onClick={handleToggle}
        >
          Menu
        </button>

        <nav
          id="site-nav"
          ref={navRef}
          className={`site-nav mega-nav${isOpen ? " is-open" : ""}`}
          aria-label="Primary"
        >
          <Link href="/">Home</Link>

          {/* ── Routes Dropdown ── */}
          <div
            className={`mega-dropdown${openDropdown === "routes" ? " is-open" : ""}`}
            onMouseEnter={() => handleMouseEnter("routes")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="mega-trigger"
              aria-expanded={openDropdown === "routes"}
              onClick={() => handleTriggerClick("routes")}
            >
              Routes <span className="chevron">&#9662;</span>
            </button>
            <div className="mega-panel">
              <div className="mega-panel-inner">
                <div className="mega-col">
                  <h4>From Chennai</h4>
                  <Link href="/chennai-to-bangalore-taxi">Chennai &rarr; Bangalore</Link>
                  <Link href="/chennai-to-coimbatore-taxi">Chennai &rarr; Coimbatore</Link>
                  <Link href="/chennai-to-madurai-taxi">Chennai &rarr; Madurai</Link>
                  <Link href="/chennai-to-trichy-taxi">Chennai &rarr; Trichy</Link>
                  <Link href="/chennai-to-pondicherry-taxi">Chennai &rarr; Pondicherry</Link>
                  <Link href="/chennai-to-tirupati-taxi">Chennai &rarr; Tirupati</Link>
                  <Link href="/chennai-to-vellore-taxi">Chennai &rarr; Vellore</Link>
                  <Link href="/chennai-to-salem-taxi">Chennai &rarr; Salem</Link>
                  <Link href="/chennai-to-kodaikanal-taxi">Chennai &rarr; Kodaikanal</Link>
                  <Link href="/chennai-to-rameshwaram-taxi">Chennai &rarr; Rameshwaram</Link>
                  <Link href="/chennai-to-kumbakonam-taxi">Chennai &rarr; Kumbakonam</Link>
                  <Link href="/chennai-to-tirunelveli-taxi">Chennai &rarr; Tirunelveli</Link>
                  <Link href="/chennai-to-velankanni-taxi">Chennai &rarr; Velankanni</Link>
                  <Link href="/chennai-to-tiruvannamalai-taxi">Chennai &rarr; Thiruvannamalai</Link>
                  <Link href="/chennai-to-cuddalore-taxi">Chennai &rarr; Cuddalore</Link>
                  <Link href="/chennai-to-kanchipuram-taxi">Chennai &rarr; Kanchipuram</Link>
                  <Link href="/chennai-to-mahabalipuram-taxi">Chennai &rarr; Mahabalipuram</Link>
                  <Link href="/chennai-to-neyveli-taxi">Chennai &rarr; Neyveli</Link>
                  <Link href="/chennai-to-karaikudi-taxi">Chennai &rarr; Karaikudi</Link>
                  <Link href="/chennai-to-ranipet-taxi">Chennai &rarr; Ranipet</Link>
                </div>
                <div className="mega-col">
                  <h4>From Bangalore</h4>
                  <Link href="/bangalore-to-chennai-taxi">Bangalore &rarr; Chennai</Link>
                  <Link href="/bangalore-to-mysore-taxi">Bangalore &rarr; Mysore</Link>
                  <Link href="/bangalore-to-coimbatore-taxi">Bangalore &rarr; Coimbatore</Link>
                  <Link href="/bangalore-to-hyderabad-taxi">Bangalore &rarr; Hyderabad</Link>
                  <Link href="/bangalore-to-ooty-taxi">Bangalore &rarr; Ooty</Link>
                  <Link href="/bangalore-to-tirupati-taxi">Bangalore &rarr; Tirupati</Link>
                  <Link href="/bangalore-to-madurai-taxi">Bangalore &rarr; Madurai</Link>
                  <Link href="/bangalore-to-pondicherry-taxi">Bangalore &rarr; Pondicherry</Link>
                  <Link href="/bangalore-to-kodaikanal-taxi">Bangalore &rarr; Kodaikanal</Link>
                  <Link href="/bangalore-to-mangalore-taxi">Bangalore &rarr; Mangalore</Link>
                  <Link href="/bangalore-to-coorg-taxi">Bangalore &rarr; Coorg</Link>
                  <Link href="/bangalore-to-hosur-taxi">Bangalore &rarr; Hosur</Link>
                  <Link href="/bangalore-to-vellore-taxi">Bangalore &rarr; Vellore</Link>
                  <Link href="/bangalore-to-trichy-taxi">Bangalore &rarr; Trichy</Link>
                  <Link href="/bangalore-to-hampi-taxi">Bangalore &rarr; Hampi</Link>
                  <Link href="/bangalore-to-chikmagalur-taxi">Bangalore &rarr; Chikmagalur</Link>
                  <Link href="/bangalore-to-wayanad-taxi">Bangalore &rarr; Wayanad</Link>
                  <Link href="/bangalore-to-munnar-cab">Bangalore &rarr; Munnar</Link>
                  <Link href="/bangalore-to-rameshwaram-taxi">Bangalore &rarr; Rameshwaram</Link>
                </div>
                <div className="mega-col">
                  <h4>From Madurai</h4>
                  <Link href="/madurai-to-chennai-taxi">Madurai &rarr; Chennai</Link>
                  <Link href="/madurai-to-bangalore-taxi">Madurai &rarr; Bangalore</Link>
                  <Link href="/madurai-to-coimbatore-taxi">Madurai &rarr; Coimbatore</Link>
                  <Link href="/madurai-to-trichy-taxi">Madurai &rarr; Trichy</Link>
                  <Link href="/madurai-to-kodaikanal-taxi">Madurai &rarr; Kodaikanal</Link>
                  <Link href="/madurai-to-rameswaram-taxi">Madurai &rarr; Rameswaram</Link>
                  <Link href="/madurai-to-pondicherry-taxi">Madurai &rarr; Pondicherry</Link>
                  <Link href="/madurai-to-salem-taxi">Madurai &rarr; Salem</Link>
                  <Link href="/madurai-to-tiruvannamalai-taxi">Madurai &rarr; Thiruvannamalai</Link>
                  <Link href="/madurai-to-vellore-taxi">Madurai &rarr; Vellore</Link>
                  <h4>From Coimbatore</h4>
                  <Link href="/coimbatore-to-chennai-taxi">Coimbatore &rarr; Chennai</Link>
                  <Link href="/coimbatore-to-ooty-taxi">Coimbatore &rarr; Ooty</Link>
                  <Link href="/coimbatore-to-madurai-taxi">Coimbatore &rarr; Madurai</Link>
                  <Link href="/coimbatore-to-munnar-taxi">Coimbatore &rarr; Munnar</Link>
                  <Link href="/coimbatore-to-kodaikanal-cab">Coimbatore &rarr; Kodaikanal</Link>
                  <Link href="/coimbatore-to-palakkad-taxi">Coimbatore &rarr; Palakkad</Link>
                  <Link href="/coimbatore-to-salem-taxi">Coimbatore &rarr; Salem</Link>
                  <Link href="/coimbatore-to-coonoor-taxi">Coimbatore &rarr; Coonoor</Link>
                </div>
                <div className="mega-col">
                  <h4>From Salem</h4>
                  <Link href="/salem-to-chennai-taxi">Salem &rarr; Chennai</Link>
                  <Link href="/salem-to-coimbatore-taxi">Salem &rarr; Coimbatore</Link>
                  <Link href="/salem-to-madurai-taxi">Salem &rarr; Madurai</Link>
                  <Link href="/salem-to-trichy-taxi">Salem &rarr; Trichy</Link>
                  <Link href="/salem-to-vellore-taxi">Salem &rarr; Vellore</Link>
                  <Link href="/salem-to-yercaud-taxi">Salem &rarr; Yercaud</Link>
                  <h4>From Pondicherry</h4>
                  <Link href="/pondicherry-to-chennai-taxi">Pondicherry &rarr; Chennai</Link>
                  <Link href="/pondicherry-to-bangalore-taxi">Pondicherry &rarr; Bangalore</Link>
                  <Link href="/pondicherry-to-coimbatore-taxi">Pondicherry &rarr; Coimbatore</Link>
                  <Link href="/pondicherry-to-madurai-taxi">Pondicherry &rarr; Madurai</Link>
                  <Link href="/pondicherry-to-mahabalipuram-taxi">Pondicherry &rarr; Mahabalipuram</Link>
                  <Link href="/pondicherry-to-salem-taxi">Pondicherry &rarr; Salem</Link>
                  <h4>More Routes</h4>
                  <Link href="/trichy-to-chennai-taxi">Trichy &rarr; Chennai</Link>
                  <Link href="/hyderabad-to-bangalore-taxi">Hyderabad &rarr; Bangalore</Link>
                  <Link href="/hyderabad-to-vijayawada-taxi">Hyderabad &rarr; Vijayawada</Link>
                  <Link href="/mysore-to-bangalore-taxi">Mysore &rarr; Bangalore</Link>
                  <Link href="/ooty-to-bangalore-taxi">Ooty &rarr; Bangalore</Link>
                  <Link href="/all-routes" className="mega-view-all">View All 105 Routes &rarr;</Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Cities Dropdown ── */}
          <div
            className={`mega-dropdown${openDropdown === "cities" ? " is-open" : ""}`}
            onMouseEnter={() => handleMouseEnter("cities")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="mega-trigger"
              aria-expanded={openDropdown === "cities"}
              onClick={() => handleTriggerClick("cities")}
            >
              Cities <span className="chevron">&#9662;</span>
            </button>
            <div className="mega-panel">
              <div className="mega-panel-inner">
                <div className="mega-col">
                  <h4>Drop Taxi &mdash; Tamil Nadu</h4>
                  <Link href="/drop-taxi-in-chennai">Chennai</Link>
                  <Link href="/drop-taxi-in-coimbatore">Coimbatore</Link>
                  <Link href="/drop-taxi-madurai">Madurai</Link>
                  <Link href="/drop-taxi-in-trichy">Trichy</Link>
                  <Link href="/drop-taxi-in-salem">Salem</Link>
                  <Link href="/drop-taxi-in-vellore">Vellore</Link>
                  <Link href="/drop-taxi-tirunelveli">Tirunelveli</Link>
                  <Link href="/drop-taxi-in-erode">Erode</Link>
                  <Link href="/drop-taxi-in-hosur">Hosur</Link>
                  <Link href="/drop-taxi-thanjavur">Thanjavur</Link>
                  <Link href="/drop-taxi-in-kumbakonam">Kumbakonam</Link>
                  <Link href="/drop-taxi-in-karur">Karur</Link>
                  <Link href="/drop-taxi-in-dindigul">Dindigul</Link>
                  <Link href="/drop-taxi-in-namakkal">Namakkal</Link>
                  <Link href="/drop-taxi-in-kanchipuram">Kanchipuram</Link>
                  <Link href="/drop-taxi-in-ranipet">Ranipet</Link>
                  <Link href="/drop-taxi-in-dharmapuri">Dharmapuri</Link>
                  <Link href="/drop-taxi-in-krishnagiri">Krishnagiri</Link>
                </div>
                <div className="mega-col">
                  <h4>Drop Taxi &mdash; More</h4>
                  <Link href="/drop-taxi-cuddalore">Cuddalore</Link>
                  <Link href="/drop-taxi-neyveli">Neyveli</Link>
                  <Link href="/drop-taxi-villupuram">Villupuram</Link>
                  <Link href="/drop-taxi-in-chengalpattu">Chengalpattu</Link>
                  <Link href="/drop-taxi-in-chrompet">Chrompet</Link>
                  <Link href="/drop-taxi-in-karaikudi">Karaikudi</Link>
                  <Link href="/drop-taxi-in-palani">Palani</Link>
                  <Link href="/drop-taxi-in-sivakasi">Sivakasi</Link>
                  <Link href="/drop-taxi-in-tenkasi">Tenkasi</Link>
                  <Link href="/drop-taxi-in-theni">Theni</Link>
                  <Link href="/drop-taxi-in-thoothukudi">Thoothukudi</Link>
                  <Link href="/drop-taxi-srirangam">Srirangam</Link>
                  <Link href="/drop-taxi-in-pudukkottai">Pudukkottai</Link>
                  <Link href="/drop-taxi-in-ramanathapuram">Ramanathapuram</Link>
                  <Link href="/drop-taxi-in-virudhunagar">Virudhunagar</Link>
                  <Link href="/drop-taxi-in-mayiladuthurai">Mayiladuthurai</Link>
                  <Link href="/drop-taxi-in-tiruchendur">Tiruchendur</Link>
                  <Link href="/drop-taxi-in-koomapatti">Koomapatti</Link>
                  <h4>Other States</h4>
                  <Link href="/drop-taxi-in-bangalore">Bangalore</Link>
                  <Link href="/drop-taxi-in-pondicherry">Pondicherry</Link>
                  <Link href="/drop-taxi-hyderabad">Hyderabad</Link>
                  <Link href="/drop-taxi-in-trivandrum">Trivandrum</Link>
                  <Link href="/drop-taxi-munnar">Munnar</Link>
                </div>
                <div className="mega-col">
                  <h4>Call Taxi &mdash; Popular</h4>
                  <Link href="/call-taxi-in-erode">Erode</Link>
                  <Link href="/call-taxi-salem">Salem</Link>
                  <Link href="/call-taxi-in-vellore">Vellore</Link>
                  <Link href="/call-taxi-in-kanchipuram">Kanchipuram</Link>
                  <Link href="/call-taxi-in-tirupur">Tirupur</Link>
                  <Link href="/call-taxi-in-karur">Karur</Link>
                  <Link href="/call-taxi-in-ooty">Ooty</Link>
                  <Link href="/call-taxi-in-kodaikanal">Kodaikanal</Link>
                  <Link href="/call-taxi-in-tiruvannamalai">Thiruvannamalai</Link>
                  <Link href="/call-taxi-nagercoil">Nagercoil</Link>
                  <Link href="/call-taxi-kanyakumari">Kanyakumari</Link>
                  <Link href="/call-taxi-in-pollachi">Pollachi</Link>
                  <Link href="/call-taxi-in-palakkad">Palakkad</Link>
                  <Link href="/call-taxi-karaikudi">Karaikudi</Link>
                  <Link href="/call-taxi-in-tambaram">Tambaram</Link>
                  <Link href="/call-taxi-in-adyar">Adyar</Link>
                </div>
                <div className="mega-col">
                  <h4>Call Taxi &mdash; More</h4>
                  <Link href="/call-taxi-ambattur">Ambattur</Link>
                  <Link href="/call-taxi-in-mylapore">Mylapore</Link>
                  <Link href="/call-taxi-in-medavakkam">Medavakkam</Link>
                  <Link href="/call-taxi-perambur">Perambur</Link>
                  <Link href="/call-taxi-porur">Porur</Link>
                  <Link href="/call-taxi-sriperumbudur">Sriperumbudur</Link>
                  <Link href="/call-taxi-in-chidambaram">Chidambaram</Link>
                  <Link href="/call-taxi-in-mettupalayam">Mettupalayam</Link>
                  <Link href="/call-taxi-in-palladam">Palladam</Link>
                  <Link href="/call-taxi-in-udumalpet">Udumalpet</Link>
                  <Link href="/call-taxi-in-bhavani">Bhavani</Link>
                  <Link href="/call-taxi-in-gobichettipalayam">Gobichettipalayam</Link>
                  <Link href="/call-taxi-in-perundurai">Perundurai</Link>
                  <Link href="/call-taxi-in-tindivanam">Tindivanam</Link>
                  <Link href="/call-taxi-perambalur">Perambalur</Link>
                  <Link href="/call-taxi-in-virudhachalam">Virudhachalam</Link>
                  <Link href="/call-taxi-in-virudhunagar">Virudhunagar</Link>
                  <Link href="/call-taxi-in-paramakudi">Paramakudi</Link>
                  <Link href="/cities" className="mega-view-all">View All Cities &rarr;</Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Airport Dropdown ── */}
          <div
            className={`mega-dropdown${openDropdown === "airport" ? " is-open" : ""}`}
            onMouseEnter={() => handleMouseEnter("airport")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="mega-trigger"
              aria-expanded={openDropdown === "airport"}
              onClick={() => handleTriggerClick("airport")}
            >
              Airport <span className="chevron">&#9662;</span>
            </button>
            <div className="mega-panel mega-panel-sm">
              <div className="mega-panel-inner">
                <div className="mega-col">
                  <h4>Airport Transfers</h4>
                  <Link href="/airport-taxi-in-chennai">Chennai Airport Taxi</Link>
                  <Link href="/airport-taxi-in-bangalore">Bangalore Airport Taxi</Link>
                  <Link href="/coimbatore-airport-taxi">Coimbatore Airport Taxi</Link>
                  <Link href="/madurai-airport-taxi">Madurai Airport Taxi</Link>
                  <Link href="/trichy-airport-taxi">Trichy Airport Taxi</Link>
                  <Link href="/cochin-airport-taxi">Cochin Airport Taxi</Link>
                  <Link href="/airport-taxi-mangalore">Mangalore Airport Taxi</Link>
                  <Link href="/airport-taxi-hosur">Hosur Airport Taxi</Link>
                  <Link href="/chennai-airport-to-vellore-taxi">Chennai Airport &rarr; Vellore</Link>
                  <Link href="/chennai-airport-to-cmc-vellore-taxi">Chennai Airport &rarr; CMC Vellore</Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── More Dropdown ── */}
          <div
            className={`mega-dropdown${openDropdown === "more" ? " is-open" : ""}`}
            onMouseEnter={() => handleMouseEnter("more")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="mega-trigger"
              aria-expanded={openDropdown === "more"}
              onClick={() => handleTriggerClick("more")}
            >
              More <span className="chevron">&#9662;</span>
            </button>
            <div className="mega-panel mega-panel-sm">
              <div className="mega-panel-inner">
                <div className="mega-col">
                  <h4>Services</h4>
                  <Link href="/one-way-cab-booking">One Way Cab Booking</Link>
                  <Link href="/one-way-taxi-in-coimbatore">One Way Taxi Coimbatore</Link>
                  <Link href="/one-way-taxi-in-madurai">One Way Taxi Madurai</Link>
                  <Link href="/one-way-taxi-in-trichy">One Way Taxi Trichy</Link>
                  <Link href="/outstation-cabs">Outstation Cabs</Link>
                  <Link href="/tariff">Tariff &amp; Pricing</Link>
                  <h4>Company</h4>
                  <Link href="/about-us">About Us</Link>
                  <Link href="/reviews">Customer Reviews</Link>
                  <Link href="/blogs">Blog</Link>
                  <Link href="/faq">FAQ</Link>
                  <Link href="/contact">Contact Us</Link>
                  <Link href="/privacy-policy-2">Privacy Policy</Link>
                  <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/book-now" className="btn btn-primary btn-nav-cta">
            Book Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
