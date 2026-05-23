import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = 'KAIVON | Premium Portfolio',
  description = 'Interactive portfolio of Kaivon, showcasing innovative engineering and world-class design.',
  keywords = 'kaivon, portfolio, engineering, design, premium, react, tailwind',
  image = 'https://kaivon.os/og-image.jpg',
  url = 'https://kaivon.os',
  type = 'website'
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />
      
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Kaivon",
          "url": url,
          "image": image,
          "description": description,
          "sameAs": [
            "https://twitter.com/kaivon",
            "https://github.com/kaivon",
            "https://linkedin.com/in/kaivon"
          ]
        })}
      </script>
    </Helmet>
  );
}
