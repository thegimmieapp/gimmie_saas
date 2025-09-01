import React, { useState, useEffect } from 'react';
import { Article } from '@/api/entities';
import AISearch from '../components/public/AISearch';
import ArticleCard from '../components/public/ArticleCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  ArrowRight, 
  Calendar,
  Bell,
  Smartphone,
  Store
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PublicHomePage() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      try {
        const articles = await Article.filter({ is_featured: true });
        setFeaturedArticles(articles);
      } catch (error) {
        console.error("Failed to load articles:", error);
      }
      setIsLoading(false);
    };
    loadArticles();
  }, []);

  const trendingSearches = [
    "Birthday gifts for mom",
    "Tech gifts under $100", 
    "Cozy home essentials",
    "Fitness enthusiast gifts",
    "Coffee lover presents",
    "Gaming accessories",
    "Self-care packages"
  ];

  const giftCategories = [
    { 
      name: "For Her", 
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Thoughtful gifts she'll love"
    },
    { 
      name: "For Him", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Gifts that make him smile"
    },
    { 
      name: "Tech & Gadgets", 
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2041&q=80",
      description: "Latest tech innovations"
    },
    { 
      name: "Home & Living", 
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80",
      description: "Make house a home"
    },
    { 
      name: "Wellness & Beauty", 
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80",
      description: "Self-care essentials"
    },
    { 
      name: "Food & Drink", 
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Culinary delights"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Feminine & Soft */}
      <section className="py-16 sm:py-24 feminine-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* B2B CTA - Soft and Elegant */}
          <div className="mb-12 text-center">
            <Card className="inline-block bg-gradient-to-r from-[--gimmie-dark] to-[--gimmie-green] text-white border-0 soft-shadow gentle-hover rounded-2xl">
              <CardContent className="px-8 py-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-lg">Own a Shopify Store?</h3>
                    <p className="text-sm text-white/80">Add AI gift recommendations to boost sales</p>
                  </div>
                  <Link to={createPageUrl("Landing")}>
                    <Button className="bg-white/90 text-[--gimmie-dark] hover:bg-white font-medium rounded-full px-6">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-[--gimmie-dark] tracking-tight mb-8 leading-tight">
              Find the Perfect Gift
              <span className="block font-normal bg-gradient-to-r from-[--gimmie-carolina] to-[--gimmie-green] bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl mt-4">
                with AI-powered recommendations
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover thoughtful gifts through intelligent conversations. Tell us about who you're shopping for, and we'll find something they'll truly love.
            </p>
            <div className="mt-8">
              <AISearch />
            </div>

            {/* Trending Searches - Soft Style */}
            <div className="mt-12 max-w-4xl mx-auto">
              <p className="text-sm text-[--gimmie-carolina] font-medium mb-4 uppercase tracking-wide">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-3">
                {trendingSearches.map((search, index) => (
                  <Badge 
                    key={index} 
                    className="cursor-pointer hover:bg-[--gimmie-carolina] hover:text-white transition-all bg-[--gimmie-grey-sky] text-[--gimmie-dark] border-0 rounded-full px-4 py-2 gentle-hover"
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Categories - Soft Photography Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-[--gimmie-dark] mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Curated collections for every person and occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {giftCategories.map((category, index) => (
              <Link key={index} to={createPageUrl(`PublicCategory?category=${encodeURIComponent(category.name)}`)}>
                <div className="group relative overflow-hidden bg-white soft-shadow hover:shadow-lg transition-all duration-500 rounded-3xl gentle-hover">
                  <div className="aspect-[4/5] relative overflow-hidden rounded-3xl">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[--gimmie-dark]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                    <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-light mb-2">{category.name}</h3>
                      <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles - Soft Magazine Layout */}
      <section className="py-20 bg-gradient-to-b from-[--gimmie-grey-sky] to-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-light text-[--gimmie-dark] mb-4">Latest Gift Guides</h2>
              <p className="text-lg text-slate-600">Thoughtfully curated recommendations from our editors</p>
            </div>
            <Link to={createPageUrl('PublicCategory?category=All')}>
                <Button className="border-[--gimmie-carolina] text-[--gimmie-carolina] hover:bg-[--gimmie-carolina] hover:text-white rounded-full px-6 gentle-hover" variant="outline">
                    View All Guides
                    <ArrowRight className="w-4 h-4 ml-2"/>
                </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white soft-shadow animate-pulse rounded-2xl">
                   <div className="bg-slate-200 h-64 mb-6 rounded-2xl"></div>
                   <div className="p-6">
                     <div className="bg-slate-200 h-4 rounded-full w-1/4 mb-4"></div>
                     <div className="bg-slate-200 h-6 rounded-full w-3/4 mb-3"></div>
                     <div className="bg-slate-200 h-4 rounded-full w-full mb-2"></div>
                     <div className="bg-slate-200 h-4 rounded-full w-1/2"></div>
                   </div>
                </div>
              ))
            ) : (
              featuredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Mobile App Section - Soft and Elegant */}
      <section className="py-20 bg-gradient-to-r from-[--gimmie-dark] to-[--gimmie-green] text-white relative overflow-hidden">
        {/* Soft background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="soft-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#soft-pattern)" />
          </svg>
        </div>
        
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light mb-6">
                Never Miss an Occasion
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Get the Gimmie mobile app for smart reminders, calendar sync, and personalized gift suggestions wherever you are.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-white/80">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span>Calendar sync for birthdays & anniversaries</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span>Smart occasion reminders</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="p-2 bg-white/10 rounded-full">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span>Voice-powered gift search</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button className="bg-white/90 text-[--gimmie-dark] hover:bg-white px-8 py-3 rounded-full font-medium gentle-hover">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Download for iOS
                </Button>
                <Button className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full gentle-hover" variant="outline">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Get on Android
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Mobile App"
                  className="w-80 h-96 object-cover rounded-3xl mx-auto soft-shadow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Occasion Cards - Soft & Elegant */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center text-[--gimmie-dark] mb-16">
            Gifts for Every Occasion
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Valentine's Day", 
                image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                description: "Romantic gifts that show you care"
              },
              { 
                title: "Last Minute", 
                image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
                description: "Quick delivery, thoughtful choices"
              },
              { 
                title: "Housewarming", 
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80",
                description: "Help them make it feel like home"
              },
              { 
                title: "Luxury Gifts", 
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                description: "Premium presents for special moments"
              }
            ].map((occasion, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-white soft-shadow hover:shadow-lg transition-all duration-300 rounded-2xl gentle-hover">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                    <img 
                      src={occasion.image} 
                      alt={occasion.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-[--gimmie-dark] mb-2">{occasion.title}</h3>
                    <p className="text-sm text-slate-600">{occasion.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}