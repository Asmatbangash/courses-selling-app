import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  BookCheck,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin?.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const menu = [
    { name: "Home", icon: Home, path: "/admin/dashboard" },
    { name: "Our-Courses", icon: BookOpen, path: "/admin/our-courses" },
    { name: "Create-Course", icon: BookCheck, path: "/admin/create-course" },
  ];

   const handleLogOut = async() =>{
      try {
        const response = await axios.get('http://localhost:4000/api/v1/admin/logOut',{withCredentials: true})
        toast.success(response.data.message)
        localStorage.removeItem('admin');
        setIsLoggedIn(false)
      } catch (error) {
        console.log(error)
      
      }
  }
  

  return (
    <>
      <div className="md:hidden absolute top-0 border-b bg-white">
        <Button variant="ghost" onClick={() => setOpen(true)}>
          <Menu />
        </Button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 min-h-screen w-64 bg-white border-r z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold ms-8">I'm Admin</h2>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menu.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
         {
              isLoggedIn ? (<Button className="w-full" onClick={handleLogOut} variant="destructive"><LogOut />LogOut</Button> )  : (
              <>
            <Link to="/admin/login">
            <Button className="w-full"><LogIn />Login</Button>
            </Link>
              </>
              )
            }
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
