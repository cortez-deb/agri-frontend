import {  createContext, useState } from "react";
import { ReactNode } from "react";


export  const AuthContext = createContext<GlobalAuthenticator>({
    Auth: {
        user:{}
    },
    setAuth:()=>{
    }
})

export type GlobalAuthenticator = {
    Auth: object,
    setAuth:(c: object) => void
  }

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [Auth, setAuth] = useState<object>({});
    return (
        <AuthContext.Provider value={{ Auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
};
