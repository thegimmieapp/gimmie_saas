import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function B2BFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
             <Link to={createPageUrl('PublicHome')}>
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6366b02ec_white.png" alt="Gimmie AI" className="h-12 mb-4" />
             </Link>
             <p className="text-sm">AI-powered gift recommendations for Shopify stores.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to={createPageUrl('IntegrateLanding')} className="hover:text-white transition-colors">Integration</Link></li>
              <li><Link to={createPageUrl('AnalyticsLanding')} className="hover:text-white transition-colors">Analytics</Link></li>
              <li><Link to={createPageUrl('DeveloperDocs')} className="hover:text-white transition-colors">API Docs</Link></li>
              <li><Link to={createPageUrl('Pricing')} className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to={createPageUrl('Testimonials')} className="hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link to={createPageUrl('B2BContact')} className="hover:text-white transition-colors">Contact Sales</Link></li>
              <li><Link to={createPageUrl('CreatorPartner')} className="hover:text-white transition-colors">Partner Program</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to={createPageUrl('DeveloperDocs')} className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to={createPageUrl('B2BContact')} className="hover:text-white transition-colors">Get Help</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8 flex items-center justify-between">
          <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Gimmie AI. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github className="h-5 w-5" /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}