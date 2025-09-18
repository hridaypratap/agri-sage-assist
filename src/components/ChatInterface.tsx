import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Send, Bot, User, ArrowUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ModalOverlay } from "@/components/ModalOverlay";
import { useI18n } from "@/i18n/useI18n";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatInterfaceProps {
  onClose: () => void;
}

export const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const { t } = useI18n();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: t("chat.greeting"),
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your question about crop management, I'd recommend checking soil moisture levels first. What specific crop are you working with?",
        "For pest control, it's important to identify the pest correctly. Can you describe what you're seeing or upload a photo?",
        "Soil health is crucial for good yields. Have you tested your soil pH recently? Most crops prefer a pH between 6.0-7.0.",
        "Weather conditions play a big role in farming decisions. What's your local weather forecast looking like?",
        "That's a great question! For more complex issues like this, I'd recommend connecting with one of our agricultural experts. Would you like me to arrange that?",
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    type ISpeechRecognition = {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      start: () => void;
      stop: () => void;
      onstart?: () => void;
      onresult?: (event: {
        results: ArrayLike<{ 0: { transcript: string } }>;
      }) => void;
      onerror?: (event: unknown) => void;
      onend?: () => void;
    };

    const w = window as unknown as {
      webkitSpeechRecognition?: unknown;
      SpeechRecognition?: unknown;
    };
    const hasSpeech =
      typeof w.webkitSpeechRecognition === "function" ||
      typeof w.SpeechRecognition === "function";
    if (!hasSpeech) {
      toast({
        title: t("chat.voice.unsupported.title"),
        description: t("chat.voice.unsupported.desc"),
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognitionCtor =
      (w.webkitSpeechRecognition as
        | (new () => ISpeechRecognition)
        | undefined) ??
      (w.SpeechRecognition as (new () => ISpeechRecognition) | undefined);
    if (!SpeechRecognitionCtor) return;
    const recognition = new SpeechRecognitionCtor();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: t("chat.voice.listening.title"),
        description: t("chat.voice.listening.desc"),
      });
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: t("chat.voice.error.title"),
        description: t("chat.voice.error.desc"),
        variant: "destructive",
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <ModalOverlay onClose={onClose}>
      <Card className="w-full max-w-2xl h-[600px] flex flex-col shadow-earth mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-earth text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-semibold">{t("chat.header")}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowUp className="h-4 w-4 rotate-45" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "bot" && (
                      <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                    )}
                    {message.sender === "user" && (
                      <User className="h-4 w-4 mt-1 flex-shrink-0" />
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t("chat.placeholder")}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleVoiceInput}
              disabled={isListening}
              className={isListening ? "bg-accent" : ""}
            >
              <Mic
                className={`h-4 w-4 ${
                  isListening ? "text-accent-foreground" : ""
                }`}
              />
            </Button>
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </ModalOverlay>
  );
};
