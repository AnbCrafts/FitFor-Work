import React from 'react'
import Logo from './Logo'

const PortalHeader = () => {
  return (
    <div className='w-full h-auto flex items-center justify-between'>

        <Logo/>
        <div className="flex-1 rounded-tr-2xl ml-10 rounded-br-2xl border-b-2 border-r-2 border-pink-500 bg-gray-800 text-gray-300 text-sm px-4 py-2 flex flex-col md:flex-row justify-between items-center shadow-sm">
  <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
    <span className='border-r-2 pr-3 cursor-pointer border-pink-500'>📍 Kolkata, India</span>
    <span className='border-r-2 pr-3 cursor-pointer border-pink-500'>📞 <a href="mailto:support@jobconnect.com" className="underline">support@jobconnect.com</a></span>
    <span className='border-r-2 pr-3 cursor-pointer border-pink-500'>❓ <a href="/help" className="underline">Help Center</a></span>
    <span className='border-r-2 pr-3 cursor-pointer border-pink-500'>👤 <a href="/login" className="underline">User Login</a></span>
  </div>
  <div className="mt-2 md:mt-0 text-center md:text-right font-medium text-[13px] text-gray-500">
    🚀 Empowering Careers | Connecting Talent with Opportunity
  </div>
</div>

      
    </div>
  )
}

export default PortalHeader
