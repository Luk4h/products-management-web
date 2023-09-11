'use client'

import { useEffect, useState } from "react";
import { type Product } from "~/app/api/tecadi/interfaces";
import ProductCard from "./ProductCard";
import { retrieveProducts } from "../actions";
import SkeletonCards from "./SkeletonCards";
import { useFilter } from "../providers/FilterProvider";
import { useOverlay } from "../providers/OverlayProvider";

type ProductCards = {
  pageNumber: string;
  limit: string;
}

const ProductCards = ({pageNumber, limit}: ProductCards) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [products, setProducs] = useState<Product[]>([]);
  const {filter} = useFilter();
  const {showingOverlay} = useOverlay();

  useEffect(() => {
    const handleSetProducts = async () => {
      const products = await retrieveProducts(pageNumber, limit);
      setProducs(products);
      setLoading(false);
    };

    void handleSetProducts()
    return () => setLoading(true)
  }, [limit, pageNumber]);

  useEffect(() => {
    const handleSetProducts = async () => {
      const products = await retrieveProducts(pageNumber, limit);
      setProducs(products);
      setLoading(false);
    };

    void handleSetProducts();

  //! Não mostrar o component de loading quando estiver hidratando atualizações
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showingOverlay]);

  return (
    <div
      id="ProductCards"
      className='flex w-full gap-2 flex-col divide-y divide-solid divide-zinc-300 md:max-w-4xl'
    >
      {
        isLoading
        ? <SkeletonCards amount={limit} />
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
    )

}

export default ProductCards;