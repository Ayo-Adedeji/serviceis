import React from 'react'
import { MapSection } from './MapSection'

const Centres = () => {
  return (
    <section>
        <div className='bg-[#0A0F1E] text-white py-12 flex flex-col items-center justify-center gap-2 border-b border-white/10'>
            <p className='text-blue-400 text-xs font-semibold uppercase tracking-widest'>Locations</p>
            <h1 className='font-bold text-2xl md:text-3xl text-center text-white'>Customer Service Centers</h1>
        </div>
        <MapSection/>
    </section>
  )
}

export default Centres