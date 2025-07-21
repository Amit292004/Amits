import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Code, Users, Heart } from "lucide-react";
import { SiReact, SiNodedotjs, SiTailwindcss } from "react-icons/si";

export default function About() {
  const missionStats = [
    { value: "100%", label: "Free Access" },
    { value: "24/7", label: "Available" },
    { value: "500+", label: "Resources" },
    { value: "5", label: "Classes Covered" },
  ];

  const amitSkills = [
    { name: "React.js", icon: SiReact, color: "text-blue-500" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
    { name: "Database Management", icon: Code, color: "text-orange-500" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-blue-400" },
  ];

  const amitAchievements = [
    { name: "Dean's List Student", icon: Trophy, color: "text-yellow-500" },
    { name: "Full-Stack Developer", icon: Code, color: "text-purple-500" },
    { name: "Community Contributor", icon: Users, color: "text-green-500" },
    { name: "Education Advocate", icon: Heart, color: "text-red-500" },
  ];

  const platformFeatures = [
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Built by a student who understands the real challenges and needs of NBSE exam preparation.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Heart,
      title: "Completely Free",
      description: "No hidden charges, no premium features. Everything is available for free to support student success.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Users,
      title: "Regularly Updated",
      description: "Fresh content added regularly to keep up with the latest NBSE patterns and requirements.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              About Bounce Back Academy
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Empowering NBSE students with quality educational resources
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Bounce Back Academy was created with a simple yet powerful mission: to
                provide every NBSE student with free access to quality educational
                resources. We believe that education should be accessible to all,
                regardless of economic background.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our platform offers comprehensive collections of previous year question
                papers and carefully curated concept-based YouTube videos, designed to
                help students excel in their examinations and develop a deeper
                understanding of their subjects.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {missionStats.map((stat, index) => (
                  <Card key={index} className="bg-white shadow-md">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Students learning and studying in a modern classroom environment"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                <Heart className="h-8 w-8" />
              </div>
            </div>
          </div>

          {/* Creator Profile */}
          <Card className="bg-white shadow-lg mb-20">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Meet the Creator
                </h2>
                <p className="text-gray-600">Built by a student, for students</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-1 text-center">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-xl">
                    <span className="text-white text-6xl font-bold">AS</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Amit Sharma
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    B.Tech CSE Student
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="sm">
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      GitHub
                    </Button>
                    <Button variant="outline" size="sm">
                      Twitter
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    About Amit
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    I'm Amit Sharma, a 3rd-year B.Tech Computer Science Engineering
                    student with a passion for education and technology. Having
                    personally experienced the challenges of finding quality study
                    materials for NBSE examinations, I was motivated to create a
                    platform that could help fellow students.
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Bounce Back Academy represents my commitment to giving back to the
                    student community. Through my technical skills and understanding of
                    student needs, I've built this platform to bridge the gap between
                    students and quality educational resources.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">
                        Technical Skills
                      </h5>
                      <div className="space-y-2">
                        {amitSkills.map((skill, index) => (
                          <div key={index} className="flex items-center">
                            <skill.icon className={`${skill.color} mr-2 h-5 w-5`} />
                            <span className="text-gray-700">{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">
                        Achievements
                      </h5>
                      <div className="space-y-2">
                        {amitAchievements.map((achievement, index) => (
                          <div key={index} className="flex items-center">
                            <achievement.icon
                              className={`${achievement.color} mr-2 h-5 w-5`}
                            />
                            <span className="text-gray-700">{achievement.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Features */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
              What Makes Us Different
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {platformFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`${feature.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <feature.icon className={`${feature.iconColor} h-8 w-8`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
