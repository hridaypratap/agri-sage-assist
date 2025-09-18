import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Camera, MessageCircle, Users } from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";
import { useI18n } from "@/i18n/useI18n";

interface HeroSectionProps {
  onStartChat: () => void;
  onImageUpload: () => void;
  onVoiceInput: () => void;
  onExpertConnect: () => void;
}

export const HeroSection = ({ onStartChat, onImageUpload, onVoiceInput, onExpertConnect }: HeroSectionProps) => {
  const { t } = useI18n();
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-field opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('hero.title.leading')}
            <span className="bg-gradient-earth bg-clip-text text-transparent"> {t('hero.title.trailing')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-card/90 backdrop-blur-sm hover:shadow-earth transition-all duration-300 hover:transform hover:scale-105">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-gradient-earth rounded-full">
                <MessageCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">{t('hero.card.chat.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('hero.card.chat.desc')}
              </p>
              <Button variant="earth" size="sm" onClick={onStartChat}>
                {t('hero.card.chat.button')}
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-card/90 backdrop-blur-sm hover:shadow-earth transition-all duration-300 hover:transform hover:scale-105">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-accent rounded-full">
                <Camera className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">{t('hero.card.image.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('hero.card.image.desc')}
              </p>
              <Button variant="wheat" size="sm" onClick={onImageUpload}>
                {t('hero.card.image.button')}
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-card/90 backdrop-blur-sm hover:shadow-earth transition-all duration-300 hover:transform hover:scale-105">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-sage-green rounded-full">
                <Mic className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">{t('hero.card.voice.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('hero.card.voice.desc')}
              </p>
              <Button variant="sage" size="sm" onClick={onVoiceInput}>
                {t('hero.card.voice.button')}
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-card/90 backdrop-blur-sm hover:shadow-earth transition-all duration-300 hover:transform hover:scale-105">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-earth-brown rounded-full">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">{t('hero.card.expert.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('hero.card.expert.desc')}
              </p>
              <Button variant="outline" size="sm" onClick={onExpertConnect}>
                {t('hero.card.expert.button')}
              </Button>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="earth" onClick={onStartChat}>
              {t('hero.cta.getStarted')}
            </Button>
            <Button size="lg" variant="outline" onClick={onExpertConnect}>
              {t('hero.cta.expert')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};