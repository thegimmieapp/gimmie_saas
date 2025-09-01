import React, { useState, useEffect } from 'react';
import { User, Referral } from '@/api/entities';
import ReferralStats from '../components/referrals/ReferralStats';
import HowItWorks from '../components/referrals/HowItWorks';
import ReferralsTable from '../components/referrals/ReferralsTable';
import { Gift } from 'lucide-react';

export default function ReferralsPage() {
  const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const currentUser = await User.me();
        
        // This is a temporary measure for demonstration. 
        // In a real app, the referral code would be generated and assigned on user creation.
        if (!currentUser.referral_code) {
            currentUser.referral_code = `GIMMIE-${currentUser.id.substring(0, 8).toUpperCase()}`;
        }
        setUser(currentUser);
        
        const fetchedReferrals = await Referral.filter({ referrer_email: currentUser.email });
        setReferrals(fetchedReferrals);
      } catch (error) {
        console.error("Failed to load referral data:", error);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  const totalEarnings = referrals
    .filter(r => r.status === 'credited')
    .reduce((sum, r) => sum + r.credit_amount, 0);

  return (
    <div className="p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-br from-emerald-500 to-green-600 p-4 rounded-2xl shadow-lg mb-4">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Refer a Friend, Get $150</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Share Gimmie AI with other businesses and earn credits when they launch our widget.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Stats & How It Works */}
          <div className="lg:col-span-1 space-y-6">
            <ReferralStats 
              referralCode={user?.referral_code}
              creditBalance={user?.referral_credit_balance || 0}
              totalEarnings={totalEarnings}
              isLoading={isLoading}
            />
            <HowItWorks />
          </div>

          {/* Right Column: Referrals Table */}
          <div className="lg:col-span-2">
            <ReferralsTable referrals={referrals} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}