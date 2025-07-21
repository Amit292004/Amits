import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Tag, MessageCircle, Send, RotateCcw } from "lucide-react";
import type { InsertFeedback } from "@shared/schema";

export default function Feedback() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InsertFeedback>({
    name: "",
    email: "",
    subject: "",
    message: "",
    newsletter: false,
  });

  const submitFeedback = useMutation({
    mutationFn: async (data: InsertFeedback) => {
      const response = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We'll get back to you soon.",
      });
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof InsertFeedback, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    submitFeedback.mutate(formData);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      newsletter: false,
    });
  };

  const feedbackStats = [
    {
      value: "250+",
      label: "Total Feedback",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      value: "45",
      label: "Features Implemented",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      value: "4.8",
      label: "Average Rating",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Share Your Feedback
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Help us improve Bounce Back Academy with your valuable suggestions
          </p>
        </div>

        <Card className="gradient-primary mb-16">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline mr-2 h-4 w-4 text-blue-600" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline mr-2 h-4 w-4 text-blue-600" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="inline mr-2 h-4 w-4 text-blue-600" />
                  Subject
                </Label>
                <Select
                  value={formData.subject || ""}
                  onValueChange={(value) => handleInputChange("subject", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="content">Content Request</SelectItem>
                    <SelectItem value="general">General Feedback</SelectItem>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageCircle className="inline mr-2 h-4 w-4 text-blue-600" />
                  Your Message *
                </Label>
                <Textarea
                  id="message"
                  required
                  rows={6}
                  placeholder="Share your thoughts, suggestions, or any issues you've encountered..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="resize-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => handleInputChange("newsletter", !!checked)}
                />
                <Label htmlFor="newsletter" className="text-sm text-gray-700">
                  I'd like to receive updates about new question papers and videos
                </Label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={submitFeedback.isPending}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {submitFeedback.isPending ? "Sending..." : "Send Feedback"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={resetForm}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Feedback Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {feedbackStats.map((stat, index) => (
            <Card key={index} className={stat.bgColor}>
              <CardContent className="text-center p-6">
                <div className={`text-3xl font-bold ${stat.textColor} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
