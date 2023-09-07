"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import SearchFilter from "./SearchFilter";
import { useFilter } from "../providers/FilterProvider";
import Link from "next/link";
import usePagination from "../hooks/UsePagination";
import { FormProvider } from "react-hook-form";
import Input from "~/app/components/Input/FormTextField";
import ProductModal from "./ProductModal";

type Product = {
  codigo: string,
  codigoCliente: string,
  descricao: string,
  um: string,
  pesoBruto: number,
  pesoLiquido: number,
  grupo: string,
  saldo: number
}

const data = [
  {
      "codigo": "MINE0313-0003",
      "codigoCliente": "0313-0003",
      "descricao": "MODULE WIRELESS AUDIO RX WM 12",
      "um": "UN",
      "pesoBruto": 0.1,
      "pesoLiquido": 0.1,
      "grupo": "MINE",
      "saldo": 0
  },
  {
      "codigo": "MINE3004-0244",
      "codigoCliente": "3004-0244",
      "descricao": "KIT REPARO EQX 600 COMPOSTO POR C/CAIXA MONTAGEM PARA EQUIPAMENTOS DE USO MANUAL -",
      "um": "UN",
      "pesoBruto": 3,
      "pesoLiquido": 0.3,
      "grupo": "MINE",
      "saldo": 0
  },
  {
      "codigo": "MINE3004-0245",
      "codigoCliente": "3004-0245",
      "descricao": "KIT EQUINOX 800 COMPOSTO POR CAIXA DE CONTROLE PARA EQUIPAMENTOS DE USO MANUAL D -",
      "um": "UN",
      "pesoBruto": 2,
      "pesoLiquido": 2,
      "grupo": "MINE",
      "saldo": 0
  },
  {
      "codigo": "MINE3011-0073",
      "codigoCliente": "3011-0073",
      "descricao": "BOBINA ADICIONAL COMMANDER DE MONOLOOP DE 11 POLEGADAS PARA EQUIPAMENTOS DE USO -",
      "um": "UN",
      "pesoBruto": 1,
      "pesoLiquido": 1,
      "grupo": "MINE",
      "saldo": 4
  },
  {
      "codigo": "MINE3011-0074",
      "codigoCliente": "3011-0074",
      "descricao": "BOBINA ADICIONAL COMMANDER DE MONOLOP DE 15 POLEGADAS PARA DETECTOR DE METAIS -",
      "um": "UN",
      "pesoBruto": 1.5,
      "pesoLiquido": 1.5,
      "grupo": "MINE",
      "saldo": 0
  },
  {
      "codigo": "MINE3011-0075",
      "codigoCliente": "3011-0075",
      "descricao": "BOBINA ADICIONAL COMMANDER DE MONOLOP DE 18 POLEGADAS PARA EQUIPAMENTOS DE USO -",
      "um": "UN",
      "pesoBruto": 1.8,
      "pesoLiquido": 1.8,
      "grupo": "MINE",
      "saldo": 4
  },
  {
      "codigo": "MINE3011-0114",
      "codigoCliente": "3011-0114",
      "descricao": "BOBINA REDONDA DD 6. CTX",
      "um": "UN",
      "pesoBruto": 1,
      "pesoLiquido": 1,
      "grupo": "MINE",
      "saldo": 10
  },
  {
      "codigo": "MINE3011-0115",
      "codigoCliente": "3011-0115",
      "descricao": "BOBINA REDONDA DD 11. CTX",
      "um": "UN",
      "pesoBruto": 1,
      "pesoLiquido": 1,
      "grupo": "MINE",
      "saldo": 6
  },
  {
      "codigo": "MINE3011-0128",
      "codigoCliente": "3011-0128",
      "descricao": "CARREGADOR DE BATERIA BC 10 PARA EQUIPAMENTOS DE METAIS -",
      "um": "UN",
      "pesoBruto": 0.4,
      "pesoLiquido": 0.4,
      "grupo": "MINE",
      "saldo": 15
  },
  {
      "codigo": "MINE3011-0135",
      "codigoCliente": "3011-0135",
      "descricao": "PLACA DERRAPANTE ACC. SP 06, EQX06 -",
      "um": "UN",
      "pesoBruto": 0.05,
      "pesoLiquido": 0.05,
      "grupo": "MINE",
      "saldo": 21
  }
]

const ProductsList = () => {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const {filter} = useFilter();
  const {pageNumber, productsAmount} = usePagination();


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      setProducts(data);
      setLoading(false);
    }, 500);
    document.body.style.overflow = 'auto';
  });

  return (
    <div
      id="Products"
      className='flex w-screen flex-col gap-4 p-4 md:items-center'
    >
      <SearchFilter />
      <div
        id="ProductCards"
        className='flex w-full gap-2 flex-col divide-y divide-solid divide-zinc-300 md:max-w-4xl'
      >
        {isLoading
          ? Array.from({ length: 10 }).map((_a, idx) => (
              <SkeletonCard key={idx} />
            ))
          : products.length > 0
          ? filter.filter
          ? filter.isSearching 
          ? products.filter(product => (product.saldo > 0 && (product.descricao.toUpperCase().startsWith(filter.searchString.toUpperCase()) || product.codigo.toUpperCase().startsWith(filter.searchString.toUpperCase())))).map((product, idx) => <ProductCard {...product} key={idx} idx={idx} />)
          : products.filter(product => product.saldo > 0).map((product, idx) => <ProductCard {...product} key={idx} idx={idx} />)
          : filter.isSearching
          ? products.filter(product => product.descricao.toUpperCase().startsWith(filter.searchString.toUpperCase()) || product.codigo.toUpperCase().startsWith(filter.searchString.toUpperCase())).map((product, idx) => <ProductCard {...product} key={idx} idx={idx} />)
          : products.map((product, idx) => <ProductCard {...product} key={idx} idx={idx} />)
          : "Houve um erro ao pesquisar os produtos."}
      </div>
      <div id="Pagination" className="flex justify-between items-center animate-fadeIn animate-delay-500 w-full md:max-w-4xl">
        <div id="ItemsPerPage" className="flex justify-between items-center gap-2">
          <span>Items por página</span>
          <select id="AmountPerPage" className="p-2 rounded-md" defaultValue={productsAmount}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div id="PaginationButtons" className="flex items-center gap-2">
          { pageNumber === 1 ? null : <Link href={`/dashboard?page=${pageNumber - 1}`} className="px-3 py-1 bg-white rounded-md opacity-50">{pageNumber - 1}</Link> }
          <span className="px-3 py-1 bg-white rounded-md">{pageNumber}</span>
          <Link href={`/dashboard?page=${pageNumber + 1}`} className="px-3 py-1 bg-white rounded-md opacity-50">{pageNumber + 1}</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
