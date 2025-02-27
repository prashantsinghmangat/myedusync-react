
export const DEFAULT_SEO = {
  title: "MyEduSync - Personalized Tutoring Platform",
  description: "Connect with expert tutors, access quality study materials, and enhance your learning experience with MyEduSync's personalized tutoring platform.",
  canonical: "https://myedusync.com",
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://myedusync.com',
    siteName: 'MyEduSync',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MyEduSync - Personalized Tutoring Platform',
      },
    ],
  },
  twitter: {
    handle: '@myedusync',
    site: '@myedusync',
    cardType: 'summary_large_image',
  },
};

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  path?: string;
  structuredData?: Record<string, any>;
}

export function generateStructuredData(type: string, data: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
}
