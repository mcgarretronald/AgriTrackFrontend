import Footer from '@/Components/Footer'
import About from '@/Components/HomePage/About'
import Features from '@/Components/HomePage/Features'
import Hero from '@/Components/HomePage/Hero'
import Navbar from '@/Components/NavBar'
import React from 'react'

export default function Homepage() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <About/>
        <Features/>
        <Footer/>
    </div>
  )
}
