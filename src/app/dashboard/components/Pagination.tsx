'use client'

import { type ChangeEvent } from "react";
import usePagination from "../hooks/UsePagination";

const Pagination = () => {
  const {nextPage, lastPage, pageNumber, productsAmount, changeProductsAmount} = usePagination();
  
  const handleProductsChange = (e: ChangeEvent<HTMLSelectElement>) => changeProductsAmount(Number(e.target.value));

  return (
    <div id="Pagination" className="flex justify-between items-center animate-fadeIn animate-delay-500 w-full md:max-w-4xl">
      <div id="ItemsPerPage" className="flex justify-between items-center gap-2">
        <span>Items por página</span>
        <select id="AmountPerPage" className="p-2 rounded-md" defaultValue={productsAmount} onChange={handleProductsChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div id="PaginationButtons" className="flex items-center gap-2">
        { pageNumber === 1 ? null : <button onClick={lastPage} className="px-3 py-1 bg-white rounded-md opacity-50">{pageNumber - 1}</button> }
        <span className="px-3 py-1 bg-white rounded-md">{pageNumber}</span>
        <button onClick={nextPage} className="px-3 py-1 bg-white rounded-md opacity-50">{pageNumber + 1}</button>
      </div>
    </div>
  )
}

export default Pagination;
