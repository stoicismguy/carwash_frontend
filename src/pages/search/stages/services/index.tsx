import { useEffect, useState } from "react";
import { IPageProps } from "../..";
import api from "@/api";
import { GroupItem, ServicesList } from "./components";
import { Button, Skeleton } from "@/components/ui";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { IService } from "@/pages/search";

const Services = ({ page, handleStage, changeData, data }: IPageProps) => {

    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [chosenServices, setChosenServices] = useState<IService[]>(data.services || []);

    const fetchList = async () => {
        setLoading(true);
        await api.get(`services/${data.department}/`).then((res) => {
            setList(res.data);
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchList();
    }, [])

    const toggleChooseId = (service: IService) => {
        if (chosenServices.some((s) => s.id === service.id)) {
            setChosenServices(chosenServices.filter((s) => s.id !== service.id));
        } else {
            setChosenServices([...chosenServices, service]);
        }
    }

    const handleChoose = ({ value }: any) => {
        changeData({...data, services: value }, page.stage);
        handleStage(page.stage + 1);
    }
    
    return (
        <div className="w-full px-40 pb-10 flex flex-col gap-5 mb:px-5">
            {loading ? <div className="w-full flex flex-col gap-2 items-center justify-center">
                {Array(4).fill(0).map((_, i) => (
                    <>
                        <Skeleton key={i} className="bg-primary/10 w-full h-11" />
                        <Skeleton key={i} className="bg-primary/10 w-full h-5" />
                        <Skeleton key={i} className="bg-primary/10 w-full h-5" />
                        <Skeleton key={i} className="bg-primary/10 w-full h-5 mb-3" />
                    </>  
                ))}
            </div> : (
                <>
                    {list.length === 0 && <h1 className="text-center text-muted-foreground mt-[10%] mb:mt-[60%]">Услуги не найдены</h1>}

                    <div className="w-full flex flex-col mb:grid-cols-2 gap-4 mb:gap-2">
                        {list.map((group, index) => (
                            <GroupItem item={group} openDefault={index === 0} key={group.name} choose={toggleChooseId} services={chosenServices} />
                        ))}
                    </div>

                    {list.length !== 0 && <Button className="h-[45px] mt-3 flex items-center" disabled={chosenServices.length === 0} onClick={() => handleChoose({ value: chosenServices })}>Выбрать время 
                    <div className={cn("flex text-primary font-semibold bg-primary-foreground text-[14px] p-1 w-6 h-6 items-center justify-center rounded-full", { hidden: chosenServices.length === 0 })}>{chosenServices.length}</div>
                    <ChevronRight size={16} /></Button>}
                </>
            )}
            
            
        </div>
    )
}

export default Services;