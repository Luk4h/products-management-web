import SearchFilter from "./SearchFilter";
import Pagination from "./Pagination";
import { type ReactNode } from "react";

const ProductsList = ({children}: {children: ReactNode}) => {

  return (
    <div
      id="Products"
      className='flex w-full flex-col gap-4 p-4 md:items-center'
    >
      <SearchFilter />
        {children}
      <Pagination />
    </div>
  );
}

export default ProductsList;
