'use client'

import { type ReactNode, useState, createContext, useContext, MouseEvent } from "react"

interface OverlayContext {
  createOverlay: (overlay: ReactNode) => void;
  closeOverlay: () => void;
  showingOverlay: boolean;
  handleOutsideClick: (e: MouseEvent) => void
}

const OverlayContext = createContext({} as OverlayContext);

const OverlayProvider = ({children}: {children: ReactNode}) => {
  const [showingOverlay, showOverlay] = useState<boolean>(false);
  const [overlay, setOverlay] = useState<ReactNode>();
  const [windowPosition, setWindowPosition] = useState<number>();

  const createOverlay = (overlay: ReactNode) => {
    setOverlay(overlay);
    setWindowPosition(window.scrollY);
    document.body.style.overflow = 'hidden';
    window.scrollTo({top: 0});
    showOverlay(true);
  }

  const closeOverlay = () => {
    showOverlay(false);
    window.scrollTo({top: windowPosition});
    setOverlay(null);
    document.body.style.overflow = 'auto';
  };
  const handleOutsideClick = (e: MouseEvent) => e.target === e.currentTarget ? closeOverlay() : null;

  return (
    <OverlayContext.Provider value={{createOverlay, closeOverlay, showingOverlay, handleOutsideClick}}>
      {overlay}
      {children}
    </OverlayContext.Provider>
  )
}

export const useOverlay = () => useContext(OverlayContext);

export default OverlayProvider;