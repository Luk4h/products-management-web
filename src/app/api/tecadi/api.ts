/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { type User } from "next-auth";
import { type ErrorResponse, type AuthorizationOk, type ProductList, type EditProductFormat, type CreateProductFormat, type UmList, type Product, type Um, type GrupoList, type Grupo, type DeleteProductFormat, type AuthorizationError } from "./interfaces";
import ApiError from "../ApiError";

type APIConstructorProps = {
  endpoint: string;
}

class API {
  private endpoint: URL;
  private accessToken: string | undefined;

  constructor({endpoint}: APIConstructorProps) {
    this.endpoint = new URL(endpoint);
  }

  private async insecureRequest<T, E extends ErrorResponse | string>(endpoint: URL, init?: RequestInit | undefined): Promise<T> {
    const response = await fetch(endpoint, {...init});
    try {
      let data: string | T | E;
      
      data = await response.text();
      try {
        const jsonData = await JSON.parse(data) as T | E;
        data = jsonData;
      } catch {}

      if ( !response.ok ) {
        console.log("Response not Ok");
        const errorData  = data as E;
        if (typeof data === 'string') {
          throw new ApiError(response.status, errorData as string);
        } else if (typeof data === 'object') {
          throw new ApiError(response.status, String((errorData as ErrorResponse).message));
        } else {
          throw new Error('Houve um erro ao se comunicar com o serviço.');
        }
      }

      return data as Promise<T>
    } catch (err) {
      if (err instanceof ApiError)
        throw new Error(err.message);

      console.log(err);
      throw new Error('Houve um erro ao se comunicar com o serviço.');
    }
  }

  private protectedRequest<T, E extends ErrorResponse | string>(endpoint: URL, accessToken: string, init?: RequestInit | undefined) {
    return this.insecureRequest<T, E>(endpoint, {headers: {Authorization: `Bearer ${accessToken}`}, ...init})
  }

  public authenticate({username, password}: {username: string, password: string}): Promise<User> {
    const authenticateUrl = new URL(this.endpoint);
    authenticateUrl.pathname = "/tecadi/api/oauth2/v1/token";
    authenticateUrl.searchParams.append("grant_type", "password");
    authenticateUrl.searchParams.append("username", username);
    authenticateUrl.searchParams.append("password", password);
    return this.insecureRequest<AuthorizationOk, AuthorizationError>(authenticateUrl, { method: 'POST'})
      .then((data) => {
        if ( !data.access_token )
        this.accessToken = data.access_token;
        return {
          name: "Usuário de teste",
          email: "usuarioteste@tecadi.com.br",
          accessToken: data.access_token,
          id: "1"
        } as User
      })
  }

  public retrieveProducts({pageNumber = 1, limit = 10, accessToken}: { pageNumber: number, limit: number, accessToken: string}) {
    const productsUrl = new URL(this.endpoint);
    productsUrl.pathname = "/tecadi/treinamento/produto";
    const offset = limit * (pageNumber - 1);
    productsUrl.searchParams.append("offset", String(offset));
    productsUrl.searchParams.append("limit", String(limit));
    return this.protectedRequest<ProductList, string>(productsUrl, accessToken)
      .then(data => {
        return data.list;
      })
      .catch(() => {
        return [] as unknown as Product[];
      })
  }

  public editProduct(product: EditProductFormat, accessToken: string): Promise<string> {
    const editProduct = new URL(this.endpoint);
    editProduct.pathname = "/tecadi/treinamento/produto";
    return this.protectedRequest<string, string>(editProduct, accessToken, { method: 'PUT', body: JSON.stringify(product)})
  }

  public createProduct(product: CreateProductFormat, accessToken: string): Promise<string> {
    const createProduct = new URL(this.endpoint);
    createProduct.pathname = "/tecadi/treinamento/produto";
    return this.protectedRequest<string, string>(createProduct, accessToken, {method: 'POST', body: JSON.stringify(product)})
  }

  public getUM(accessToken: string) {
    const productsUrl = new URL(this.endpoint);
    productsUrl.pathname = "/tecadi/treinamento/produto/um";
    return this.protectedRequest<UmList, string>(productsUrl, accessToken)
      .then(data => {
        return data.list;
      })
      .catch(() => {
        return [] as unknown as Um[];
      })
  }

  public getGrupo(accessToken: string) {
    const productsUrl = new URL(this.endpoint);
    productsUrl.pathname = "/tecadi/treinamento/produto/grupo";
    return this.protectedRequest<GrupoList, string>(productsUrl, accessToken)
      .then(data => {
        return data.list;
      })
      .catch(() => {
        return [] as unknown as Grupo[];
      })
  }

  public deleteProduct(product: DeleteProductFormat, accessToken: string) {
    const productsUrl = new URL(this.endpoint);
    productsUrl.pathname = "/tecadi/treinamento/produto";
    productsUrl.searchParams.append("codigo", String(product.codigo));
    return this.protectedRequest<string, string>(productsUrl, accessToken, { method: 'DELETE'})
  }
}

export default API;