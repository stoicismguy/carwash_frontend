import { useContext, createContext, useEffect, useState } from "react"
import React from "react"

interface IAuthContext {
    a: number
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children}) => {
    const a = 1;
    return (
        <AuthContext.Provider value={{a: a}}>{children}</AuthContext.Provider>
    )   
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}

export default AuthProvider;