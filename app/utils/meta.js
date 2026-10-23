import config from '~/config.json';

const { name, url } = config;
const defaultOgImage = `${url}/social-image.png`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${url}/#organization`,
  name,
  url,
  logo: `${url}/icon-512.png`,
  image: defaultOgImage,
  email: 'info@gbict.nl',
  description:
    'GBICT uit Almere bouwt software op maat, bedrijfssystemen, automatisering en AI.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'W. Dreesweg 16',
    postalCode: '1314 CL',
    addressLocality: 'Almere',
    addressCountry: 'NL',
  },
  areaServed: { '@type': 'Country', name: 'Nederland' },
  sameAs: [`https://www.instagram.com/${config.instagram}`, `https://github.com/${config.github}`],
};

export function baseMeta({
  title,
  description,
  prefix = name,
  ogImage = defaultOgImage,
  service,
  schema = [],
}) {
  // Page title first, brand last: what the page is about is what people search for.
  const titleText = [title, prefix].filter(Boolean).join(' | ');

  const schemas = [].concat(schema);
  if (service) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description,
      url: `${url}/services/${service}`,
      provider: { '@id': `${url}/#organization` },
      areaServed: { '@type': 'Country', name: 'Nederland' },
    });
  }

  return [
    { title: titleText },
    { name: 'description', content: description },
    { name: 'author', content: name },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:alt', content: name },
    { property: 'og:image:width', content: '1280' },
    { property: 'og:image:height', content: '800' },
    { property: 'og:title', content: titleText },
    { property: 'og:site_name', content: name },
    { property: 'og:type', content: 'website' },
    { property: 'og:description', content: description },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:description', content: description },
    { property: 'twitter:title', content: titleText },
    { property: 'twitter:image', content: ogImage },
    ...schemas.map(s => ({ 'script:ld+json': s })),
  ];
}
