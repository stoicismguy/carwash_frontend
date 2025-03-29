import { useEffect, useState } from "react";
import { IPageProps } from "../..";
import api from "@/api";
import { ServicesList } from "./components";
import { Button, Skeleton } from "@/components/ui";
import { ChevronRight, LoaderCircle } from "lucide-react";

const Services = ({ page, handleStage, changeData, data }: IPageProps) => {

    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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

    const handleChoose = ({ value }: any) => {
        console.log(value);
        changeData({...data, department: value }, page.stage);
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
                    {list.length === 0 && <h1 className="text-center text-muted-foreground mt-[60%]">Услуги не найдены</h1>}
                    <ServicesList data={data} list={list} choose={handleChoose} />
                    {list.length !== 0 && <Button className="h-[40px] mt-3 flex items-center" disabled={list.length === 0} onClick={() => handleStage(page.stage + 1)}>К оплате 
                    <div className="flex text-primary font-semibold bg-primary-foreground p-1 w-6 h-6 items-center justify-center rounded-full">3</div>
                    <ChevronRight size={16} /></Button>}
                </>
            )}
            
            
        </div>
    )
}

export default Services;