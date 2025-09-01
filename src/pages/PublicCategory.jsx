import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '@/api/entities';
import { Article } from '@/api/entities';
import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from '../components/public/ArticleCard';
import ProductCard from '../components/public/ProductCard';
import AIPicksExcerpt from '../components/public/AIPicksExcerpt';
import AISearch from '../components/public/AISearch';

export default function PublicCategoryPage() {
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category') || 'All';
    setCategory(categoryParam);

    const loadData = async () => {
      setIsLoading(true);
      try {
        let productQuery = {};
        let articleQuery = {};
        
        if (categoryParam !== 'All') {
          // A real app would have better category mapping.
          // For now, we filter articles by category and attempt to filter products by type.
          articleQuery = { category: categoryParam };
          if (categoryParam === "Tech & Gadgets") {
            productQuery = { product_type: "Electronics" };
          } else if (categoryParam === "Home & Living") {
             productQuery = { product_type: "Homeware" };
          }
        }
        
        const [fetchedProducts, fetchedArticles] = await Promise.all([
          Product.filter(productQuery),
          Article.filter(articleQuery, "-published_date", 3)
        ]);
        
        setProducts(fetchedProducts);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Failed to load category data:", error);
      }
      setIsLoading(false);
    };

    loadData();
  }, [location.search]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 feminine-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-[--gimmie-carolina] uppercase tracking-widest">
            Gift Guide
          </p>
          <h1 className="text-4xl sm:text-6xl font-light text-[--gimmie-dark] mt-4">
            {category}
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our curated collection of thoughtful gifts and inspiring ideas,
            perfect for any occasion and everyone on your list.
          </p>
          <div className="mt-12">
            <AISearch />
          </div>
        </div>
      </section>

      {/* Featured Guides Section */}
      {articles.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-light text-center text-[--gimmie-dark] mb-12">
              Related Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white soft-shadow animate-pulse rounded-2xl">
                     <div className="bg-slate-200 h-64 mb-6 rounded-2xl"></div>
                     <div className="p-6">
                       <div className="bg-slate-200 h-4 rounded-full w-1/4 mb-4"></div>
                       <div className="bg-slate-200 h-6 rounded-full w-3/4 mb-3"></div>
                       <div className="bg-slate-200 h-4 rounded-full w-full mb-2"></div>
                     </div>
                  </div>
                ))
              ) : (
                articles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* AI Editorial Excerpt Section */}
      <section className="py-10 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <AIPicksExcerpt />
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-20 bg-[--gimmie-grey-sky]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center text-[--gimmie-dark] mb-12">
            Product Showcase
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[4/5] rounded-2xl bg-slate-200" />
                  <Skeleton className="h-4 w-3/4 mt-4 mx-auto bg-slate-200" />
                  <Skeleton className="h-4 w-1/2 mt-2 mx-auto bg-slate-200" />
                </div>
              ))
            ) : products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
               <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium text-slate-700">No Products Found</h3>
                  <p className="text-slate-500 mt-2">There are no products matching this category yet.</p>
               </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}