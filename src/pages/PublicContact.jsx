import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SendEmail } from '@/api/integrations';
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';

export default function PublicContact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await SendEmail({
        to: 'contact@gimmie.ai',
        from_name: formData.name,
        subject: `New Message from ${formData.name} via gimmie.ai`,
        body: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      });
      alert('Thank you for your message! We will get back to you shortly.');
      setFormData({ name: '', email: '', message: '' });
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
          <h1 className="text-4xl font-extrabold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you. Whether you have a question, feedback, or need assistance, we're here to help.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-slate-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <Input id="name" placeholder="Your Name" required value={formData.name} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <Input id="email" type="email" placeholder="Your Email" required value={formData.email} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <Textarea id="message" placeholder="Your Message" required className="h-32" value={formData.message} onChange={handleInputChange} />
              </div>
              <div>
                <Button type="submit" className="w-full bg-[--gimmie-green] hover:bg-[--gimmie-green]/90" disabled={isSending}>
                  {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Message
                </Button>
              </div>
            </form>
          </div>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[--gimmie-green]/10 flex items-center justify-center rounded-lg">
                <Mail className="w-6 h-6 text-[--gimmie-green]" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">Our support team is here to help.</p>
                <a href="mailto:support@gimmie.ai" className="text-[--gimmie-green] font-medium hover:underline">support@gimmie.ai</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[--gimmie-green]/10 flex items-center justify-center rounded-lg">
                <Phone className="w-6 h-6 text-[--gimmie-green]" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                <p className="text-gray-600">Mon-Fri from 9am to 5pm.</p>
                <a href="tel:+15551234567" className="text-[--gimmie-green] font-medium hover:underline">+1 (555) 123-4567</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[--gimmie-green]/10 flex items-center justify-center rounded-lg">
                <MapPin className="w-6 h-6 text-[--gimmie-green]" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Main Office</h3>
                <p className="text-gray-600">123 Gimmie Lane, Tech City, 12345</p>
                <a href="#" className="text-[--gimmie-green] font-medium hover:underline">Get directions</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}