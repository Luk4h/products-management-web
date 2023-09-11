//! OnSubmit não espera um retorno
//! Linha 51 e 83
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Um, type Product } from "~/app/api/tecadi/interfaces"
import Button from "~/app/components/Button"
import ButtonDelete from "~/app/components/Button/Secondary"
import Input from "~/app/components/Input/FormTextField"
import { useOverlay } from "../../providers/OverlayProvider"
import { FormProvider } from "react-hook-form"
import useEdit from "../../hooks/useEdit"
import { deleteProduct, getUM } from "../../actions"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type EditFormProps = {
  product: Product
}

const EditProduct = ({product}: EditFormProps) => {
  const {closeOverlay} = useOverlay();
  const {methods, handleSubmit} = useEdit();
  const [measurementUnits, setMeasurementUnits] = useState<Um[]>([]);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {refresh} = useRouter();

  const getMeasurement = async () => getUM();
  useEffect(() => {
    void getMeasurement()
      .then((UMs: Um[]) => {setMeasurementUnits(UMs)});
  }, [])

  const handleDelete = async () => {
    setDeleting(true);
    const deletedProduct = {
      codigo: product.codigo
    }
    const result = await deleteProduct(deletedProduct);
    closeOverlay();
    if (result.isError) {
      alert(result.message);
      return false;
    }

    alert(result.message);
    refresh();
    setDeleting(false);
    return true;
  }

  
  return (
    <FormProvider {...methods}>
      <form id="ProductModal" onSubmit={handleSubmit} className="w-screen bg-white rounded-t-lg shadow-xl h-auto px-2 py-4 flex flex-col gap-4 overflow-scroll animate-fadeUp md:rounded-lg md:px-8 md:py-12 md:overflow-hidden md:max-w-3xl">
      <div id="ModalHeader" className="w-full flex justify-center items-center">
        <span>
          Editando produto #{product.codigo}
        </span>
      </div>
      <div className="hidden">
        <label className="text-bold text-lg">Codigo </label>
        <Input name="codigo" defaultValue={product.codigo}/>
      </div>
      <div>
        <label className="text-bold text-lg">Descrição</label>
        <Input name="descricao" defaultValue={product.descricao} />
      </div>
      <div>
        <label className="text-bold text-lg">Peso bruto</label>
        <Input name="pesoBruto" step={.1} type="number" defaultValue={product.pesoBruto} />
      </div>
      <div>
        <label className="text-bold text-lg">Peso líquido</label>
        <Input name="pesoLiquido" step={.1} type="number" defaultValue={product.pesoLiquido} />
      </div>
      <div>
        <label className="text-bold text-lg">Unidade de Medida</label>
        <select className="w-full h-12 border border-slate-200 rounded-md px-2" defaultValue={product.um} {...methods.register("um", {required: true})}>
          <option value={product.um}>{product.um}</option>
          {
            measurementUnits.length > 0
            ? measurementUnits.filter(option => option !== product.um).map(option => <option key={option} value={option}>{option}</option>)
            : null
          }
      </select>
      </div>
      <ButtonDelete type="button" onClick={handleDelete} className="border-red-600 text-red-600 md:w-40 md:px-0 md:whitespace-nowrap hover:bg-red-600 hover:text-white" isLoading={isDeleting}>
        <span className="text-lg">Deletar produto</span>
      </ButtonDelete>
      <div id="ModalButtons" className='flex justify-between gap-4 mt-4'>
        <Button onClick={closeOverlay} className="bg-red-600 md:max-w-min md:px-16 hover:text-red-600 hover:border-red-600" disabled={isDeleting}>
          <span className="text-lg">Cancelar</span>
        </Button>
        <Button className="md:max-w-min md:px-16" disabled={isDeleting}>
          <span className="text-lg">
            Salvar
          </span>
        </Button>
      </div>
    </form>
  </FormProvider>
)}

export default EditProduct;