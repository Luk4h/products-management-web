import Image from "next/image";

import splash from "~/public/splash-screen.jpeg"

const Splash = () => (
  <div className='relative w-full flex-grow md:min-h-screen flex items-end'>
    <Image src={splash} fill alt='Centro de distribuição da Tecadi.' className='relative w-full h-full object-cover z-0'/>
    <div className="block md:hidden w-full h-6 rounded-t-2xl shadow-xl bg-white z-10" />
  </div>
);

export default Splash;