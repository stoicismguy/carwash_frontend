import { useContext, createContext } from "react"
import React, { useState } from "react"
import api from "./api"

interface ILogin {
    phone: string,
    password: string
}

export interface IAuthContext {
    user: any,
    // login: ({phone, password}: ILogin) => Promise<void>,
    login: () => void,
    logout: () => void
}


const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children}) => {

    // const [user, setUser] = useState<any>(null);
    // const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
    // const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || null);

    // const user = {"name": "Даниил", user_type: "Водитель"};
    const user = {"name": "Авто Авеню", user_type: "Бизнес"};
    const login = () => {console.log("login")};
    const logout = () => {console.log("logout")};

    // const login = async ({phone, password}: ILogin) => {
    //     try {
    //         const response = await api.post("/auth/login", { phone, password });
    //         const { access, refresh, user } = response.data;
        
    //         setUser(user);
    //         setAccessToken(access);
    //         setRefreshToken(refresh);
        
    //         localStorage.setItem("accessToken", access);
    //         localStorage.setItem("refreshToken", refresh);
    //         localStorage.setItem("user", JSON.stringify(user));
    //     } catch (err) {
    //         throw "123";
    //     }
    // };

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