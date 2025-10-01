"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import Image from "next/image"
import Link from "next/link"

export default function ShopPage() {
  const [sparkPositions, setSparkPositions] = useState([])
  const [floatingSparks, setFloatingSparks] = useState([])

  // Generate spark positions once for background
  useEffect(() => {
    const positions = [...Array(25)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }))
    setSparkPositions(positions)

    const floating = [...Array(6)].map(() => ({
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 100}%`,
    }))
    setFloatingSparks(floating)
  }, [])

  // Animate sparks
  useEffect(() => {
    const stars = gsap.utils.toArray(".spark")
    stars.forEach((star) => {
      gsap.to(star, {
        x: () => gsap.utils.random(-250, 250),
        y: () => gsap.utils.random(-150, 150),
        scale: () => gsap.utils.random(0.5, 1.5),
        opacity: () => gsap.utils.random(0.3, 1),
        duration: () => gsap.utils.random(2, 5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })
  }, [sparkPositions])

  const products = [
    { name: "Sparklers", img: "/sparkler.jpg", price: "₹150" },
    { name: "Rockets", img: "/rocket.jpg", price: "₹250" },
    { name: "Kids Pack", img: "/kids.jpg", price: "₹300" },
    { name: "Gift Box", img: "/giftbox.jpg", price: "₹500" },
  ]

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
          🎇 Explore Crackers 🎇
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Discover premium, safe, and certified Diwali crackers. Add sparkle to your festive season!
        </motion.p>
      </section>

      {/* Products Grid */}
      <section className="px-6 md:px-20 py-16 z-10 relative">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((item, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-purple-800 to-pink-700 rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:scale-105 hover:rotate-0 transition-transform duration-300"
              whileHover={{ scale: 1.08, rotate: [0, 0, 0, 0], boxShadow: "0 0 30px rgba(255,255,0,0.7)" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <Image
                src={item.img}
                alt={item.name}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-yellow-300">{item.name}</h3>
                <p className="text-gray-200 mt-2">{item.price}</p>
                <Link
                  href={`/contact`}
                  className="mt-4 inline-block bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold hover:scale-105 transition shadow-lg"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 text-center relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-yellow-300 mb-6 animate-pulse"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🎆 Hurry! Limited Stock Available 🎆
        </motion.h2>
        <Link
          href="/contact"
          className="bg-black text-yellow-300 font-bold px-8 py-4 rounded-2xl hover:scale-110 transition shadow-lg"
        >
          Contact Us
        </Link>
      </section>

      {/* Subtle Floating Fireworks */}
      <div className="absolute top-0 w-full h-full pointer-events-none">
        {floatingSparks.map((spark, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full blur-sm"
            style={{ top: spark.top, left: spark.left }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 2 + i, repeat: Infinity, repeatType: "loop", delay: i }}
          />
        ))}
      </div>
    </div>
  )
}
