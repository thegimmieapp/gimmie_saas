import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsAndConditions() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle>Terms & Conditions</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-slate max-w-none">
        <p>Last Updated: October 26, 2023</p>

        <h2>1. Agreement to Terms</h2>
        <p>
          By using the Gimmie AI Shopify plugin ("Service"), you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h2>2. Subscriptions</h2>
        <p>
          Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set on a monthly basis.
        </p>

        <h2>3. Commission Fees</h2>
        <p>
          In addition to the monthly subscription, Gimmie AI charges a commission fee based on the sales generated through our recommendation service. You agree to pay these commissions as outlined on the "Account & Billing" page. Failure to pay commissions may result in suspension of your account.
        </p>

        <h2>4. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on Gimmie AI's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
        </p>

        <h2>5. Disclaimer</h2>
        <p>
          The materials on Gimmie AI's website are provided on an 'as is' basis. Gimmie AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2>6. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of Delaware, USA and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </p>
      </CardContent>
    </Card>
  );
}