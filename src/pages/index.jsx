import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import WidgetSettings from "./WidgetSettings";

import Setup from "./Setup";

import Analytics from "./Analytics";

import Products from "./Products";

import AccountBilling from "./AccountBilling";

import Support from "./Support";

import LeaveFeedback from "./LeaveFeedback";

import ConsumerWidget from "./ConsumerWidget";

import Landing from "./Landing";

import Pricing from "./Pricing";

import DeveloperDocs from "./DeveloperDocs";

import PublicContact from "./PublicContact";

import CreatorPartner from "./CreatorPartner";

import Welcome from "./Welcome";

import PublicHome from "./PublicHome";

import PublicArticle from "./PublicArticle";

import PublicCategory from "./PublicCategory";

import Referrals from "./Referrals";

import B2BContact from "./B2BContact";

import PublicFaq from "./PublicFaq";

import Testimonials from "./Testimonials";

import IntegrateLanding from "./IntegrateLanding";

import AnalyticsLanding from "./AnalyticsLanding";

import RecipientProfiles from "./RecipientProfiles";

import UserProfile from "./UserProfile";

import Onboarding from "./Onboarding";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    WidgetSettings: WidgetSettings,
    
    Setup: Setup,
    
    Analytics: Analytics,
    
    Products: Products,
    
    AccountBilling: AccountBilling,
    
    Support: Support,
    
    LeaveFeedback: LeaveFeedback,
    
    ConsumerWidget: ConsumerWidget,
    
    Landing: Landing,
    
    Pricing: Pricing,
    
    DeveloperDocs: DeveloperDocs,
    
    PublicContact: PublicContact,
    
    CreatorPartner: CreatorPartner,
    
    Welcome: Welcome,
    
    PublicHome: PublicHome,
    
    PublicArticle: PublicArticle,
    
    PublicCategory: PublicCategory,
    
    Referrals: Referrals,
    
    B2BContact: B2BContact,
    
    PublicFaq: PublicFaq,
    
    Testimonials: Testimonials,
    
    IntegrateLanding: IntegrateLanding,
    
    AnalyticsLanding: AnalyticsLanding,
    
    RecipientProfiles: RecipientProfiles,
    
    UserProfile: UserProfile,
    
    Onboarding: Onboarding,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/WidgetSettings" element={<WidgetSettings />} />
                
                <Route path="/Setup" element={<Setup />} />
                
                <Route path="/Analytics" element={<Analytics />} />
                
                <Route path="/Products" element={<Products />} />
                
                <Route path="/AccountBilling" element={<AccountBilling />} />
                
                <Route path="/Support" element={<Support />} />
                
                <Route path="/LeaveFeedback" element={<LeaveFeedback />} />
                
                <Route path="/ConsumerWidget" element={<ConsumerWidget />} />
                
                <Route path="/Landing" element={<Landing />} />
                
                <Route path="/Pricing" element={<Pricing />} />
                
                <Route path="/DeveloperDocs" element={<DeveloperDocs />} />
                
                <Route path="/PublicContact" element={<PublicContact />} />
                
                <Route path="/CreatorPartner" element={<CreatorPartner />} />
                
                <Route path="/Welcome" element={<Welcome />} />
                
                <Route path="/PublicHome" element={<PublicHome />} />
                
                <Route path="/PublicArticle" element={<PublicArticle />} />
                
                <Route path="/PublicCategory" element={<PublicCategory />} />
                
                <Route path="/Referrals" element={<Referrals />} />
                
                <Route path="/B2BContact" element={<B2BContact />} />
                
                <Route path="/PublicFaq" element={<PublicFaq />} />
                
                <Route path="/Testimonials" element={<Testimonials />} />
                
                <Route path="/IntegrateLanding" element={<IntegrateLanding />} />
                
                <Route path="/AnalyticsLanding" element={<AnalyticsLanding />} />
                
                <Route path="/RecipientProfiles" element={<RecipientProfiles />} />
                
                <Route path="/UserProfile" element={<UserProfile />} />
                
                <Route path="/Onboarding" element={<Onboarding />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}