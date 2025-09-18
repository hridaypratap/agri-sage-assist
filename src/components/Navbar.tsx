import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? "text-foreground bg-muted"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-semibold">
            Agri Sage Assist
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navItemClass}>
            Home
          </NavLink>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-2 flex flex-col">
            <NavLink
              to="/"
              className={navItemClass}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
