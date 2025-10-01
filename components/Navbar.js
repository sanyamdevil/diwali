"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-900 via-black to-pink-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-extrabold text-yellow-400 drop-shadow-lg">
          🎇 Cracker
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, color: "#FFD700" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href={item.href} className="text-white font-semibold hover:text-yellow-300">
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-r from-purple-800 via-black to-pink-800 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, color: "#FFD700" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className="text-white text-lg font-semibold hover:text-yellow-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
