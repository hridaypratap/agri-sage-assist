import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Camera, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ModalOverlay } from "@/components/ModalOverlay";
import { analysisMockResults } from "@/Data/data";
import type { AnalysisResult } from "@/types/types";
import { useI18n } from "@/i18n/useI18n";

interface ImageUploadProps {
  onClose: () => void;
}

// Using shared AnalysisResult type from src/types/types

export const ImageUpload = ({ onClose }: ImageUploadProps) => {
  const { t } = useI18n();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    if (file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysisResult(null);
    } else {
      toast({
        title: t("image.invalidFile.title"),
        description: t("image.invalidFile.desc"),
        variant: "destructive",
      });
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call delay
    setTimeout(() => {
      clearInterval(progressInterval);
      setAnalysisProgress(100);

      const result: AnalysisResult =
        analysisMockResults[
          Math.floor(Math.random() * analysisMockResults.length)
        ];
      setAnalysisResult(result);
      setIsAnalyzing(false);

      toast({
        title: t("image.analysis.complete"),
        description: `${t("image.analysis.detected")}: ${result.disease} (${
          result.confidence
        }% confidence)`,
      });
    }, 3000);
  };

  const reset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setAnalysisProgress(0);
    setIsAnalyzing(false);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-earth mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-earth text-primary-foreground">
          <div className="flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <h3 className="font-semibold">{t("image.header")}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Upload Area */}
          {!imagePreview ? (
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleFileInputClick}
            >
              <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t("image.upload.title")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t("image.upload.desc")}
              </p>
              <Button variant="wheat">
                <Upload className="h-4 w-4 mr-2" />
                {t("image.upload.button")}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && handleImageSelect(e.target.files[0])
                }
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Selected plant"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={reset}
                  className="absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {t("image.analyzing")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {analysisProgress}%
                    </span>
                  </div>
                  <Progress value={analysisProgress} className="w-full" />
                </div>
              )}

              {/* Analysis Results */}
              {analysisResult && (
                <Card className="p-4 bg-muted/50">
                  <div className="flex items-start space-x-3">
                    {analysisResult.disease === "Healthy Plant" ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-600 mt-1" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">
                        {analysisResult.disease}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Confidence: {analysisResult.confidence}% | Severity:{" "}
                        {analysisResult.severity}
                      </p>
                      <div>
                        <h5 className="font-medium mb-2">Recommendations:</h5>
                        <ul className="space-y-1">
                          {analysisResult.recommendations.map((rec, index) => (
                            <li
                              key={index}
                              className="text-sm text-muted-foreground flex items-start"
                            >
                              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {!analysisResult && !isAnalyzing && (
                  <Button
                    variant="earth"
                    onClick={analyzeImage}
                    className="flex-1"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {t("image.analyze")}
                  </Button>
                )}
                <Button variant="outline" onClick={reset}>
                  {t("image.another")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ModalOverlay>
  );
};
