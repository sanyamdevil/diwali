"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Facebook, Youtube, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-purple-950 to-pink-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        
        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-bold text-yellow-300 mb-3">🎇 Cracker </h3>
          <p className="text-sm leading-relaxed">
            Bringing joy and sparkle to your Diwali with premium, safe & certified crackers.  
            Handled with care, delivered with love. ✨
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <h3 className="text-xl font-bold text-yellow-300 mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link href="/shop" className="hover:text-yellow-400 transition">Shop</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left"
        >
          <h3 className="text-xl font-bold text-yellow-300 mb-3">Follow Us</h3>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link href="https://www.instagram.com/g.aura.vvvv?igsh=NWRxOWV5YzFtN3Rl" target="_blank" className="hover:text-pink-400">
              <Instagram size={24} />
            </Link>
            <Link href="https://facebook.com" target="_blank" className="hover:text-blue-400">
              <Facebook size={24} />
            </Link>
            <Link href="https://wa.me/918168585528" target="_blank" className="hover:text-green-400">
              <MessageCircle size={24} />
            </Link>
            <Link href="https://youtube.com" target="_blank" className="hover:text-red-500">
              <Youtube size={24} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Cracker  | Designed by <span className="text-yellow-300">Gourav</span> from Sonipat 🎆
      </div>
    </footer>
  )
}
