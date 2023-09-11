'use client'

import FilterIcon from "@/components/icons/Filter";
import SearchIcon from "@/components/icons/Search";
import { useFilter } from "../providers/FilterProvider";
import { type ChangeEventHandler, useState, useEffect, useCallback, type MouseEventHandler } from "react";
import PlusIcon from "~/app/components/icons/Plus";
import { useOverlay } from "../providers/OverlayProvider";
import ProductModal from "./ProductModal";

const SearchFilter = () => {
  const {setSearch, isInputFocused, setInputFocus, toggleInStock, isFiltering} = useFilter();
  const [inputValue, setInputValue] = useState<string>('');
  const {createOverlay} = useOverlay();

  const handleProductCreateModal = () => createOverlay(<ProductModal />)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearch(inputValue);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  //! Evitando loop infinito pela chamada do setSearch
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  const handleInputInteraction = () => {
    setInputFocus(() => true);
    setInputValue('');
  };

  const handleCancelInput = () => {
    setInputFocus(() => false);
    setInputValue('');
  };

  const handleFilterChange: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    toggleInStock();
  }, [toggleInStock]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { value } = e.target;
    setInputValue(value);
  }, []);

  return (
    <div id="ButtonsGroup" className="flex items-center justify-between gap-2 md:w-screen md:max-w-4xl">
      <button
        id="FilterButton"
        onClick={handleProductCreateModal}
        className={`hidden md:flex whitespace-nowrap items-center gap-2 p-1 transition-all duration-300 text-blue-500`}
      >
        <PlusIcon />
        <span>Adicionar novo</span>
      </button>
      <div id="Search" className="relative rounded-lg flex w-full h-8 bg-zinc-300 border border-gray-300 px-1 text-neutral-500 items-center text-sm">
        <input 
          id="SearchInput"
          className="absolute top-0 left-0 rounded-lg w-full h-full pl-6 pr-4 bg-transparent placeholder:text-neutral-500 text-black font-light text-lg"
          placeholder="Buscar"
          onChange={handleInputChange}
          onFocus={handleInputInteraction}
          value={inputValue}
        />
        <SearchIcon />
      </div>
        {
          isInputFocused ? (
            <button
              id="CancelButton"
              onClick={handleCancelInput}
              className="flex items-center gap-2 px-2 text-sm text-slate-500"
            >
              <span id="CancelSearch" className="animate-fadeLeft">
                Cancelar
              </span>
            </button>
          ) : null
        }
        <button
          id="FilterButton"
          onClick={handleFilterChange}
          className={`flex items-center gap-2 p-1 transition-all duration-300 text-slate-500 ${isFiltering ? 'text-white bg-blue-600 rounded-full' : ''}`}
        >
          <FilterIcon />
        </button>
    </div>
  )
}

export default SearchFilter;