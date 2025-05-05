import Header from "@/shared/header";
import React, { useEffect, useState } from "react";
import BreadcrumbNavigation from "./BreadCrumbNavigation";
import { motion } from "framer-motion";
import { Carwash, Department, Services, Payment, Autotype, Datetime } from "./stages";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/AuthContext";


interface IPage {
    name: string;
    page: React.ComponentType<IPageProps>,
    stage: number,
    dataname: keyof IOrderData
}

export interface IOrderData {
    carwash: string | null;
    autotype: "1" | "2" | "3" | null;
    department: string | null;
    services: IService[];
    time: string | null;
    payment?: string | null;
}

export interface IPageProps {
    page: IPage,
    handleStage: (index: number) => void,
    data: IOrderData,
    changeData: (data: IOrderData, stage: number) => void
}

export interface IService {
    id: number;
    name: string;
    price: number;
    duration: number;
    group: number;
    description: string;
}


const Search = () => {

    const [stage, setStage] = useState(0);
    const { user } = useAuth();
    const currentUser = user();
    const [pendingStage, setPendingStage] = useState<number | null>(null);
    const [orderData, setOrderData] = useState<IOrderData>({
        carwash: null,
        autotype: null,
        department: null,
        services: [],
        time: "",
        payment: null
    })

    const pages: IPage[] = [
        { name: "Выбор автомойки", page: Carwash, dataname: "carwash", stage: 0 }, 
        { name: "Тип автомобиля", page: Autotype, dataname: "autotype", stage: 1 },
        { name: "Филиал", page: Department, dataname: "department", stage: 2 },
        { name: "Услуги", page: Services, dataname: "services", stage: 3 },
        { name: "Время", page: Datetime, dataname: "time", stage: 4 },
        { name: "Оплата", page: Payment, dataname: "payment", stage: 5 }
    ]

    const handleStageSwitch = (index: number) => {
        console.log("Current stage:", stage, "Target index:", index, "OrderData:", orderData);
        if (index === stage) return;
        if (index < stage) {
          setStage(index);
          return;
        }
        for (let i = stage; i < index; i++) {
          const currentPage = pages.find((p) => p.stage === i);
          if (currentPage && orderData[currentPage.dataname] === null) {
            setPendingStage(index); // Запоминаем целевой этап
            return;
          }
        }
        setStage(index);
    };

    useEffect(() => {
        if (pendingStage !== null) {
            for (let i = stage; i < pendingStage; i++) {
                    const currentPage = pages.find((p) => p.stage === i);
                    if (currentPage && orderData[currentPage.dataname] === null) {
                        return; // Ещё не все данные готовы
                }
        }
        setStage(pendingStage);
        setPendingStage(null); // Сбрасываем
        }
    }, [orderData, stage, pendingStage]);

    const orderDataSetter = (data: IOrderData, stage: number) => {
        setOrderData(data);
        pages.filter((p) => p.stage > stage).forEach((p) => {
            setOrderData((prevData) => ({
                ...prevData,
                [p.dataname]: null
            }));
        })
    }

    let CurrentPage = pages[stage].page;
    
    return (
        <>
            <Header />
            <BreadcrumbNavigation className="h-[60px] mb:px-5 mb:h-[80px]" pages={pages} stage={stage} handleStage={handleStageSwitch} />
            {!currentUser && <div className="px-40 mb:px-4 pb-3">
                <div className="flex flex gap-2 items-center justify-center bg-red-500 border border-red-600 px-2 py-1.5 rounded-md">
                    <AlertCircle className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
                    <h1 className="text-sm font-semibold text-primary-foreground">Для бронирования необходимо иметь аккаунт!</h1>
                </div>
            </div>}
            
            <motion.div
                key={stage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }} className="w-full h-full">
                <CurrentPage
                    page={pages[stage]}
                    handleStage={handleStageSwitch}
                    data={orderData}
                    changeData={orderDataSetter} />
            </motion.div>
        </>
    );
}

export default Search;