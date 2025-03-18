import { useAuth } from "@/AuthContext";
import Header from "@/shared/header";
import { useState } from "react";
import BreadcrumbNavigation from "./BreadCrumbNavigation";
import { motion } from "framer-motion";

const Search = () => {

    const { user, login, logout } = useAuth();
    const [stage, setStage] = useState(2);

    const navLinks: string[] = ["Выбор автомойки", "Тип автомобиля", "Филиал", "Услуги", "Оплата"];
    
    return (
        <>
            <Header user={user} login={login} logout={logout}/>
            <BreadcrumbNavigation className="h-[40px]" navLinks={navLinks} stage={stage} setStage={setStage} />
            <motion.div
                key={stage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }} className="w-full bg-red-200 h-[100vh]">
                <h1>123</h1>
            </motion.div>
        </>
    );
}

export default Search;