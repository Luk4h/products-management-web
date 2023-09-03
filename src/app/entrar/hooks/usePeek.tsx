import { useState } from "react"

const usePeek = () => {
  const [ isPeeking, setPeeking ] = useState<boolean>(false);

  const handlePeek = () => {
    setPeeking(isPeeking => !isPeeking);
  }

  return { isPeeking, handlePeek }
}

export default usePeek;