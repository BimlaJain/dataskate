import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <div className=' bg-black py-[23px]'>
            <div className="container max-w-[1180px] mx-auto px-4">
                <div className='flex justify-between max-sm:flex-col max-sm:space-y-4 max-sm:items-center'>
                    <p className='text-white opacity-50 text-sm'>Made with 🤍 for the people of the internet.</p>
                    <p className='text-white opacity-50 text-sm'>© {year} Dataskate.io, All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
