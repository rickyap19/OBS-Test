export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export interface UserContextType {
  users: User[];
  loading: boolean;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: number, user: Partial<User>) => void;
  deleteUser: (id: number) => void;
}