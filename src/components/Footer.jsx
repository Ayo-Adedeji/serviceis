import React from 'react'
import { FcPrivacy } from 'react-icons/fc'

const Footer = () => {
  return (
    <section className='mt-20 bg-blue-950'>
        <div className='flex flex-row grid grid-cols-3 gap-7  py-16 px-14  '>
            <a className='flex items-center gap-3 border border-gray-400 rounded h-24 px-10 text-2xl text-white bg-gray-400 shadow-xl  font-semibold  '> <span> <FcPrivacy/> </span>Privacy policy</a>
            <a className='flex items-center gap-3 border border-gray-400 rounded h-24 px-10 text-2xl text-white bg-gray-400 shadow-xl  font-semibold '> <span> <FcPrivacy/> </span> Responsible business policy</a>
            <a className='flex items-center gap-3 border border-gray-400 rounded h-24 px-10 text-2xl text-white bg-gray-400 shadow-xl  font-semibold '> <span> <FcPrivacy/> </span>Frequently asked questions</a>
            <a className='flex items-center gap-3 border border-gray-400 rounded h-24 px-10 text-2xl text-white bg-gray-400 shadow-xl  font-semibold '> <span> <FcPrivacy/> </span>Transportation conditions</a>
            <a className='flex items-center gap-3 border border-gray-400 rounded h-24 px-10 text-2xl text-white bg-gray-400 shadow-xl  font-semibold '> <span> <FcPrivacy/> </span>Terms and conditions</a>
        </div>

        <h1 className='text-center text-white'>YOUR OPINION IS IMPORTANT TO US, SHARE YOUR EXPERIENCE OF HOW WE MANAGED TO SERVE YOU.</h1>
    <p className='bg-blue-400 text-sm py-4 mt-10 items-center text-center text-white'>2025 ServiceIS. All rights reserved</p>
    </section>
  )
}

export default Footer