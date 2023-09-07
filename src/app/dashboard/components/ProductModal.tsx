import { FormProvider, useForm } from "react-hook-form"
import Button from "~/app/components/Button"
import Input from "~/app/components/Input/FormTextField"
import { useOverlay } from "../providers/OverlayProvider"
import Select from "~/app/components/Input/FormSelectField"

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

type FormInputs = {
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
  const methods = useForm<FormInputs>();
  const {closeOverlay, handleOutsideClick} = useOverlay();

  return (
    <FormProvider {...methods}>
      <div id="ModalOverlay" className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-10 flex flex-col-reverse" onClick={handleOutsideClick}>
        <div id="ProductModal" className="w-screen bg-white rounded-t-lg shadow-xl h-auto px-2 py-4 flex flex-col gap-4 overflow-scroll animate-fadeUp">
          <div id="ModalHeader" className="w-full flex justify-center items-center">
            {
              product ? (
                <span>
                  Editando produto #{product?.codigo}
                </span>
              ) : (
                <span>
                  Criando novo produto
                </span>
              )
            }
          </div>
          <div>
            <label className="text-bold text-lg">Codigo cliente</label>
            <Input name="ProductCode" defaultValue={product?.codigoCliente ?? ""}/>
          </div>
          <div>
            <label className="text-bold text-lg">Descrição</label>
            <Input name="ProductDescription" defaultValue={product?.descricao ?? ""} />
          </div>
          <div>
            <label className="text-bold text-lg">Peso bruto</label>
            <Input name="ProductRawWeight" defaultValue={product?.pesoBruto ?? ""} />
          </div>
          <div>
            <label className="text-bold text-lg">Peso líquido</label>
            <Input name="ProductWeight" defaultValue={product?.pesoLiquido ?? ""} />
          </div>
          <div>
            <label className="text-bold text-lg">Estoque</label>
            <Input name="ProductStock" defaultValue={product?.saldo ?? ""} />
          </div>
          <div>
            <label className="text-bold text-lg">Unidade de Medida</label>
            <select className="w-full h-12 border border-slate-200 rounded-md px-2" defaultValue={product?.um ?? ""} {...methods.register("um", {required: true})}>
              {
                ["UN"].map(option => <option key={option} value={option}>{option}</option>)
              }
            </select>
          </div>
          <div>
            <label className="text-bold text-lg">Grupo</label>
            <Input name="ProductGroup" defaultValue={product?.grupo ?? ""} />
          </div>
            {
              product ? (
                <Button onClick={closeOverlay} className="bg-red-600">
                  <span className="text-lg">Deletar produto</span>
                </Button>
              ) : null
            }
          <div id="ModalButtons" className="flex justify-between gap-4">
            <Button onClick={closeOverlay} className="bg-red-600">
              <span className="text-lg">Cancelar</span>
            </Button>
            <Button>
              <span className="text-lg">
            {
              product ? (
                'Salvar'
              ) : (
                'Criar'
              )
            }
              </span>
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default ProductModal;