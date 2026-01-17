import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  BookCheck,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Courses", icon: BookOpen, path: "/courses" },
    { name: "Purchases", icon: BookCheck, path: "/buy-courses" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <>
       {/* Mobile Navbar  */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-white">
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
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white border-r z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold ms-8">CSA</h2>
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
          <Button
            variant="destructive"
            className="w-full flex gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
