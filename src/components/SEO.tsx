
import { useLocation } from 'react-router-dom';
import { DEFAULT_SEO, SEOProps } from '@/utils/seo';
import { Helmet } from 'react-helmet-async';

export const SEO = ({ 
  title, 
  description, 
  canonical, 
  path,
  structuredData
}: SEOProps) => {
  const location = useLocation();
  const currentPath = path || location.pathname;
  const currentUrl = `${DEFAULT_SEO.canonical}${currentPath}`;
  
  const seoTitle = title 
    ? `${title} | ${DEFAULT_SEO.title}`
    : DEFAULT_SEO.title;
  
  const seoDescription = description || DEFAULT_SEO.description;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical || currentUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={DEFAULT_SEO.openGraph.type} />
      <meta property="og:site_name" content={DEFAULT_SEO.openGraph.siteName} />
      <meta property="og:image" content={DEFAULT_SEO.openGraph.images[0].url} />
      <meta property="og:image:width" content={String(DEFAULT_SEO.openGraph.images[0].width)} />
      <meta property="og:image:height" content={String(DEFAULT_SEO.openGraph.images[0].height)} />

      {/* Twitter */}
      <meta name="twitter:card" content={DEFAULT_SEO.twitter.cardType} />
      <meta name="twitter:site" content={DEFAULT_SEO.twitter.site} />
      <meta name="twitter:creator" content={DEFAULT_SEO.twitter.handle} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={DEFAULT_SEO.openGraph.images[0].url} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
