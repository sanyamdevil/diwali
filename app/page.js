"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination, Autoplay } from "swiper/modules"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import crackers from "@/data/cracker"

export default function HomePage() {
  const [selectedImg, setSelectedImg] = useState(null)
  const [sparkPositions, setSparkPositions] = useState([])

  // Generate spark positions
  useEffect(() => {
    const positions = [...Array(10)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }))
    setSparkPositions(positions)
  }, [])

  // Fireworks animation
  useEffect(() => {
    const stars = gsap.utils.toArray(".spark")
    stars.forEach((star) => {
      gsap.to(star, {
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-200, 200),
        scale: () => gsap.utils.random(0.8, 1.5),
        opacity: () => gsap.utils.random(0.3, 1),
        duration: () => gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })
  }, [sparkPositions])

  // Take first 8 crackers for homepage carousel
  const featuredCrackers = crackers.slice(0, 8)

  return (
    <div className="bg-gradient-to-b from-purple-900 via-black to-pink-900 text-white">

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-20 md:pt-28">
        <Image
          src="/1.jpg"
          alt="Diwali Celebration"
          fill
          className="object-cover opacity-40 -z-10"
          priority
        />

        {sparkPositions.map((pos, i) => (
          <div
            key={i}
            className="spark absolute w-2 h-2 rounded-full bg-yellow-300 shadow-lg"
            style={{ top: pos.top, left: pos.left }}
          ></div>
        ))}

        {/* 🔥 Discount Banner */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-20 md:top-24 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-2xl font-extrabold text-lg md:text-2xl shadow-2xl animate-bounce"
        >
          🎉 Flat 40% OFF This Diwali 🎉
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-pink-400 drop-shadow-lg z-10 px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ✨ Celebrate Diwali in Style ✨
        </motion.h1>

        <motion.p
          className="mt-4 text-base sm:text-lg md:text-2xl text-gray-200 max-w-2xl z-10 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Premium Crackers • Royal Discounts • Safe & Certified
        </motion.p>

        <motion.div
          className="mt-6 flex gap-4 z-10 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            href="/shop"
            className="bg-gradient-to-r from-yellow-300 to-orange-500 text-black font-bold px-6 py-3 rounded-2xl shadow-lg hover:scale-110 transition"
          >
            Shop Now
          </Link>
          <Link
            href="/contact"
            className="bg-transparent border border-pink-400 text-pink-400 px-6 py-3 rounded-2xl hover:bg-pink-400 hover:text-black transition"
          >
            Contact
          </Link>
        </motion.div>
      </section>

      {/* Product Carousel */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-black via-purple-950 to-black">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-yellow-300 mb-10 drop-shadow-md px-2">
          🎇 Our Best Crackers 🎇
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {featuredCrackers.map((item, i) => (
            <SwiperSlide key={item.id}>
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="bg-gradient-to-br from-purple-800 to-pink-700 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                onClick={() => setSelectedImg(item.image)}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={300}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-yellow-200 drop-shadow">
                    {item.name}
                  </h3>
                  <p className="text-gray-200 text-sm mt-2">
                    {item.price ? `₹${item.price}` : "Price on request"} - Celebrate with {item.name}.
                  </p>
                  <Link
                    href={`/shop`}
                    className="inline-block mt-3 bg-yellow-300 text-black px-4 py-2 rounded-xl font-bold hover:scale-105 transition"
                  >
                    Buy Now
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Festive CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-pink-600 to-yellow-400 text-black text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 px-4"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🎆 Hurry! Limited Stock Offers 🎆
        </motion.h2>
        <Link
          href="/shop"
          className="bg-black text-yellow-300 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:scale-110 transition shadow-lg"
        >
          Explore Crackers
        </Link>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-3xl w-full"
            >
              <Image
                src={selectedImg}
                alt="Full view"
                width={1000}
                height={700}
                className="rounded-2xl shadow-2xl object-contain mx-auto"
              />
              <button
                className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded-full font-bold"
                onClick={() => setSelectedImg(null)}
              >
                ✖
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
