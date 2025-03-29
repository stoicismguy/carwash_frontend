import api from "@/api";
import { useEffect, useState } from "react";
import { IPageProps } from "../..";
import { DepartmentList } from "./components";
import { Skeleton } from "@/components/ui";


const Department = ({ page, handleStage, changeData, data }: IPageProps) => {

    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchList = async () => {
        setLoading(true);
        await api.get(`carwashes/${data.carwash}/branches/?bodytypes=${data.autotype}`).then((res) => {
            setList(res.data);
            console.log(res.data);
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
            {loading ? <div className="w-full grid grid-cols-3 mb:grid-cols-1 gap-4 mb:gap-2">
                {Array(3).fill(0).map((_, i) => (
                    <>
                        <Skeleton key={i} className="bg-primary/10 w-full h-[250px]" />
                    </>  
                ))}
            </div> : <>
                {list.length === 0 && <h1 className="text-center text-muted-foreground mt-[60%]">Филиалы не найдены</h1>}
                <DepartmentList data={data} list={list} choose={handleChoose} />
            </>}
            
        </div>
    )
}

export default Department;