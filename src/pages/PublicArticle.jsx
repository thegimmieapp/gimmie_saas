import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Article } from '@/api/entities';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Clock, User as UserIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function PublicArticlePage() {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      const slug = urlParams.get('slug');
      if (slug) {
        try {
          const articles = await Article.filter({ slug });
          if (articles.length > 0) {
            setArticle(articles[0]);
          }
        } catch (error) {
          console.error("Failed to load article:", error);
        }
      }
      setIsLoading(false);
    };
    loadArticle();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-96 w-full rounded-xl mb-8" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-5/6 mb-4" />
      </div>
    );
  }

  if (!article) {
    return (
        <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Article not found</h1>
            <p className="text-slate-600">The requested article could not be loaded.</p>
        </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <article>
          <header className="mb-8">
            <Badge className="bg-[--gimmie-green]/10 text-[--gimmie-green] border-[--gimmie-green]/20 mb-4">
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {article.title}
            </h1>
            <div className="mt-6 flex items-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${article.author}`} />
                  <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4"/>
                <span>{format(new Date(article.published_date), 'MMMM d, yyyy')}</span>
              </div>
            </div>
          </header>

          <img 
            src={article.hero_image_url} 
            alt={article.title} 
            className="w-full h-auto rounded-xl shadow-lg mb-8"
          />

          <div 
            className="prose prose-lg max-w-none prose-slate"
            dangerouslySetInnerHTML={ { __html: DOMPurify.sanitize(article.content, { USE_PROFILES: { html: true } }) } }
          />

          <div className="mt-12 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-600 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}