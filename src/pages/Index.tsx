import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ChatInterface } from "@/components/ChatInterface";
import { ImageUpload } from "@/components/ImageUpload";
import { ExpertConnect } from "@/components/ExpertConnect";

const Index = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const handleStartChat = () => setActiveComponent('chat');
  const handleImageUpload = () => setActiveComponent('image');
  const handleVoiceInput = () => setActiveComponent('chat'); // Opens chat with voice capability
  const handleExpertConnect = () => setActiveComponent('expert');
  const handleClose = () => setActiveComponent(null);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        onStartChat={handleStartChat}
        onImageUpload={handleImageUpload}
        onVoiceInput={handleVoiceInput}
        onExpertConnect={handleExpertConnect}
      />
      
      {activeComponent === 'chat' && <ChatInterface onClose={handleClose} />}
      {activeComponent === 'image' && <ImageUpload onClose={handleClose} />}
      {activeComponent === 'expert' && <ExpertConnect onClose={handleClose} />}
    </div>
  );
};

export default Index;
