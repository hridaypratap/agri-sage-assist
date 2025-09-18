import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold">Agri Sage Assist</Link>
        <nav className="flex items-center gap-3">
          <SignedOut>
            <Button asChild variant="default">
              <Link to="/sign-in">Sign in</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
};


