'use client';

import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

const navigation = {
  company: [
    { name: 'About Us', href: '/about' },
  ],
  services: [
    { name: 'Web Development', href: '/services' },
    { name: 'AI Solutions', href: '/services' },
    { name: 'Mobile Apps', href: '/services' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Feedback', href: '/feedback' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
  ],
  social: [
    { name: 'LinkedIn', href: 'https://linkedin.com/in/debadatta-jena', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com', icon: Github },
  ],
};

const contactInfo = {
  address: 'Bhubaneswar, Odisha, India',
  phone: '+91 9692292496',
  email: 'debadattajena552@gmail.com',
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <img 
                src="/images/small-logo.png" 
                alt="GLYVEXA" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Professional AI and software solutions for growing businesses. We help transform your ideas into reality.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>{contactInfo.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 dark:text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h4>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Services</h4>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Support</h4>
            <ul className="space-y-2">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <p>&copy; {currentYear} GLYVEXA. All rights reserved.</p>
              <div className="flex items-center gap-4">
                {navigation.legal.map((item, index) => (
                  <span key={item.name}>
                    <Link href={item.href} className="hover:text-blue-600 transition-colors">
                      {item.name}
                    </Link>
                    {index < navigation.legal.length - 1 && <span className="mx-2">•</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
