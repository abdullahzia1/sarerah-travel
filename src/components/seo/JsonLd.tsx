export function TravelAgencyJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Sarerah Travel",
    description: "Premium travel agency from Pakistan. North Pakistan & Asia tours. Licensed guides, no hidden charges.",
    url: "https://sarerahtravel.com",
    telephone: "+92-300-1234567",
    email: "hello@sarerahtravel.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    areaServed: ["Pakistan", "Thailand", "Malaysia", "Sri Lanka", "Nepal", "Azerbaijan"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TourPackageJsonLd({
  name,
  description,
  durationDays,
  priceFromPkr,
  image,
  url,
}: {
  name: string;
  description: string;
  durationDays: number;
  priceFromPkr: number;
  image: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    offers: {
      "@type": "Offer",
      price: priceFromPkr,
      priceCurrency: "PKR",
    },
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Duration",
      value: `${durationDays} days`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
