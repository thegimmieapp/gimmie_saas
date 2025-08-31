import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SendEmail } from '@/api/integrations';
import { Loader2, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export default function B2BContact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await SendEmail({
        to: 'sales@gimmie.ai',
        from_name: formData.name,
        subject: `New B2B Inquiry from ${formData.name} at ${formData.company}`,
        body: `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`,
      });
      alert('Thank you for your inquiry! Our sales team will get back to you shortly.');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('There was an error sending your message. Please try again.');
    }
    setIsSending(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Contact Our Sales Team</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions about our enterprise plans, custom integrations, or partnerships? We're here to help you get the most out of Gimmie AI.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-16">
          <Card className="bg-slate-50 p-8 rounded-xl shadow-lg border-slate-200/60">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <Input id="name" placeholder="Your Name" required value={formData.name} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <Input id="email" type="email" placeholder="Your Work Email" required value={formData.email} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="company" className="sr-only">Company</label>
                <Input id="company" placeholder="Company Name" required value={formData.company} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <Textarea id="message" placeholder="How can we help?" required className="h-32" value={formData.message} onChange={handleInputChange} />
              </div>
              <div>
                <Button type="submit" className="w-full bg-[--gimmie-green] hover:bg-[--gimmie-green]/90" disabled={isSending}>
                  {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[--gimmie-green]/10 flex items-center justify-center rounded-lg">
                <Mail className="w-6 h-6 text-[--gimmie-green]" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">For partnership and sales inquiries.</p>
                <a href="mailto:sales@gimmie.ai" className="text-[--gimmie-green] font-medium hover:underline">sales@gimmie.ai</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[--gimmie-green]/10 flex items-center justify-center rounded-lg">
                <Phone className="w-6 h-6 text-[--gimmie-green]" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                <p className="text-gray-600">Mon-Fri from 9am to 7pm CST.</p>
                <a href="tel:5129877094" className="text-[--gimmie-green] font-medium hover:underline">(512) 987-7094</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[--gimmie-green]/10 flex items-center justify-center rounded-lg">
                <MapPin className="w-6 h-6 text-[--gimmie-green]" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Main Office</h3>
                <p className="text-gray-600">Austin, TX</p>
                <p className="text-gray-500 text-sm">Meetings by appointment only.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}