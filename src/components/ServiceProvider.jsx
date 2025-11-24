import React from 'react'
import logos from "../assets/logos.jpg"

const ServiceProvider = () => {
  return (
    <section>
        <div>
            <h1 className='text-3xl font-bold text-center mt-10 mb-5'>AUTHORIZED SERVICE PROVIDER</h1>
        </div>
        <div>
            <div>
<p className='text-center w-[60%] mx-auto '>ServiceIS Ltd is an authorized service center equipped to repair phones and devices of all models and brands.
Beyond repairs, we cover every area of ICT — from the sales of new devices and accessories to the installation of CCTV systems and deployment of complete ICT infrastructures for organizations.
</p>
<p className='mt-5 text-center w-[60%] mx-auto '>We partner with top manufacturers and certified technicians to deliver reliable, brand-compliant, and end-to-end ICT solutions every time.
</p>
            </div>

{/* Brand Logos */}
            <div className='bg-gray-100 mb-20 mt-10'> 
<img className='w-[65%] mx-auto' src={logos}  alt='brand_logos' />
            </div>
        </div>
    </section>
  )
}

export default ServiceProvider