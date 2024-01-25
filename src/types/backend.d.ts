export {};

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IAccount {
    _id: string;
    name: string;
    email: string;
    role: string;
    password: string;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface IProduct {
    _id: string;
    name: string;
    price: number;
    description: string;
    createdAt: string;
    updatedAt: string;
  }
}
