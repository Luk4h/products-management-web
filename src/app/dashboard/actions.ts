'use server'

import { auth } from "~/auth";
import { type DeleteProductFormat, type CreateProductFormat, type EditProductFormat, type Grupo, type Um, type Product } from "../api/tecadi/interfaces";
import apiTecadi from "../api/tecadi";

export async function retrieveProducts(pageNumber: string, limit: string): Promise<Product[]> {
  const session = await auth();
  if (!session)
    return [];

  const { accessToken } = session.user;
  const products: Product[] = await apiTecadi.retrieveProducts({pageNumber: Number(pageNumber), limit: Number(limit), accessToken});
  return products;
}

export async function getGrupo() {
  const session = await auth();
  if (!session)
    return [];

  const groupNames: Grupo[] = await apiTecadi.getGrupo(session.user.accessToken);
  return groupNames;
}

export async function getUM() {
  const session = await auth();
  if (!session)
    return [];

  const measurementUnits: Um[] = await apiTecadi.getUM(session.user.accessToken);
  return measurementUnits;
}

export async function editProduct(params: EditProductFormat) {
  const session = await auth();
  if (!session)
    return {isError: true, message: "Você precisa estar autenticado para realizar essa ação"};

  try {  
  const response: string = await apiTecadi.editProduct(params, session.user.accessToken);
  if (!response)
    return {isError: true, message: "A resposta esta vazia."};

  return {isError: false, message: response};
  } catch (err: unknown) {
    if (err instanceof Error)
    return {isError: true, message: err.message}

  return {isError: true, message: "Ocorreu um erro ao editar este produto."}
  } 
}

export async function createProduct(params: CreateProductFormat) {
  const session = await auth();
  if (!session)
    return {isError: true, message: "Você precisa estar autenticado para realizar essa ação"};

  try {  
  const response: string = await apiTecadi.createProduct(params, session.user.accessToken);

  if (!response)
    return {isError: true, message: "A resposta esta vazia."};

  return {isError: false, message: response};
  } catch (err: unknown) {
    if (err instanceof Error)
    return {isError: true, message: err.message}

  return {isError: true, message: "Ocorreu um erro ao criar este produto."}
  } 
}

export async function deleteProduct(params: DeleteProductFormat) {
  const session = await auth();
  if (!session)
    return {isError: true, message: "Você precisa estar autenticado para realizar essa ação"};

  try {
  const response: string = await apiTecadi.deleteProduct(params, session.user.accessToken);
  console.log(response);

  if (!response)
    return {isError: true, message: "A resposta esta vazia."};

  return {isError: false, message: response};
  } catch (err: unknown) {
    if (err instanceof Error)
      return {isError: true, message: err.message}

    return {isError: true, message: "Ocorreu um erro ao deletar este produto."}
  } 
}