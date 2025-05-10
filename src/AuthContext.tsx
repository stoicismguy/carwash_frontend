import { useContext, createContext } from "react"
import React, { useState } from "react"
import api from "./api"

interface ILogin {
    phone_number: string,
    password: string
}

export interface IUser {
    name: string,
    user_type: string,
    phone_number: string
}

export interface IAuthContext {
    user: any,
    // login: ({phone, password}: ILogin) => Promise<void>,
    login: ({phone_number, password}: ILogin) => Promise<boolean>,
    logout: () => void,
    updateUser: (userData: IUser) => void
}


const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children}) => {

    const user = () => {
        const user = localStorage.getItem("user");
        if (user) {
            return JSON.parse(user);
        }
        else {
            return null;
        }
    }

    const login = async ({ phone_number, password }: ILogin) => {
        try {
            const tokenResponse = await api.post("users/token/", { phone_number, password });
            localStorage.setItem("accessToken", tokenResponse.data.access);
            localStorage.setItem("refreshToken", tokenResponse.data.access);
            
            const userResponse = await api.get("users/");
            localStorage.setItem("user", JSON.stringify(userResponse.data));
            
            return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    };

    const updateUser = async (userData: IUser) => {
        localStorage.setItem("user", JSON.stringify(userData));
    }

    return (
        <AuthContext.Provider value={{user, login, logout, updateUser}}>{children}</AuthContext.Provider>
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