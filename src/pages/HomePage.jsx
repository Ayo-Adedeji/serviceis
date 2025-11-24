import React from 'react'
import { Values } from '../components/Values'
import Centres from '../components/Centres'
import Contacts from '../components/Contacts'
import Footer from '../components/Footer'
import ServiceProvider from '../components/ServiceProvider'
import HeroSection from '../components/HeroSection'

const HomePage = () => {
  return (
    <div>
        <HeroSection/>
        <ServiceProvider/>
        <Values/>
        <Centres/>
        <Contacts/>
        <Footer/>
        
    </div>
  )
}

export default HomePage