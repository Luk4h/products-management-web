import { useForm, type SubmitHandler } from "react-hook-form";
import { type Product } from "~/app/api/tecadi/interfaces";
import { createProduct } from "../actions";
import { useOverlay } from "../providers/OverlayProvider";
import { useRouter } from "next/navigation";


const useCreate = () => {
  const methods = useForm<Product>();
  const {closeOverlay} = useOverlay();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {refresh} = useRouter();
  
  const onSubmit: SubmitHandler<Product> = async (data) => {
    console.log("CreatingProduct");
    const newProduct = {
      codigoCliente: data.codigoCliente,
      descricao: data.descricao,
      pesoBruto: Number(data.pesoBruto),
      pesoLiquido: Number(data.pesoLiquido),
      grupo: data.grupo,
      um: data.um
  }
    const result = await createProduct(newProduct);
    closeOverlay();
    if (result.isError) {
      alert(result.message);
      return false;
    }

    alert(result.message);
    refresh();
    return true;
  };

  return { methods, handleSubmit: methods.handleSubmit(onSubmit) };
}

export default useCreate;