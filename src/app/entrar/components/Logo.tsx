import Image from "next/image";

import logo from '@/public/logo.jpeg';

const Logo = () => <Image src={logo} className='self-center' height={256} width={256} alt='Logo do grupo Tecadi' priority={true} />

export default Logo;