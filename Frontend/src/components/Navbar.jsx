import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogOut = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/user/logOut",
        { withCredentials: true }
      );

      toast.success(res.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.errors || "Logout failed");
    }
  };

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="h-10 w-10 rounded-full" />
            <span className="text-xl font-semibold">CSA</span>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <Button onClick={handleLogOut}>Logout</Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-3">
              {isLoggedIn ? (
                <Button onClick={handleLogOut}>Logout</Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
