'use client'

import { type ReactNode, createContext, useState, useContext, type Dispatch, type SetStateAction } from "react"

interface FilterContext {
  filter: Filter;
  setSearch: (e: string) => void
  toggleInStock: () => void
  isInputFocused: boolean;
  isFiltering: boolean;
  setInputFocus: Dispatch<SetStateAction<boolean>>
}

type Filter = {
  isSearching: boolean
  searchString: string
  filter: boolean
}

const FilterContext = createContext({} as FilterContext);

const FilterProvider = ({children}: {children: ReactNode}) => {
  const [filter, setFilter] = useState<Filter>({isSearching: false, filter: false, searchString: ''});
  const [isInputFocused, setInputFocus] = useState<boolean>(false);
  const [isFiltering, setFiltering] = useState<boolean>(false);

  const setSearch = (e: string) => setFilter( prevState => ({ ...prevState, isSearching: true, searchString: e })) 

  const toggleInStock = () => {
    setFilter( prevState => ({ ...prevState, filter: !prevState.filter }));
    setFiltering( prevState => !prevState);
  }

  return (
    <FilterContext.Provider value={{filter, setSearch, toggleInStock, isInputFocused, isFiltering, setInputFocus}}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext);

export default FilterProvider;