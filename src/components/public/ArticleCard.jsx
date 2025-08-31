import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';

export default function ArticleCard({ article }) {
  return (
    <Link to={createPageUrl(`PublicArticle?slug=${article.slug}`)} className="group block">
      <article className="bg-white soft-shadow hover:shadow-lg transition-all duration-300 h-full flex flex-col rounded-2xl overflow-hidden gentle-hover">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={article.hero_image_url} 
            alt={article.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="mb-3">
            <span className="text-xs font-medium text-[--gimmie-carolina] uppercase tracking-wide bg-[--gimmie-grey-sky] px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>
          <h3 className="text-xl font-light text-[--gimmie-dark] leading-snug group-hover:text-[--gimmie-green] transition-colors mb-3">
            {article.title}
          </h3>
          <p className="text-slate-600 text-sm flex-grow leading-relaxed mb-4">
            {article.summary}
          </p>
          <div className="pt-4 border-t border-[--gimmie-grey-sky] text-xs text-slate-500 flex justify-between items-center">
            <span>By {article.author}</span>
            <span>{format(new Date(article.published_date), 'MMM d, yyyy')}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}