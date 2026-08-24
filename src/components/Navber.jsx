"use client";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const links = [
  { href: "/", label: "Home" },
  { href: "/all-appointments", label: "All Appointments" },
  { href: "/pricing", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" bg-white shadow-sm">
      <nav className="flex justify-between items-center py-3 px-4 max-w-7xl mx-auto w-full">
        
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-8"
          />
          <h3 className="font-extrabold text-xl text-blue-600">Medical</h3>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-blue-600 transition">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Section (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/signup" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Sign Up
          </Link>
          <Link href="/signin" className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
            Sign In
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t shadow-sm px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-blue-600 transition"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
            <Link
              href="/signin"
              onClick={() => setIsOpen(false)}
              className="rounded-md border border-blue-600 px-4 py-2 text-center text-blue-600 hover:bg-blue-50 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
