import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-semibold transition ${
    isActive ? "bg-teal-100 text-teal-700" : "text-slate-700 hover:text-teal-700 hover:bg-white"
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/75 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white">
            CM
          </span>
          <div>
            <p className="text-sm font-semibold leading-none text-slate-800">CodeMentor AI</p>
            <p className="text-xs text-slate-500">DSA with guided AI feedback</p>
          </div>
        </Link>

        <button
          type="button"
          className="rounded-md border border-slate-200 p-2 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {!isAuthenticated && (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <Link
                to="/signup"
                className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                Create Account
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                {user?.name || "Learner"}
              </span>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/solve" className={linkClass}>
                Solve
              </NavLink>
              <NavLink to="/tools" className={linkClass}>
                Tools
              </NavLink>
              <button
                type="button"
                onClick={logout}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-400 hover:text-rose-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            {!isAuthenticated && (
              <>
                <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>
                  Login
                </NavLink>
                <Link
                  to="/signup"
                  className="rounded-md bg-teal-700 px-4 py-2 text-center text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Create Account
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>
                  Dashboard
                </NavLink>
                <NavLink to="/solve" className={linkClass} onClick={() => setOpen(false)}>
                  Solve
                </NavLink>
                <NavLink to="/tools" className={linkClass} onClick={() => setOpen(false)}>
                  Tools
                </NavLink>
                <button
                  type="button"
                  className="rounded-md border border-slate-300 px-4 py-2 text-left text-sm font-semibold text-slate-700"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
