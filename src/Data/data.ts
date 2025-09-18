import type { Expert, AnalysisResult } from "@/types/types";

export const experts: Expert[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Crop Disease Specialist",
    rating: 4.9,
    location: "Iowa, USA",
    experience: 15,
    price: "$50/consultation",
    avatar: "/api/placeholder/40/40",
    available: true,
    tags: ["Disease Control", "Organic Farming", "Corn", "Soybeans"],
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    specialty: "Soil & Nutrition Expert",
    rating: 4.8,
    location: "California, USA",
    experience: 20,
    price: "$65/consultation",
    avatar: "/api/placeholder/40/40",
    available: true,
    tags: [
      "Soil Health",
      "Fertilization",
      "Vegetables",
      "Sustainable Agriculture",
    ],
  },
  {
    id: "3",
    name: "Dr. Priya Patel",
    specialty: "Integrated Pest Management",
    rating: 4.7,
    location: "Texas, USA",
    experience: 12,
    price: "$45/consultation",
    avatar: "/api/placeholder/40/40",
    available: false,
    tags: ["Pest Control", "IPM", "Cotton", "Wheat"],
  },
];

export const analysisMockResults: AnalysisResult[] = [
  {
    disease: "Late Blight",
    confidence: 89,
    severity: "Moderate",
    recommendations: [
      "Apply fungicide containing copper or chlorothalonil",
      "Improve air circulation around plants",
      "Avoid overhead watering",
      "Remove affected leaves immediately",
    ],
  },
  {
    disease: "Powdery Mildew",
    confidence: 76,
    severity: "Mild",
    recommendations: [
      "Apply neem oil or baking soda solution",
      "Ensure proper spacing between plants",
      "Water at soil level, not on leaves",
      "Consider resistant varieties for next season",
    ],
  },
  {
    disease: "Healthy Plant",
    confidence: 94,
    severity: "None",
    recommendations: [
      "Continue current care routine",
      "Monitor regularly for any changes",
      "Maintain proper watering schedule",
      "Consider nutrient supplementation",
    ],
  },
];
