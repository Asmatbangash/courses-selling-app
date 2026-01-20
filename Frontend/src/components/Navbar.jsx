import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {Link} from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

useEffect(()=>{
  const token = localStorage.getItem("user")
  if(token){
   setIsLoggedIn(true)
  }else{
   setIsLoggedIn(false)
  }
},[])

  const handleLogOut = async() =>{
    try {
      const response = await axios.get('http://localhost:4000/api/v1/user/logOut',{withCredentials: true})
      toast.success(response.data.message)
      localStorage.removeItem('user');
      setIsLoggedIn(false)
    } catch (error) {
      toast.error(error.response.data.errors
)
      console.log(error)
    }
}

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="logo" className="h-8 w-8" />
            <span className="text-xl font-semibold">CSA</span>
          </div>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {
              isLoggedIn ? (<Button onClick={handleLogOut}>LogOut</Button> )  : (
              <>
            <Link to="/login">
            <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/sign-up">
            <Button>Sign Up</Button>
            </Link>
              </>
              )
            }
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-3">
               {
              isLoggedIn ? (<Button onClick={handleLogOut}>LogOut</Button> )  : (
              <>
            <Link to="/login">
            <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/sign-up">
            <Button>Sign Up</Button>
            </Link>
              </>
              )
            }
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
