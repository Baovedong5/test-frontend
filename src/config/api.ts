import axios from "./axios-customize";

export const callLogin = (email: string, password: string) => {
  return axios.post<IBackendRes<IAccount>>("/api/v1/auth/login", {
    email,
    password,
  });
};

export const callRegister = (name: string, email: string, password: string) => {
  return axios.post<IBackendRes<IAccount>>("/api/v1/auth/register", {
    name,
    email,
    password,
  });
};

export const callListProduct = (page: number, limit: number) => {
  return axios.get<IModelPaginate<IProduct>>(
    `http://localhost:8000/api/v1/product/list?limit=${limit}&page=${page}`
  );
};

export const callUpdateProduct = (
  id: string,
  name: string,
  price: number,
  description: string
) => {
  return axios.put<IBackendRes<IProduct>>(
    "http://localhost:8000/api/v1/product/update",
    {
      id,
      name,
      price,
      description,
    }
  );
};

export const callDeleteProduct = (id: string) => {
  return axios.delete<IBackendRes<IProduct>>(
    "http://localhost:8000/api/v1/product/delete"
  );
};

export const callCreateProduct = (
  name: string,
  price: number,
  description: string
) => {
  return axios.post("http://localhost:8000/api/v1/product", {
    name,
    price,
    description,
  });
};
