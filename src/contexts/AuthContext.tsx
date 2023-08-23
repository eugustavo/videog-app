import { createContext, useEffect, useState } from 'react';

import { storageUserSave, storageUserGet, storageUserRemove } from '@storage/storageUser'
import { api } from '@services/api';

import { UserDTO } from '@dtos/UserDTO';

type Credentials = {
  userIdentifier: string;
}

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (credentials: Credentials) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  async function signIn(credentials: Credentials) {
    try {
      const { data } = await api.get<UserDTO>(`/users/${credentials.userIdentifier}`)
      
      setUser(data);
      storageUserSave(data);
      return
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      
      setUser({} as UserDTO);
      await storageUserRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet();

      if (userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      signOut,
      isLoadingUserStorageData
    }}>
      {children}
    </AuthContext.Provider>
  )
}