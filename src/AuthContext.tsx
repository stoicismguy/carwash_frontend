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
    logout: () => void
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
        await api.post("users/token/", { phone_number, password }).then((res) => {
            localStorage.setItem("accessToken", res.data.access);
            localStorage.setItem("refreshToken", res.data.access);
            // localStorage.setItem("user", JSON.stringify(user));
            console.log(res.data);
        }).catch((error) => {return false});
        await api.get("users/").then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            console.log(res.data);
        }).catch((error) => {return false});
        return true;
    };
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
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