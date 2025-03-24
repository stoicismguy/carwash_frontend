import { useAuth } from "@/AuthContext";
import Header from "@/shared/header";
import React, { useEffect, useState } from "react";
import BreadcrumbNavigation from "./BreadCrumbNavigation";
import { motion } from "framer-motion";
import { Carwash, Autotype, Department, Services, Payment } from "./stages";


interface IPage {
    name: string;
    page: React.ComponentType<IPageProps>,
    stage: number,
    dataname: keyof IOrderData
}

interface IOrderData {
    carwash: string | null;
    autotype: "1" | "2" | "3" | null;
    department: string | null;
    services: string | null;
    payment?: string | null;
}

export interface IPageProps {
    page: IPage,
    handleStage: (index: number) => void,
    data: IOrderData,
    changeData: (data: IOrderData) => void
}


const Search = () => {

    const [stage, setStage] = useState(0);
    const [pendingStage, setPendingStage] = useState<number | null>(null);
    const [orderData, setOrderData] = useState<IOrderData>({
        carwash: null,
        autotype: null,
        department: null,
        services: null
    })

    const pages: IPage[] = [
        { name: "Выбор автомойки", page: Carwash, dataname: "carwash", stage: 0 }, 
        { name: "Тип автомобиля", page: Autotype, dataname: "autotype", stage: 1 },
        { name: "Филиал", page: Department, dataname: "department", stage: 2 },
        { name: "Услуги", page: Services, dataname: "services", stage: 3 },
        { name: "Оплата", page: Payment, dataname: "payment", stage: 4 }
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

    let CurrentPage = pages[stage].page;
    
    return (
        <>
            <Header />
            <BreadcrumbNavigation className="h-[60px] mb:px-5 mb:h-[80px]" pages={pages} stage={stage} handleStage={handleStageSwitch} />
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
                    changeData={setOrderData} />
            </motion.div>
        </>
    );
}

export default Search;