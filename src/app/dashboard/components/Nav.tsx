//! Adicionado para componente de cliente
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import MenuIcon from "@/components/icons/Menu";
import PlusIcon from "@/components/icons/Plus";
import { useFilter } from "../providers/FilterProvider";
import DoorIcon from "@/components/icons/Door";
import { signOut } from "next-auth/react";
import { useOverlay } from "../providers/OverlayProvider";
import Menu from "./Menu";
import ProductModal from "./ProductModal";


const Nav = () => {
  const {isInputFocused} = useFilter();
  const {createOverlay} = useOverlay();

  const handleSignOut = async () => await signOut()
  const handleOpenMenu = () => createOverlay(<Menu/>)
  const handleProductCreateModal = () => createOverlay(<ProductModal />)

  return (
    <nav id="Header" className={`relative bg-blue-600 w-screen flex text-white transition-all duration-200 md:justify-center md:items-center ${isInputFocused ? 'h-0 p-0 text-transparent md:px-8 md:py-4 md:h-auto md:text-white' : 'px-8 py-4'}`}>
      <div className="w-full flex justify-between items-center md:max-w-4xl justify-between md:justify-center overflow-hidden">
        <button id="OpenMenu" className="md:hidden" onClick={handleOpenMenu}>
          <MenuIcon />
        </button>
        <h1 className='text-xl md:max-w-4xl md:w-full md:text-3xl'>Inventário</h1>
        <button id="AddProduct" className="md:hidden" onClick={handleProductCreateModal}>
          <PlusIcon />
        </button>
        <button id="AddProduct" className="hidden md:flex gap-2 p-2" onClick={handleSignOut}>
          <DoorIcon />
          <span>Sair</span>
        </button>
      </div>
    </nav>
  )
};

export default Nav;