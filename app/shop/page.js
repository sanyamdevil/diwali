"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination, Navigation } from "swiper/modules"
import crackers from "@/data/cracker"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ShopPage() {
  const [search, setSearch] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const swiperRef = useRef(null)

  // Price ranges
  const ranges = {
    "0-200": [0, 200],
    "201-500": [201, 500],
    "501-1000": [501, 1000],
    "1001+": [1001, Infinity],
  }

  const filteredCrackers = crackers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchesPrice = priceRange
      ? (c.price ? c.price >= ranges[priceRange][0] && c.price <= ranges[priceRange][1] : false)
      : true
    return matchesSearch && matchesPrice
  })

  return (
    <main className="min-h-screen bg-black text-white antialiased">
      {/* HEADER */}
      <motion.section
        className="pt-28 pb-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-extrabold text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.7)]">
          🎆 Explore Crackers 🎆
        </h1>
        <p className="text-gray-300 mt-2">Find your favorite cracker and filter by budget.</p>
      </motion.section>

      {/* SEARCH + FILTER */}
      <motion.section
        className="px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <motion.input
          type="text"
          placeholder="🔎 Search crackers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          whileFocus={{ scale: 1.03, boxShadow: "0px 0px 12px rgba(250, 204, 21, 0.7)" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-full md:w-1/2 px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-gray-400 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <motion.select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          whileFocus={{ scale: 1.03, boxShadow: "0px 0px 12px rgba(250, 204, 21, 0.7)" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-full md:w-1/3 px-4 py-3 rounded-xl bg-gray-900 text-white shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">💰 All Prices</option>
          <option value="0-200">₹0 - ₹200</option>
          <option value="201-500">₹201 - ₹500</option>
          <option value="501-1000">₹501 - ₹1000</option>
          <option value="1001+">₹1001+</option>
        </motion.select>
      </motion.section>

      {/* PRODUCT CAROUSEL */}
      <section className="py-10 relative">
        <div className="container mx-auto px-6 lg:px-12">
          {filteredCrackers.length > 0 ? (
            <>
              {/* Left Arrow */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-yellow-400 text-black p-2 rounded-full shadow-lg z-20 hover:scale-110 transition"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-yellow-400 text-black p-2 rounded-full shadow-lg z-20 hover:scale-110 transition"
              >
                <ChevronRight size={24} />
              </button>

              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Pagination, Navigation]}
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                pagination={{ clickable: true }}
              >
                {filteredCrackers.map((c, index) => (
                  <SwiperSlide key={c.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{
                        y: -6,
                        boxShadow: "0px 0px 20px rgba(250, 204, 21, 0.7)",
                        scale: 1.03,
                      }}
                      className="p-4 bg-gray-900 rounded-2xl shadow-lg h-full transition-all duration-300"
                    >
                      <div className="relative h-52 rounded-lg overflow-hidden">
                        <Image
                          src={c.image || `/placeholder.jpg`}
                          alt={c.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white">{c.name}</div>
                          <div className="text-sm text-gray-400">
                            {c.price ? `₹${c.price}` : "Price on request"}
                          </div>
                        </div>
                        <Link
                          href="https://wa.me/918168585528"
                          target="_blank"
                          className="px-3 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-xl font-semibold text-black shadow-md transition-all duration-200 hover:scale-105"
                        >
                          Contact
                        </Link>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 text-lg"
            >
              No crackers found 🚫
            </motion.p>
          )}
        </div>
      </section>
    </main>
  )
}
