import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Clock } from "lucide-react";
import {
  SiWhatsapp,
  SiTelegram,
  SiInstagram,
  SiFacebook,
  SiLinkedin,
  SiGithub,
  SiYoutube,
  SiX,
} from "react-icons/si";

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "amitsharma.bba@gmail.com",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Nagaland, India",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "Usually within 24 hours",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const socialPlatforms = [
    {
      name: "WhatsApp",
      icon: SiWhatsapp,
      description: "Quick messages",
      gradient: "from-green-50 to-green-100",
      hoverGradient: "hover:from-green-100 hover:to-green-200",
      iconBg: "bg-green-500",
      href: "#",
    },
    {
      name: "Telegram",
      icon: SiTelegram,
      description: "Updates & chat",
      gradient: "from-blue-50 to-blue-100",
      hoverGradient: "hover:from-blue-100 hover:to-blue-200",
      iconBg: "bg-blue-500",
      href: "#",
    },
    {
      name: "Instagram",
      icon: SiInstagram,
      description: "Visual updates",
      gradient: "from-pink-50 to-pink-100",
      hoverGradient: "hover:from-pink-100 hover:to-pink-200",
      iconBg: "bg-gradient-to-r from-purple-500 to-pink-500",
      href: "#",
    },
    {
      name: "Facebook",
      icon: SiFacebook,
      description: "Community posts",
      gradient: "from-blue-50 to-blue-100",
      hoverGradient: "hover:from-blue-100 hover:to-blue-200",
      iconBg: "bg-blue-600",
      href: "#",
    },
    {
      name: "LinkedIn",
      icon: SiLinkedin,
      description: "Professional network",
      gradient: "from-blue-50 to-blue-100",
      hoverGradient: "hover:from-blue-100 hover:to-blue-200",
      iconBg: "bg-blue-700",
      href: "#",
    },
    {
      name: "GitHub",
      icon: SiGithub,
      description: "Code repository",
      gradient: "from-gray-50 to-gray-100",
      hoverGradient: "hover:from-gray-100 hover:to-gray-200",
      iconBg: "bg-gray-800",
      href: "#",
    },
    {
      name: "YouTube",
      icon: SiYoutube,
      description: "Video content",
      gradient: "from-red-50 to-red-100",
      hoverGradient: "hover:from-red-100 hover:to-red-200",
      iconBg: "bg-red-600",
      href: "#",
    },
    {
      name: "X",
      icon: SiX,
      description: "Quick updates",
      gradient: "from-gray-50 to-gray-100",
      hoverGradient: "hover:from-gray-100 hover:to-gray-200",
      iconBg: "bg-black",
      href: "#",
    },
  ];

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Get in Touch
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Connect with us through your preferred platform
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Have questions, suggestions, or need help with the platform? We'd
              love to hear from you! Reach out through any of these social media
              channels, and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <CardContent className="flex items-center p-4">
                    <div
                      className={`${info.bgColor} p-3 rounded-lg mr-4`}
                    >
                      <info.icon className={`${info.iconColor} h-6 w-6`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {info.title}
                      </h3>
                      <p className="text-gray-600">{info.details}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Follow Us</h2>
            <div className="grid grid-cols-2 gap-4">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  className={`group p-6 bg-gradient-to-br ${platform.gradient} ${platform.hoverGradient} rounded-xl transition-all duration-300 transform hover:scale-105 block`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`${platform.iconBg} w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <platform.icon className="text-white text-2xl h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {platform.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
