import { Link } from "wouter";
import { GraduationCap, Facebook, Instagram, Youtube, Send } from "lucide-react";
import { SiWhatsapp, SiTelegram, SiLinkedin, SiGithub, SiX } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: SiWhatsapp,
      href: "#",
      color: "text-green-500 hover:text-green-600",
    },
    {
      name: "Telegram",
      icon: SiTelegram,
      href: "#",
      color: "text-blue-500 hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "text-pink-500 hover:text-pink-600",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "text-blue-600 hover:text-blue-700",
    },
    {
      name: "LinkedIn",
      icon: SiLinkedin,
      href: "#",
      color: "text-blue-700 hover:text-blue-800",
    },
    {
      name: "GitHub",
      icon: SiGithub,
      href: "#",
      color: "text-gray-800 hover:text-gray-900",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "#",
      color: "text-red-600 hover:text-red-700",
    },
    {
      name: "X",
      icon: SiX,
      href: "#",
      color: "text-gray-800 hover:text-gray-900",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <h3 className="text-2xl font-bold">Bounce Back Academy</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering NBSE students with free access to quality educational
              resources and previous year question papers.
            </p>
            <div className="flex space-x-4">
              {socialLinks.slice(0, 4).map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`transition-colors ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Courses
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/question-papers">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Question Papers
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/videos">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Videos
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Class 8 Papers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Class 9 Papers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Class 10 Papers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Class 11 Papers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Class 12 Papers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/feedback">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Feedback
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Bounce Back Academy. Built with ❤️ by Amit Sharma.
              All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Made in India</span>
              <span className="text-red-500">🇮🇳</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
