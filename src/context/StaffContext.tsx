import type React from 'react';
import { createContext, useContext, useState } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  department: 'surgery' | 'cardiology';
  role: 'doctor' | 'nurse';
  isHeadOfDepartment?: boolean;
}

interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: number, updatedUser: User) => void;
  deleteUser: (id: number) => void;
  modalOpen: boolean;
  modalHandle: () => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUsers = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  
  const [users, setUsers] = useState<User[]>([
    
  ]);
  const [modalOpen, setModal] = useState<boolean>(false)

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const updateUser = (id: number, updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
    );
  };

  const deleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const modalHandle = () => setModal(!modalOpen);
  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, modalOpen, modalHandle }}>
      {children}
    </UserContext.Provider>
  );
};
