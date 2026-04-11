#!/bin/bash

echo "🔧 Fixing lucide-react imports..."

# Fix Footer.jsx
cat > frontend/components/Layout/Footer.jsx << 'EOF'
'use client';

import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/raushni', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/raushni', color: 'hover:text-sky-500' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/raushni', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/raushni', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/raushni', color: 'hover:text-red-600' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Mission', href: '/mission' },
    { name: 'Success Stories', href: '/stories' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Contact', href: '/contact' },
  ];

  const supportLinks = [
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Donation Policy', href: '/donation-policy' },
    { name: 'Refund Policy', href: '/refund' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Raushni Trust</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering communities through education and social welfare.
              Together we can make a difference in the lives of those who need it most.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110 ${social.color}`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-orange-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-orange-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-400 mt-0.5" />
                <p className="text-sm">123 NGO Street, Civil Lines, New Delhi - 110001</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-orange-400" />
                <p className="text-sm">+91 123 456 7890</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-orange-400" />
                <p className="text-sm">info@raushni.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="text-white font-semibold mb-1">Subscribe to Newsletter</h4>
              <p className="text-sm">Get updates about our latest activities and events</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center gap-2">
                <Send size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm">
            © {currentYear} Raushni Educational & Social Welfare Trust. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Registered under Section 8 of Companies Act, 2013 | 80G Tax Exempted
          </p>
        </div>
      </div>
    </footer>
  );
}
EOF

echo "✅ Footer fixed!"

# Clear Next.js cache
rm -rf frontend/.next

echo "🚀 Restart dev server with: cd frontend && npm run dev"