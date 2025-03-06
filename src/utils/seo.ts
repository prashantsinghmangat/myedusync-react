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

/**
 * Generate structured data in JSON-LD format for SEO
 * @param type The schema.org type (e.g., 'Person', 'Article', 'FAQPage')
 * @param data The specific data for the schema type
 * @returns Structured data object ready to be JSON-stringified
 */
export function generateStructuredData(type: string, data: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
}

/**
 * Generate FAQ structured data
 * @param questions Array of question-answer pairs
 * @returns FAQPage structured data
 */
export function generateFAQStructuredData(questions: {question: string, answer: string}[]) {
  return generateStructuredData('FAQPage', {
    mainEntity: questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  });
}

/**
 * Generate BreadcrumbList structured data
 * @param items Array of breadcrumb items with name and url
 * @returns BreadcrumbList structured data
 */
export function generateBreadcrumbStructuredData(items: {name: string, url: string}[]) {
  return generateStructuredData('BreadcrumbList', {
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  });
}

/**
 * Generate Course structured data
 * @param course Course details
 * @returns Course structured data
 */
export function generateCourseStructuredData(course: {
  name: string,
  description: string,
  provider: string,
  url: string,
  imageUrl?: string,
  dateCreated?: string,
  courseCode?: string,
  hasCourseInstance?: any
}) {
  return generateStructuredData('Course', {
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Organization",
      "name": course.provider,
      "sameAs": DEFAULT_SEO.canonical
    },
    url: course.url,
    ...(course.imageUrl && { image: course.imageUrl }),
    ...(course.dateCreated && { dateCreated: course.dateCreated }),
    ...(course.courseCode && { courseCode: course.courseCode }),
    ...(course.hasCourseInstance && { hasCourseInstance: course.hasCourseInstance })
  });
}

/**
 * Generate Person structured data for tutors
 * @param person Person details
 * @returns Person structured data
 */
export function generatePersonStructuredData(person: {
  name: string,
  description: string,
  image?: string,
  jobTitle?: string,
  worksFor?: string,
  alumniOf?: string,
  sameAs?: string[],
  knowsAbout?: string[]
}) {
  return generateStructuredData('Person', {
    name: person.name,
    description: person.description,
    ...(person.image && { image: person.image }),
    ...(person.jobTitle && { jobTitle: person.jobTitle }),
    ...(person.worksFor && { 
      worksFor: {
        "@type": "Organization",
        "name": person.worksFor
      }
    }),
    ...(person.alumniOf && { 
      alumniOf: {
        "@type": "Organization",
        "name": person.alumniOf
      }
    }),
    ...(person.sameAs && { sameAs: person.sameAs }),
    ...(person.knowsAbout && { knowsAbout: person.knowsAbout })
  });
}