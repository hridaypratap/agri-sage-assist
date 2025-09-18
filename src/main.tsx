import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as
  | string
  | undefined;

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element with id 'root' not found");
}
const root = createRoot(rootEl);

if (clerkPublishableKey) {
  root.render(
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <App />
    </ClerkProvider>
  );
} else {
  // Fallback: run app without Clerk if no key is configured
  root.render(<App />);
}
