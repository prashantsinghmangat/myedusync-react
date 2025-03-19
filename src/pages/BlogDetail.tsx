
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useLoading } from "@/providers/LoadingProvider";
import { apiGet } from "@/utils/apiInterceptor";
import { API_ENDPOINTS } from "@/config/api";
import { toast } from "sonner";
import { useQuery } from '@tanstack/react-query';
import { generateStructuredData } from "@/utils/seo";
import { ScrollToTop } from '@/components/ScrollToTop';
import { CalendarDays, Clock, User, Share2, ChevronLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Blog detail interfaces 
interface BlogAuthor {
  id: string;
  name: string;
  profilePic?: string;
  bio?: string;
}

interface BlogDetail {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  publishDate: string;
  readTime: number;
  author: BlogAuthor;
  tags: string[];
  relatedPosts?: {
    id: string;
    title: string;
    slug: string;
    coverImage?: string;
  }[];
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { setIsLoading } = useLoading();
  const blogId = id || "";

  // Add the blog endpoint to API_ENDPOINTS if it doesn't exist
  const blogDetailEndpoint = `${API_ENDPOINTS.notes.list}/blog/${blogId}`;

  const { data: blogResponse, isLoading, error } = useQuery({
    queryKey: ['blogDetail', blogId],
    queryFn: async () => {
      try {
        console.log(`Fetching blog detail: ${blogDetailEndpoint}`);
        const response = await apiGet(blogDetailEndpoint, {
          skipAuthRedirect: true,
        });
        
        if (!response.ok) {
          console.error(`Error fetching blog data: ${response.status}`);
          if (response.status === 404) {
            return { isSuccess: false, data: null, message: "Blog not found" };
          }
          
          return { isSuccess: false, data: null, message: "Failed to load blog" };
        }
        
        const data = await response.json();
        console.log("Blog data received:", data);
        return data;
      } catch (error) {
        console.error("Error fetching blog data:", error);
        return { isSuccess: false, data: null, message: "Failed to load blog details" };
      }
    },
    retry: 1,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
    enabled: !!blogId,
  });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  const blog = blogResponse?.isSuccess ? blogResponse.data : null;

  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Generate SEO structured data
  const blogStructuredData = blog 
    ? generateStructuredData('BlogPosting', {
        headline: blog.title,
        description: blog.summary,
        image: blog.coverImage,
        datePublished: blog.publishDate,
        author: {
          '@type': 'Person',
          name: blog.author.name
        },
        publisher: {
          '@type': 'Organization',
          name: 'MyEduSync',
          logo: {
            '@type': 'ImageObject',
            url: 'https://myedusync.com/logo.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://myedusync.com/blog/${blog.id}`
        }
      })
    : null;

  const showErrorUI = error || (blogResponse && !blogResponse.isSuccess);

  if (showErrorUI) {
    return (
      <>
        <SEO
          title="Blog Not Found"
          description="The blog post you're looking for could not be found."
        />
        <Header />
        <main className="py-24 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="max-w-4xl mx-auto text-center">
            <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
            <h1 className="text-3xl font-bold mb-4">Blog Post Unavailable</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {blogResponse?.message || "We couldn't find the blog post you're looking for. It may have been removed or there's a temporary issue."}
            </p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <SEO
        title={blog ? blog.title : "Blog Post"}
        description={blog?.summary || "Read the latest educational content from MyEduSync."}
        structuredData={blogStructuredData}
      />
      <Header />
      <main className="py-24 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild className="flex items-center text-gray-500 hover:text-gray-700">
              <Link to="/blog">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to All Blogs
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-8">
              <div className="mb-8 text-center">
                <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
                <Skeleton className="h-6 w-1/2 mx-auto" />
              </div>
              <Skeleton className="w-full h-96 rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>
          ) : blog ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                  {blog.coverImage && (
                    <div className="relative w-full h-96">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags?.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-accent/10 text-accent">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{blog.title}</h1>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-6 flex-wrap gap-y-2">
                      <div className="flex items-center mr-4">
                        <User className="h-4 w-4 mr-1" />
                        <span>{blog.author.name}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        <span>{formatDate(blog.publishDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{blog.readTime} min read</span>
                      </div>
                    </div>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      {/* Safely render HTML content - in a real app, sanitize this */}
                      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {blog.author.profilePic && (
                            <img
                              src={blog.author.profilePic}
                              alt={blog.author.name}
                              className="h-12 w-12 rounded-full mr-4 object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">Written by {blog.author.name}</p>
                            {blog.author.bio && (
                              <p className="text-sm text-gray-500 dark:text-gray-400">{blog.author.bio}</p>
                            )}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Related Posts</h3>
                  {blog.relatedPosts && blog.relatedPosts.length > 0 ? (
                    <div className="space-y-4">
                      {blog.relatedPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden">
                          {post.coverImage && (
                            <div className="h-32 w-full">
                              <img
                                src={post.coverImage}
                                alt={post.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <CardHeader className="p-4">
                            <CardTitle className="text-base">
                              <Link to={`/blog/${post.id}`} className="hover:text-accent transition-colors">
                                {post.title}
                              </Link>
                            </CardTitle>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
                      <p className="text-gray-600 dark:text-gray-400">No related posts found</p>
                    </div>
                  )}

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags?.map((tag, index) => (
                        <Link 
                          key={index} 
                          to={`/blog?tag=${encodeURIComponent(tag)}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Blog post not found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find the blog post you're looking for.
              </p>
              <Button asChild>
                <Link to="/blog">Browse All Blogs</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogDetail;
