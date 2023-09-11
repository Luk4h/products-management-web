import { useState } from "react"

//? Hook para visualizar a senha. 
const usePeek = () => {
  const [ isPeeking, setPeeking ] = useState<boolean>(false);

  const handlePeek = () => {
    setPeeking(isPeeking => !isPeeking);
  }

  return { isPeeking, handlePeek }
}

export default usePeek;