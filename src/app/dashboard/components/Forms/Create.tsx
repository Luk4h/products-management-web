//! OnSubmit não espera um retorno
//! Linha 51
/* eslint-disable @typescript-eslint/no-misused-promises */
import Button from "~/app/components/Button"
import Input from "~/app/components/Input/FormTextField"
import { useOverlay } from "../../providers/OverlayProvider"
import { FormProvider } from "react-hook-form"
import useCreate from "../../hooks/useCreate"
import { getGrupo, getUM } from "../../actions"
import { useState, useEffect } from "react"
import { type Grupo, type Um } from "~/app/api/tecadi/interfaces"

const CreateProduct = () => {
  const {closeOverlay} = useOverlay();
  const {methods, handleSubmit} = useCreate();
  const [measurementUnits, setMeasurementUnits] = useState<Um[]>([]);
  const [groupNames, setGroupNames] = useState<Grupo[]>([]);

  const getMeasurement = async () => getUM();
  const getGroups = async () => getGrupo();

  useEffect(() => {
    void getMeasurement()
      .then((UMs: Um[]) => {setMeasurementUnits(UMs)});
    void getGroups()
      .then((groups: Grupo[]) => {setGroupNames(groups)});
  }, [])

  
  return (
    <FormProvider {...methods}>
      <form id="ProductModal" onSubmit={handleSubmit} className="w-screen bg-white rounded-t-lg shadow-xl h-auto px-2 py-4 flex flex-col gap-4 overflow-scroll animate-fadeUp md:rounded-lg md:px-8 md:py-12 md:overflow-hidden md:max-w-3xl">
      <div id="ModalHeader" className="w-full flex justify-center items-center">
        <span>
          Criando novo produto
        </span>
      </div>
      <div>
        <label className="text-bold text-lg">Codigo cliente</label>
        <Input name="codigoCliente" placeholder="Código do cliente"/>
      </div>
      <div>
        <label className="text-bold text-lg">Descrição</label>
        <Input name="descricao" placeholder="Descrição" />
      </div>
      <div>
        <label className="text-bold text-lg">Peso bruto</label>
        <Input name="pesoBruto" placeholder="Peso bruto" />
      </div>
      <div>
        <label className="text-bold text-lg">Peso líquido</label>
        <Input name="pesoLiquido" placeholder="Peso líquido" />
      </div>
      <div>
        <label className="text-bold text-lg">Unidade de Medida</label>
        <select className="w-full h-12 border border-slate-200 rounded-md px-2" {...methods.register("um", {required: true})}>
          {
            measurementUnits.length > 0
            ? measurementUnits.map(option => <option key={option} value={option}>{option}</option>)
            : null
          }
      </select>
      </div>
      <div>
        <label className="text-bold text-lg">Grupo</label>
        <select className="w-full h-12 border border-slate-200 rounded-md px-2" {...methods.register("grupo", {required: true})}>
          {
            groupNames.length > 0
            ? groupNames.map(option => <option key={option} value={option}>{option}</option>)
            : null
          }
        </select>
      </div>
      <div id="ModalButtons" className="flex justify-between gap-4">
        <Button onClick={closeOverlay} className="bg-red-600 md:max-w-min md:px-16">
          <span className="text-lg">Cancelar</span>
        </Button>
        <Button className="md:max-w-min md:px-16">
          <span className="text-lg">
            Criar
          </span>
        </Button>
      </div>
    </form>
  </FormProvider>
)}

export default CreateProduct;