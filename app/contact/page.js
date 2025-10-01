"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import Link from "next/link"

export default function ContactPage() {
  const [sparkPositions, setSparkPositions] = useState([])
  const [mounted, setMounted] = useState(false) // To fix hydration issues

  // Generate spark positions only after mount
  useEffect(() => {
    setMounted(true)
    const positions = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }))
    setSparkPositions(positions)
  }, [])

  // Animate sparks
  useEffect(() => {
    if (!mounted) return
    const stars = gsap.utils.toArray(".spark")
    stars.forEach((star) => {
      gsap.to(star, {
        x: () => gsap.utils.random(-200, 200),
        y: () => gsap.utils.random(-150, 150),
        scale: () => gsap.utils.random(0.5, 1.5),
        opacity: () => gsap.utils.random(0.3, 1),
        duration: () => gsap.utils.random(2, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })
  }, [sparkPositions, mounted])

  if (!mounted) return null // Don't render until mounted to prevent hydration errors

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-purple-950 to-pink-900 text-white overflow-hidden">
      
      {/* Floating Sparks */}
      {sparkPositions.map((pos, i) => (
        <div
          key={i}
          className="spark absolute w-2 h-2 rounded-full bg-yellow-300 shadow-lg blur-sm"
          style={{ top: pos.top, left: pos.left }}
        ></div>
      ))}

      {/* Hero Section */}
      <section className="text-center py-20 relative z-10">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-lg animate-pulse"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          🎆 Get in Touch 🎆
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Have questions or want to place a bulk order?  
          We’d love to hear from you this festive season.
        </motion.p>
      </section>

      {/* Contact Info */}
      <section className="grid md:grid-cols-3 gap-8 px-6 md:px-20 py-10 z-10 relative">
        {[
          {
            title: "📍 Address",
            content: ["Sonipat, Haryana, India"],
            gradient: "from-yellow-400 to-pink-500",
          },
          {
            title: "📞 Contact",
            content: [
              'Phone: <a href="tel:+918168585528" class="underline">+91 81685 85528</a>',
              'WhatsApp: <a href="https://wa.me/918168585528" class="underline" target="_blank">Click Here</a>',
              'Email: <a href="mailto:sanyamcsekuk@gmail.com" class="underline">sanyamcsekuk@gmail.com</a>',
            ],
            gradient: "from-pink-500 to-purple-600",
          },
          {
            title: "🕒 Timing",
            content: ["Mon – Sun", "9:00 AM – 10:00 PM"],
            gradient: "from-purple-600 to-yellow-400",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={`bg-gradient-to-r ${item.gradient} p-6 rounded-2xl shadow-lg text-center text-black cursor-pointer`}
            whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0], boxShadow: "0px 0px 30px rgba(255,255,0,0.7)" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
          >
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            {item.content.map((line, idx) => (
              <p key={idx} className="text-sm" dangerouslySetInnerHTML={{ __html: line }}></p>
            ))}
          </motion.div>
        ))}
      </section>

      {/* Google Map */}
      <section className="px-6 md:px-20 py-16 relative z-10">
        <h2 className="text-2xl font-bold text-center mb-6">📍 Find Us on Map</h2>
        <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3495.165301994357!2d76.8173!3d29.9695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e3ef6dfe30d1f%3A0x123456789!2ssonipat%2C%20Haryana%20India!5e0!3m2!1sen!2sin!4v123456789"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </section>

      {/* Subtle floating fireworks */}
      <div className="absolute top-0 w-full h-full pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full blur-sm"
            style={{ top: `${Math.random() * 80}%`, left: `${Math.random() * 100}%` }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 2 + i, repeat: Infinity, repeatType: "loop", delay: i }}
          ></motion.div>
        ))}
      </div>
    </div>
  )
}
