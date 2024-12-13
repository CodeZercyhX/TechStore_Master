export interface Product {
  _id?: string; // Cambiado de `id` a `_id` y definido como opcional
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

export interface Customer {
  id: string; // No requiere cambios
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface User {
  username: string;
  role: 'admin' | 'customer';
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}
