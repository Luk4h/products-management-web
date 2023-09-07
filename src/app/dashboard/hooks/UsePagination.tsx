'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";

type ProductsAmount = 10 | 20 | 30 | 40 | 50

const usePagination = () => {
  const searchParams = useSearchParams();

  const [pageNumber, setPageNumber] = useState<number>(()=>Number(searchParams.get("page")) || 1);
  const [productsAmount, setProductsAmount] = useState<ProductsAmount>(10);

  useEffect(()=>{
    const page = searchParams.get("page");
    if (!page)
      return;

      setPageNumber(Number(page))
  }, [searchParams])

  const changeProductsAmount = (newNumber: ProductsAmount) => {; setProductsAmount(newNumber)};

  const nextPage = () => setPageNumber(prevState => prevState + 1);

  const lastPage = () => setPageNumber(prevState => prevState - 1);

  return {pageNumber, nextPage, lastPage, changeProductsAmount, productsAmount};
}

export default usePagination;
