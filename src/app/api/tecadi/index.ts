import API from "./api";

const endpoint = process.env.TECADI_ENDPOINT;
if (!endpoint)
  throw new Error("TECADI_ENDPOINT não definida nas variáveis de ambiente.");

const apiTecadi = new API({endpoint});

export default apiTecadi;