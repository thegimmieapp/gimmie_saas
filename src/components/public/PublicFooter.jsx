import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Github, Twitter, Linkedin, Apple, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicFooter() {
  return (
    <footer className="bg-[--gimmie-dark] text-slate-300">
      <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Logo & Description */}
          <div className="lg:col-span-3">
             <Link to={createPageUrl('PublicHome')}>
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6366b02ec_white.png" alt="Gimmie AI" className="h-12 mb-4" />
             </Link>
             <p className="text-sm text-slate-400">Discover the perfect gift with AI-powered recommendations.</p>
          </div>
          
          {/* Links Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Categories</h3>
                <ul className="space-y-3">
                  <li><Link to={createPageUrl('PublicCategory?category=For Her')} className="hover:text-[--gimmie-carolina] transition-colors">For Her</Link></li>
                  <li><Link to={createPageUrl('PublicCategory?category=For Him')} className="hover:text-[--gimmie-carolina] transition-colors">For Him</Link></li>
                  <li><Link to={createPageUrl('PublicCategory?category=Tech')} className="hover:text-[--gimmie-carolina] transition-colors">Tech & Gadgets</Link></li>
                  <li><Link to={createPageUrl('PublicCategory?category=Home')} className="hover:text-[--gimmie-carolina] transition-colors">Home & Living</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Support</h3>
                <ul className="space-y-3">
                  <li><Link to={createPageUrl('PublicFaq')} className="hover:text-[--gimmie-carolina] transition-colors">FAQ</Link></li>
                  <li><Link to={createPageUrl('PublicContact')} className="hover:text-[--gimmie-carolina] transition-colors">Contact Us</Link></li>
                  <li><a href="#" className="hover:text-[--gimmie-carolina] transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-[--gimmie-carolina] transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">For Business</h3>
                <ul className="space-y-3">
                  <li><Link to={createPageUrl('Landing')} className="hover:text-[--gimmie-carolina] transition-colors">Shopify App</Link></li>
                  <li><Link to={createPageUrl('Pricing')} className="hover:text-[--gimmie-carolina] transition-colors">Pricing</Link></li>
                  <li><Link to={createPageUrl('CreatorPartner')} className="hover:text-[--gimmie-carolina] transition-colors">Partner Program</Link></li>
                  <li><Link to={createPageUrl('DeveloperDocs')} className="hover:text-[--gimmie-carolina] transition-colors">API Documentation</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* App Download */}
          <div className="lg:col-span-3">
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Get the App</h3>
              <div className="flex items-center gap-4">
                  <div className="bg-white p-1 rounded-lg flex-shrink-0">
                    <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://gimmie.ai/app&bgcolor=ffffff&color=2a2b2a&margin=0" 
                        alt="QR code for mobile app" 
                        className="w-24 h-24"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                      <Button variant="outline" className="bg-transparent text-white border-slate-600 hover:bg-slate-700 hover:border-slate-500 justify-start">
                          <Apple className="w-5 h-5 mr-2"/>
                          <div>
                            <p className="text-xs">Download on the</p>
                            <p className="text-sm font-semibold -mt-1">App Store</p>
                          </div>
                      </Button>
                      <Button variant="outline" className="bg-transparent text-white border-slate-600 hover:bg-slate-700 hover:border-slate-500 justify-start">
                          <Smartphone className="w-5 h-5 mr-2"/>
                          <div>
                            <p className="text-xs">GET IT ON</p>
                            <p className="text-sm font-semibold -mt-1">Google Play</p>
                          </div>
                      </Button>
                  </div>
              </div>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            © 2024 Gimmie AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-[--gimmie-carolina] transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-[--gimmie-carolina] transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-[--gimmie-carolina] transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}