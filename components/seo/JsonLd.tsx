import { business, siteUrl } from "@/data/business";

/** LocalBusiness structured data — factual fields only. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    url: siteUrl,
    image: `${siteUrl}/images/salle-massage.jpg`,
    logo: `${siteUrl}/images/logo.png`,
    telephone: business.phone.e164,
    priceRange: "CHF",
    paymentAccepted: "Cash, TWINT",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressRegion: "VD",
      addressCountry: business.address.countryCode,
    },
    openingHours: business.hours.schema,
    employee: { "@type": "Person", name: business.practitioner.name, jobTitle: business.practitioner.title },
    areaServed: ["Lonay", "Morges"],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Massage classique" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Réflexologie plantaire" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Réflexologie palmaire" } },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
