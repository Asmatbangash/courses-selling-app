import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        
        <div className="grid gap-8 md:grid-cols-3">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="logo" className="h-8 w-8" />
              <span className="text-xl font-semibold">CSA</span>
            </div>
            <p className="text-sm text-gray-600">
              Building modern web experiences with speed and simplicity.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer">Home</li>
              <li className="hover:text-black cursor-pointer">About</li>
              <li className="hover:text-black cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase text-gray-900">
              Account
            </h3>
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start px-0">
                Login
              </Button>
              <Button variant="ghost" className="justify-start px-0">
                Sign Up
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Courses. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
