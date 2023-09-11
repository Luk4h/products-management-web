'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from "react";

const usePagination = () => {
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { push } = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  const [pageNumber, setPageNumber] = useState<number>(()=>Number(searchParams.get("page")) || 1);
  const [productsAmount, setProductsAmount] = useState<number>(()=>Number(searchParams.get("limit")) || 1);

  useEffect(()=>{
    const page = searchParams.get("page");
    if (page)
      setPageNumber(Number(page));

    const limit = searchParams.get("limit");
    if (limit)
      setProductsAmount(Number(limit));

    return;
  }, [searchParams])

  const reload = (url: string) => startTransition(()=>{void push(url)});

  const changeProductsAmount = (newNumber: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("limit", String(newNumber));
    reload(`${pathName}?${params.toString()}`);
  };

  const changePageNumber = (newNumber: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(newNumber));
    reload(`${pathName}?${params.toString()}`);
  }

  const nextPage = () => changePageNumber(pageNumber + 1);
  const lastPage = () => changePageNumber(pageNumber - 1);

  return {pageNumber, nextPage, lastPage, changeProductsAmount, productsAmount, isPending};
}

export default usePagination;
