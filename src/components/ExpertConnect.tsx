import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Phone, Mail, X, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ModalOverlay } from "@/components/ModalOverlay";
import type { Expert } from "@/types/types";
import { experts } from "@/Data/data";
import { useI18n } from "@/i18n/useI18n";

interface ExpertConnectProps {
  onClose: () => void;
}

// Data moved to src/Data/data.ts

export const ExpertConnect = ({ onClose }: ExpertConnectProps) => {
  const { t } = useI18n();
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [consultationForm, setConsultationForm] = useState({
    subject: "",
    description: "",
    urgency: "normal" as "low" | "normal" | "high",
    preferredTime: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleExpertSelect = (expert: Expert) => {
    if (!expert.available) {
      toast({
        title: t('expert.toast.notAvailable.title'),
        description: t('expert.toast.notAvailable.desc'),
        variant: "destructive",
      });
      return;
    }
    setSelectedExpert(expert);
  };

  const handleSubmitConsultation = async () => {
    if (!consultationForm.subject || !consultationForm.description) {
      toast({
        title: t('expert.toast.missing.title'),
        description: t('expert.toast.missing.desc'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: t('expert.toast.sent.title'),
        description: `${selectedExpert?.name} ${t('expert.toast.sent.desc')}`,
      });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <ModalOverlay onClose={onClose}>
        <Card className="w-full max-w-md p-6 text-center shadow-earth mx-auto">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t('expert.toast.sent.title')}</h3>
          <p className="text-muted-foreground mb-4">
            {selectedExpert?.name} {t('expert.howItWorks.desc')}
          </p>
          <Button onClick={onClose} variant="earth" className="w-full">
            {t('expert.form.back')}
          </Button>
        </Card>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClose={onClose}>
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-earth mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-earth text-primary-foreground">
          <h3 className="text-xl font-semibold">{t('expert.header')}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          {!selectedExpert ? (
            // Expert Selection
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">{t('expert.choose.title')}</h4>
                <p className="text-muted-foreground">{t('expert.choose.desc')}</p>
              </div>

              <div className="grid gap-4">
                {experts.map((expert) => (
                  <Card
                    key={expert.id}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-soft ${
                      !expert.available ? "opacity-60" : "hover:scale-[1.02]"
                    }`}
                    onClick={() => handleExpertSelect(expert)}
                  >
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={expert.avatar} alt={expert.name} />
                        <AvatarFallback>
                          {expert.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-semibold">{expert.name}</h5>
                            <p className="text-sm text-muted-foreground">
                              {expert.specialty}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{expert.rating}</span>
                            </div>
                            <p className="text-sm font-semibold text-accent">
                              {expert.price}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{expert.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              {expert.experience} {t('expert.years')}
                            </span>
                          </div>
                          <Badge
                            variant={expert.available ? "default" : "secondary"}
                          >
                            {expert.available ? t('expert.available') : t('expert.busy')}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {expert.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Consultation Form
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={selectedExpert.avatar}
                    alt={selectedExpert.name}
                  />
                  <AvatarFallback>
                    {selectedExpert.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{selectedExpert.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedExpert.specialty}
                  </p>
                  <p className="text-sm font-medium text-accent">
                    {selectedExpert.price}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedExpert(null)}
                >
                  {t('expert.change')}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('expert.form.subject')}</label>
                  <Input
                    placeholder="e.g., Leaf spot disease on tomatoes"
                    value={consultationForm.subject}
                    onChange={(e) =>
                      setConsultationForm((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t('expert.form.description')}</label>
                  <Textarea
                    placeholder="Describe your farming issue in detail, including symptoms, affected area, timeline, etc."
                    rows={4}
                    value={consultationForm.description}
                    onChange={(e) =>
                      setConsultationForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('expert.form.urgency')}</label>
                    <select
                      className="w-full p-2 border rounded-md bg-background"
                      value={consultationForm.urgency}
                      onChange={(e) => {
                        const v = e.target.value as "low" | "normal" | "high";
                        setConsultationForm((prev) => ({
                          ...prev,
                          urgency: v,
                        }));
                      }}
                    >
                      <option value="low">Low - General advice</option>
                      <option value="normal">
                        Normal - Standard consultation
                      </option>
                      <option value="high">High - Urgent farming issue</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">{t('expert.form.time')}</label>
                    <Input
                      type="datetime-local"
                      value={consultationForm.preferredTime}
                      onChange={(e) =>
                        setConsultationForm((prev) => ({
                          ...prev,
                          preferredTime: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-muted/30 rounded-lg">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">{t('expert.howItWorks.title')}</p>
                    <p className="text-muted-foreground">{t('expert.howItWorks.desc')}</p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="earth"
                    onClick={handleSubmitConsultation}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? t('expert.form.submitting') : t('expert.form.request')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedExpert(null)}
                  >
                    {t('expert.form.back')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ModalOverlay>
  );
};
