export interface AuthorizationOk {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
}

export interface AuthorizationError {
  code: number;
  message: string;
  detailedMessage: string;
}

export interface RequestReturn {
  error: boolean;
  message?: string;
}

export interface Product {
  codigo: string;
  codigoCliente: string;
  descricao: string;
  um: string;
  pesoBruto: number;
  pesoLiquido: number;
  grupo: string;
  saldo: number;
}

export interface ProductList {
  offset: string;
  limit: string;
  list: Product[];
}

export type Um =
"UN" | "KG" | "AP" | "CX"

export interface UmList {
  list: Um[];
}

export type Grupo =
  "SPRI" | "RITR" | "MINE" | "SOVE" | "SUMI"

export interface GrupoList {
  list: Grupo[];
}

export interface EditProductFormat {
  codigo: string,
  descricao: string,
  pesoBruto: number,
  pesoLiquido: number,
  um: string
}

export interface CreateProductFormat {
  codigoCliente: string,
  descricao: string,
  pesoBruto: number,
  pesoLiquido: number,
  grupo: string,
  um: string
}

export interface DeleteProductFormat {
  codigo: string,
}

export interface ErrorResponse {
  message: string
}