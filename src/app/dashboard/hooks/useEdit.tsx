import { useForm, type SubmitHandler } from "react-hook-form";
import { type Product } from "~/app/api/tecadi/interfaces";
import { editProduct } from "../actions";
import { useOverlay } from "../providers/OverlayProvider";


const useEdit = () => {
  const methods = useForm<Product>();
  const {closeOverlay} = useOverlay();
  
  const onSubmit: SubmitHandler<Product> = async (data: Product) => {
    console.log("EditingProduct");
    const newProduct = {
      "codigo": data.codigo,
      "descricao": data.descricao,
      "pesoBruto": Number(data.pesoBruto),
      "pesoLiquido": Number(data.pesoLiquido),
      "um": data.um
  }
    const result = await editProduct(newProduct);
    closeOverlay();
    if (result.isError) {
      alert(result.message);
      return false;
    }

    alert(result.message);
    return true;
  };

  return { methods, handleSubmit: methods.handleSubmit(onSubmit) };
}

export default useEdit;