import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ChatInterface } from "@/components/ChatInterface";
import { ImageUpload } from "@/components/ImageUpload";
import { ExpertConnect } from "@/components/ExpertConnect";

const Index = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const requireAuthOr = (fn: () => void) => {
    if (!isSignedIn) {
      navigate('/sign-in');
      return;
    }
    fn();
  };

  const handleStartChat = () => requireAuthOr(() => setActiveComponent('chat'));
  const handleImageUpload = () => requireAuthOr(() => setActiveComponent('image'));
  const handleVoiceInput = () => requireAuthOr(() => setActiveComponent('chat')); // Opens chat with voice capability
  const handleExpertConnect = () => requireAuthOr(() => setActiveComponent('expert'));
  const handleClose = () => setActiveComponent(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
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
