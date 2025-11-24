import React from 'react'

const Contacts = () => {
  return (
    <section>
        <div className='bg-blue-950 text-white h-40 flex items-center justify-center '>
            <h1 className='font-bold text-3xl '>CONTACTS</h1>
        </div>


<div className='grid px-10 sm:grid-cols-2 mt-20 text-center   justify-center gap-20 lg:gap-0' >
        
                
            <div className='flex flex-col items-center'>
                <h1 className='font-bold text-2xl mb-7'>Service locations</h1>
                <h1 className='font-semibold text-xl mb-2'>Ibadan</h1>
                <p>Agboowo Express, Ojo Road, opposite Bovas Filling Station</p>
                <p>Email: hello@gmail.com</p>
                <p>Phone: 0812345678</p>
                 <h1 className='mt-10 font-semibold text-xl mb-2'>Lagos</h1>
                <p>Address: Computer Village, Ikeja.</p>
                <p>Email: hello@gmail.com</p>
                <p>Phone: 0812345678</p>
            </div>
        



    <div className='flex flex-col items-center'>
        <h1 className='font-bold text-2xl mb-7'>Administration</h1>
          <h1 className='font-semibold text-xl mb-2'>Ibadan</h1>
                <p>Agboowo Express, Ojo Road, opposite Bovas Filling Station</p>
                <p>Email: hello@gmail.com</p>
                <p>Phone: 0812345678</p>
                <p>Company ccode: 123456</p>
                 <h1 className='mt-10 font-semibold text-xl '>Access Bank</h1>
        <p>ServiceIS LTD</p>
        <p>0012345678</p>
    </div>



        </div>





    </section>
  )
}

export default Contacts