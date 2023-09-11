import { useOverlay } from "../providers/OverlayProvider"
import EditProduct from "./Forms/Edit"
import CreateProduct from "./Forms/Create"

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

type ProductModalProps = {
  product?: ProductCardProps
}

const ProductModal = ({product}: ProductModalProps) => {
  const {handleOutsideClick} = useOverlay();

  return (
      <div id="ModalOverlay" className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-10 flex flex-col-reverse md:flex md:justify-center md:items-center" onClick={handleOutsideClick}>
        {
          product
          ? <EditProduct product={product} />
          : <CreateProduct />
        }
      </div>
  )
}

export default ProductModal;