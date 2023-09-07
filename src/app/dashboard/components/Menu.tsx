//! Adicionado para componente de cliente
/* eslint-disable @typescript-eslint/no-misused-promises */
import { signOut } from "next-auth/react"
import CrossIcon from "~/app/components/icons/Cross"
import DoorIcon from "~/app/components/icons/Door"
import { useOverlay } from "../providers/OverlayProvider"

const Menu = () => {
  const {closeOverlay, handleOutsideClick} = useOverlay();

  const handleCloseMenu = () => closeOverlay();
  const handleSignOut = async () => await signOut();
  
  return (
    <div id="ModalOverlay" className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-10" onClick={handleOutsideClick}>
      <div id="LateralMenu" className="w-4/5 h-full bg-blue-600 shadow-2xl p-4 flex flex-col justify-between text-white animate-fadeRight">
        <button id="AddProduct" className="flex gap-2 p-2 animate-fadeIn" onClick={handleCloseMenu}>
          <div className="h-6 w-6">
            <CrossIcon />
          </div>
          <span>Fechar menu</span>
        </button>
        <button id="AddProduct" className="flex gap-2 p-2 animate-fadeIn" onClick={handleSignOut}>
          <DoorIcon />
          <span>Sair</span>
        </button>
      </div>
    </div>
  )
}

export default Menu;