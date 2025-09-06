import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

type UsersContextType = {
  users: User[];
  addUser: (user: Omit<User, "id">) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
};

export const UsersContext = createContext<UsersContextType>({} as UsersContextType);

export default function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await AsyncStorage.getItem("users");
    if (data) setUsers(JSON.parse(data));
  }

  async function saveUsers(newUsers: User[]) {
    setUsers(newUsers);
    await AsyncStorage.setItem("users", JSON.stringify(newUsers));
  }

  function addUser(user: Omit<User, "id">) {
    const newUsers = [...users, { id: Date.now().toString(), ...user }];
    saveUsers(newUsers);
  }

  function updateUser(updatedUser: User) {
    const newUsers = users.map((u) => (u.id === updatedUser.id ? updatedUser : u));
    saveUsers(newUsers);
  }

  function deleteUser(id: string) {
    const newUsers = users.filter((u) => u.id !== id);
    saveUsers(newUsers);
  }

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
}
