import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle>Privacy Policy</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-slate max-w-none">
        <p>Last Updated: October 26, 2023</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to Gimmie AI. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Shopify plugin and services.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
        <ul>
          <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the app.</li>
          <li><strong>Store Data:</strong> We access your Shopify store data, including product catalogs, sales data, and customer information, solely to provide and improve our recommendation services. All data is handled securely.</li>
          <li><strong>Usage Data:</strong> Information our servers automatically collect when you access the app, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the app.</li>
        </ul>

        <h2>3. Use of Your Information</h2>
        <p>
          Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
        </p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Provide AI-powered product recommendations.</li>
          <li>Analyze usage and trends to improve our services.</li>
          <li>Communicate with you regarding your account or our services.</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information and store data. While we have taken reasonable steps to secure the information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us using the form on the "Contact Us" tab.
        </p>
      </CardContent>
    </Card>
  );
}