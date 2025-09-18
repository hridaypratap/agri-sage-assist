import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Navbar = () => {
  const hasClerk = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold">
          Agri Sage Assist
        </Link>
        <nav className="flex items-center gap-3">
          <LanguageSwitcher />
          {hasClerk ? (
            <>
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
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
};
