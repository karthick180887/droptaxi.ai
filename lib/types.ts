export interface FAQ {
  question: string;
  answer: string;
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface RelatedLink {
  title: string;
  description: string;
  href: string;
}

export interface ListItem {
  label: string;
  value: string;
}

export interface CarType {
  name: string;
  description: string;
}

export interface FareBreakdown {
  carType: string;
  fare: string;
  perKm: string;
}

export interface RouteDetails {
  distance: string;
  duration: string;
  highway?: string;
  tollEstimate?: string;
  fareBreakdown?: FareBreakdown[];
  travelTips?: string[];
  routeDescription?: string;
}

export interface CityDetails {
  pickupPoints?: string[];
  popularRoutes?: { name: string; href: string }[];
  cityDescription?: string;
}

export interface ContentSection {
  heading: string;
  body: string;
}

export interface PageData {
  slug: string;
  title: string;
  h1: string;
  description: string;
  eyebrow: string;
  lead: string;
  breadcrumbs: Breadcrumb[];
  sectionTitle?: string;
  listItems?: ListItem[];
  bodyText?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  carTypes?: CarType[];
  faqs: FAQ[];
  relatedLinks?: RelatedLink[];
  pageType: "route" | "city" | "airport" | "static";
  routeDetails?: RouteDetails;
  cityDetails?: CityDetails;
  contentSections?: ContentSection[];
}
