import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Video, Smartphone, Filter, Download, GraduationCap } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: FileText,
      title: "Previous Year Papers",
      description: "Complete collection of NBSE question papers from Class 8-12, organized by year and subject for easy access.",
      gradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-600",
    },
    {
      icon: Video,
      title: "Concept Videos",
      description: "Curated YouTube videos explaining key concepts, categorized by class and subject for targeted learning.",
      gradient: "from-green-50 to-green-100",
      iconBg: "bg-green-600",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Access your study materials anywhere, anytime with our fully responsive design optimized for all devices.",
      gradient: "from-orange-50 to-orange-100",
      iconBg: "bg-orange-600",
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description: "Advanced filtering options to find exactly what you need - by class, subject, year, and exam phase.",
      gradient: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-600",
    },
    {
      icon: Download,
      title: "Easy Downloads",
      description: "Download PDFs instantly for offline study. No registration required, completely free access to all materials.",
      gradient: "from-pink-50 to-pink-100",
      iconBg: "bg-pink-600",
    },
    {
      icon: GraduationCap,
      title: "Student Built",
      description: "Created by a B.Tech CSE student who understands your needs and challenges in NBSE preparation.",
      gradient: "from-indigo-50 to-indigo-100",
      iconBg: "bg-indigo-600",
    },
  ];

  const stats = [
    { value: "500+", label: "Question Papers" },
    { value: "200+", label: "Concept Videos" },
    { value: "5", label: "Classes Covered" },
    { value: "12", label: "Subjects Available" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Gateway to{" "}
                <span className="text-gradient">NBSE Success</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Access comprehensive NBSE previous year question papers and
                concept-based YouTube videos for Class 8-12. Prepare smarter,
                perform better.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/question-papers">
                  <Button size="lg" className="w-full sm:w-auto">
                    <FileText className="mr-2 h-5 w-5" />
                    Browse Question Papers
                  </Button>
                </Link>
                <Link href="/videos">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Watch Videos
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Students collaborating and studying together"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-green-500 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">2000+</div>
                <div className="text-sm opacity-90">Happy Students</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-orange-500 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-90">Question Papers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose Bounce Back Academy?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to excel in your NBSE examinations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${feature.gradient} border-0 shadow-lg hover:shadow-xl transition-shadow`}
              >
                <CardContent className="p-8">
                  <div
                    className={`${feature.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}
                  >
                    <feature.icon className="text-white text-2xl h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
