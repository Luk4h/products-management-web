'use client'

import { type ReactNode, useState, createContext, useContext, type MouseEvent } from "react"

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

  const createOverlay = (overlay: ReactNode) => {
    setOverlay(overlay);
    document.body.style.overflow = 'hidden';
    showOverlay(true);
  }

  const closeOverlay = () => {
    showOverlay(false);
    setOverlay(null);
    document.body.style.overflow = 'auto';
  };
  const handleOutsideClick = (e: MouseEvent) => e.target === e.currentTarget ? closeOverlay() : null;

  return (
    <OverlayContext.Provider value={{createOverlay, closeOverlay, showingOverlay, handleOutsideClick}}>
      {
        overlay
        ? (<div id="Overlay" className="absolute left-0 w-full h-full" style={{top: window.scrollY}}>{overlay}</div>)
        : null
      }
      {children}
    </OverlayContext.Provider>
  )
}

export const useOverlay = () => useContext(OverlayContext);

export default OverlayProvider;