'use client'

import StorageIcon from "@/components/icons/Storage";
import WeightIcon from "@/components/icons/Weight";
import { useEffect, useState, type MouseEvent } from "react";
import { useOverlay } from "../providers/OverlayProvider";
import ProductModal from "./ProductModal";

type ProductCardProps = {
  codigo: string,
  codigoCliente: string,
  descricao: string,
  um: string,
  pesoBruto: number,
  pesoLiquido: number,
  grupo: string,
  saldo: number
}

const ProductCard = ({
  codigo,
  codigoCliente,
  descricao,
  um,
  pesoBruto,
  pesoLiquido,
  grupo,
  saldo,
  idx
}: ProductCardProps & {idx: number}) => {
  const [isShowing, setShowing] = useState(false)
  const {createOverlay} = useOverlay();

  useEffect(()=>{
    setTimeout(()=>{
      setShowing(true)
    }, (idx+1)*50)
  }, [])

  const openProduct = () => createOverlay(<ProductModal product={{codigo, codigoCliente, descricao, um, pesoBruto, pesoLiquido, grupo, saldo}} />)

  if (!isShowing)
    return null;

  return (
    <div id="ProductCard" className={`flex flex-col items-start gap-2 pt-2 animate-fadeUp`} onClick={openProduct}>
      <span id="Code" className='text-slate-500 text-xs uppercase'>{`#${codigo}`}</span>
      <p id="Name" className='text-black text-md font-bold uppercase truncate w-full'>{descricao}</p>
      <div id="Details" className='flex items-center gap-2 text-slate-800 text-xs'>
        <span id="Amount" className='flex items-center gap-1'>
          <StorageIcon />
          <p id="Value">{`${saldo} ${um}`}</p>
        </span>
        <span id="Weight" className='flex items-center gap-1'>
          <WeightIcon />
          <p id="Value">{`${pesoBruto.toLocaleString('pt-br')} Kg`}</p>
        </span>
      </div>
    </div>
    )
};

export default ProductCard;