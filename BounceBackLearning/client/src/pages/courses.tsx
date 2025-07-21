import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Courses() {
  const classes = [
    {
      number: "8",
      title: "Class 8",
      description: "Access Phase 1 & 2 question papers and concept videos for Class 8 subjects.",
      subjects: ["Math", "Science", "English", "Social"],
      phase: "Phase 1 & 2",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
    {
      number: "9",
      title: "Class 9",
      description: "Access Phase 1 & 2 question papers and concept videos for Class 9 subjects.",
      subjects: ["Math", "Science", "English", "Social"],
      phase: "Phase 1 & 2",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100",
      textColor: "text-green-700",
    },
    {
      number: "10",
      title: "Class 10",
      description: "Complete NBSE Class 10 question papers and comprehensive video explanations.",
      subjects: ["Math", "Science", "English", "Social"],
      phase: "Board Exam",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-100",
      textColor: "text-purple-700",
    },
    {
      number: "11",
      title: "Class 11",
      description: "Stream-wise question papers and videos for Science, Commerce, and Arts.",
      subjects: ["Science", "Commerce", "Arts"],
      phase: "Stream-wise",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-100",
      textColor: "text-orange-700",
    },
    {
      number: "12",
      title: "Class 12",
      description: "Complete NBSE Class 12 question papers and videos organized by stream.",
      subjects: ["Science", "Commerce", "Arts"],
      phase: "Board Exam",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-100",
      textColor: "text-red-700",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Browse by Class
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Select your class to access relevant study materials
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls) => (
            <Link key={cls.number} href={`/question-papers?class=${cls.number}`}>
              <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-full">
                <CardContent className="p-8">
                  <div
                    className={`bg-gradient-to-br ${cls.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <span className="text-white text-2xl font-bold">
                      {cls.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {cls.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{cls.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cls.subjects.map((subject) => (
                      <span
                        key={subject}
                        className={`${cls.bgColor} ${cls.textColor} px-3 py-1 rounded-full text-sm`}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{cls.phase}</span>
                    <ArrowRight className="text-blue-600 group-hover:translate-x-2 transition-transform h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
