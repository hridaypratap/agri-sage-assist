export type Lang = "en" | "ml";

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Global
    "lang.english": "English",
    "lang.malayalam": "Malayalam",

    // HeroSection
    "hero.title.leading": "AI-Powered Farm",
    "hero.title.trailing": "Advisory",
    "hero.subtitle":
      "Get instant answers to farming questions, disease identification from photos, and connect with agricultural experts - all powered by advanced AI technology.",
    "hero.cta.getStarted": "Get Started Now",
    "hero.cta.expert": "Talk to an Expert",
    "hero.card.chat.title": "AI Chat Support",
    "hero.card.chat.desc": "Get instant answers to common farming questions",
    "hero.card.chat.button": "Start Chat",
    "hero.card.image.title": "Disease Detection",
    "hero.card.image.desc":
      "Upload crop photos for AI-powered pest & disease identification",
    "hero.card.image.button": "Upload Photo",
    "hero.card.voice.title": "Voice Input",
    "hero.card.voice.desc":
      "Ask questions using voice for hands-free operation",
    "hero.card.voice.button": "Voice Query",
    "hero.card.expert.title": "Expert Connect",
    "hero.card.expert.desc":
      "Connect with agricultural experts for complex issues",
    "hero.card.expert.button": "Find Expert",

    // Chat
    "chat.header": "AI Farm Assistant",
    "chat.placeholder": "Ask about crops, pests, soil, weather...",
    "chat.greeting":
      "Hello! I'm your AI farming assistant. I can help you with crop management, pest control, soil health, and more. What would you like to know?",
    "chat.voice.listening.title": "Listening...",
    "chat.voice.listening.desc": "Speak your question now",
    "chat.voice.error.title": "Voice input error",
    "chat.voice.error.desc": "Please try again or type your question",
    "chat.voice.unsupported.title": "Voice input not supported",
    "chat.voice.unsupported.desc": "Please type your question instead",

    // Image Upload
    "image.header": "Disease Detection",
    "image.upload.title": "Upload Plant Photo",
    "image.upload.desc":
      "Drop an image here or click to select from your device",
    "image.upload.button": "Choose Image",
    "image.analyzing": "Analyzing image...",
    "image.analysis.complete": "Analysis Complete",
    "image.analysis.detected": "Detected",
    "image.another": "Upload Another",
    "image.analyze": "Analyze Image",
    "image.invalidFile.title": "Invalid file type",
    "image.invalidFile.desc": "Please select an image file",

    // Expert
    "expert.header": "Connect with Agricultural Experts",
    "expert.choose.title": "Choose an Expert",
    "expert.choose.desc": "Select a specialist who matches your farming needs",
    "expert.available": "Available",
    "expert.busy": "Busy",
    "expert.years": "years exp.",
    "expert.change": "Change Expert",
    "expert.form.subject": "Consultation Subject *",
    "expert.form.description": "Detailed Description *",
    "expert.form.urgency": "Urgency Level",
    "expert.form.time": "Preferred Contact Time",
    "expert.form.request": "Request Consultation",
    "expert.form.submitting": "Submitting...",
    "expert.form.back": "Back",
    "expert.toast.notAvailable.title": "Expert not available",
    "expert.toast.notAvailable.desc":
      "This expert is currently not available. Please try another expert.",
    "expert.toast.missing.title": "Missing information",
    "expert.toast.missing.desc": "Please fill in all required fields",
    "expert.toast.sent.title": "Consultation request sent!",
    "expert.toast.sent.desc": "will contact you within 24 hours.",
    "expert.howItWorks.title": "How it works:",
    "expert.howItWorks.desc":
      "The expert will review your request and contact you via phone or video call within 24 hours.",

    // Language Switcher
    "lang.switch": "Language",
  },
  ml: {
    // Global
    "lang.english": "ഇംഗ്ലീഷ്",
    "lang.malayalam": "മലയാളം",

    // HeroSection
    "hero.title.leading": "എ.ഐ. അധിഷ്ഠിത കൃഷി",
    "hero.title.trailing": "ഉപദേശം",
    "hero.subtitle":
      "കൃഷിയുമായി ബന്ധപ്പെട്ട ചോദ്യങ്ങൾക്ക് ഉടൻ മറുപടി, ഫോട്ടോകളിൽ നിന്ന് രോഗനിർണ്ണയം, കൂടാതെ കാർഷിക വിദഗ്ധരുമായി ബന്ധപ്പെടുക — എല്ലാം ആധുനിക എ.ഐ. ഉപയോഗിച്ച്.",
    "hero.cta.getStarted": "ഇപ്പോൾ തുടങ്ങാം",
    "hero.cta.expert": "വിദഗ്ധനുമായി സംസാരിക്കുക",
    "hero.card.chat.title": "എ.ഐ. ചാറ്റ് സഹായം",
    "hero.card.chat.desc": "സാധാരണ കൃഷി ചോദ്യങ്ങൾക്ക് ഉടൻ മറുപടി നേടുക",
    "hero.card.chat.button": "ചാറ്റ് തുടങ്ങുക",
    "hero.card.image.title": "രോഗ നിർണ്ണയം",
    "hero.card.image.desc":
      "എ.ഐ. ഉപയോഗിച്ച് കീട-രോഗങ്ങൾ തിരിച്ചറിയാൻ വിളകളുടെ ഫോട്ടോകൾ അപ്ലോഡ് ചെയ്യുക",
    "hero.card.image.button": "ഫോട്ടോ അപ്ലോഡ് ചെയ്യുക",
    "hero.card.voice.title": "വോയ്സ് ഇൻപുട്ട്",
    "hero.card.voice.desc": "കൈകൾ ഉപയോഗിക്കാതെ ശബ്ദം ഉപയോഗിച്ച് ചോദിക്കാം",
    "hero.card.voice.button": "വോയ്സ് ചോദ്യം",
    "hero.card.expert.title": "വിദഗ്ധ ബന്ധം",
    "hero.card.expert.desc":
      "സങ്കീർണ്ണ വിഷയങ്ങൾക്ക് കാർഷിക വിദഗ്ധരുമായി ബന്ധപ്പെടുക",
    "hero.card.expert.button": "വിദഗ്ധനെ കണ്ടെത്തുക",

    // Chat
    "chat.header": "എ.ഐ. കൃഷി സഹായി",
    "chat.placeholder":
      "വിളകൾ, കീടങ്ങൾ, മണ്ണ്, കാലാവസ്ഥ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...",
    "chat.greeting":
      "ഹലോ! ഞാൻ നിങ്ങളുടെ എ.ഐ. കൃഷി സഹായി. വിള പരിപാലനം, കീടനിയന്ത്രണം, മണ്ണ് ആരോഗ്യo മുതലായവയിൽ സഹായിക്കാം. എന്ത് അറിയണം?",
    "chat.voice.listening.title": "കേൾക്കുന്നു...",
    "chat.voice.listening.desc": "ഇപ്പോൾ സംസാരിക്കൂ",
    "chat.voice.error.title": "വോയ്സ് ഇൻപുട്ടിൽ പിശക്",
    "chat.voice.error.desc":
      "ദയവായി വീണ്ടും ശ്രമിക്കുകയോ ടൈപ്പ് ചെയ്യുകയോ ചെയ്യൂ",
    "chat.voice.unsupported.title": "വോയ്സ് ഇൻപുട്ട് പിന്തുണയില്ല",
    "chat.voice.unsupported.desc": "ദയവായി ടൈപ്പ് ചെയ്ത് ചോദിക്കുക",

    // Image Upload
    "image.header": "രോഗ നിർണ്ണയം",
    "image.upload.title": "ചെടിയുടെ ഫോട്ടോ അപ്ലോഡ് ചെയ്യുക",
    "image.upload.desc":
      "ഇവിടെ ചിത്രം ഇടുക അല്ലെങ്കിൽ ഉപകരണത്തിൽ നിന്ന് തിരഞ്ഞെടുക്കുക",
    "image.upload.button": "ചിത്രം തിരഞ്ഞെടുക്കുക",
    "image.analyzing": "ചിത്രം വിശകലനം ചെയ്യുന്നു...",
    "image.analysis.complete": "വിശകലനം പൂർത്തിയായി",
    "image.analysis.detected": "കണ്ടെത്തിയത്",
    "image.another": "മറ്റൊന്ന് അപ്ലോഡ് ചെയ്യുക",
    "image.analyze": "ചിത്രം വിശകലനം ചെയ്യുക",
    "image.invalidFile.title": "അസാധുവായ ഫയൽ തരം",
    "image.invalidFile.desc": "ദയവായി ഒരു ചിത്രം തിരഞ്ഞെടുക്കുക",

    // Expert
    "expert.header": "കാർഷിക വിദഗ്ധരുമായി ബന്ധപ്പെടുക",
    "expert.choose.title": "ഒരു വിദഗ്ധനെ തിരഞ്ഞെടുക്കുക",
    "expert.choose.desc":
      "നിങ്ങളുടെ കൃഷി ആവശ്യങ്ങൾക്ക് അനുയോജ്യനായ വിദഗ്ധനെ തിരഞ്ഞെടുക്കുക",
    "expert.available": "ലഭ്യം",
    "expert.busy": "തിരക്കിലാണ്",
    "expert.years": "വർഷം പരിചയം",
    "expert.change": "വിദഗ്ധനെ മാറ്റുക",
    "expert.form.subject": "കൺസൾട്ടേഷൻ വിഷയം *",
    "expert.form.description": "വിശദീകരണം *",
    "expert.form.urgency": "അർജൻസി ലെവൽ",
    "expert.form.time": "മേൽപ്പറഞ്ഞ സമയമാഗ്രഹിക്കുന്നു",
    "expert.form.request": "കൺസൾട്ടേഷൻ അഭ്യർത്ഥിക്കുക",
    "expert.form.submitting": "സമർപ്പിക്കുന്നു...",
    "expert.form.back": "തിരികെ",
    "expert.toast.notAvailable.title": "വിദഗ്ധൻ ലഭ്യമല്ല",
    "expert.toast.notAvailable.desc":
      "ഈ വിദഗ്ധൻ ഇപ്പോൾ ലഭ്യമല്ല. ദയവായി മറ്റൊരാളെ ശ്രമിക്കുക.",
    "expert.toast.missing.title": "വിവരങ്ങൾ ലഭ്യമല്ല",
    "expert.toast.missing.desc":
      "ദയവായി ആവശ്യമായ എല്ലാ ഫീൽഡുകളും പൂരിപ്പിക്കുക",
    "expert.toast.sent.title": "അഭ്യർത്ഥന അയച്ചു!",
    "expert.toast.sent.desc": "24 മണിക്കൂറിനുള്ളിൽ നിങ്ങളെ ബന്ധപ്പെടും.",
    "expert.howItWorks.title": "എങ്ങനെ പ്രവർത്തിക്കുന്നു:",
    "expert.howItWorks.desc":
      "വിദഗ്ധൻ നിങ്ങളുടെ അഭ്യർത്ഥന പരിശോധിച്ച് 24 മണിക്കൂറിനുള്ളിൽ ഫോൺ അല്ലെങ്കിൽ വീഡിയോ കോളിലൂടെ ബന്ധപ്പെടും.",

    // Language Switcher
    "lang.switch": "ഭാഷ",
  },
};
