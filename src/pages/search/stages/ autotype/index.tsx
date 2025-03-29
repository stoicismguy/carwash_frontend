import { useEffect, useState } from "react";
import { IPageProps } from "../..";
import { TypesList } from "./components";
import api from "@/api";
import React from "react";
import { Skeleton } from "@/components/ui";

const Autotype = ({ page, handleStage, changeData, data }: IPageProps) => {

    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchList = async () => {
        setLoading(true);
        await api.get(`carwashes/${data.carwash}/bodytypes/`).then((res) => {
            setList(res.data);
        })
        .finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchList();
    }, [])

    const handleChoose = ({ value }: any) => {
        console.log(value);
        changeData({...data, autotype: value }, page.stage);
        handleStage(page.stage + 1);
    }

    return (
        <div className="w-full px-40 pb-10 flex flex-col gap-5 mb:px-5">
            {loading ? <div className="w-full grid grid-cols-4 mb:grid-cols-2 gap-4 mb:gap-2">
                {Array(8).fill(0).map((_, i) => (
                    <div className="w-full rounded-xl h-[200px] grid grid-rows-[6fr_1fr] gap-2 mb:h-[150px]">
                        <Skeleton className="bg-primary/5 w-full" />
                        <Skeleton className="bg-primary/5 w-30" />
                    </div>
                ))}
            </div> : <>
                {list.length === 0 && <p className="text-center text-muted-foreground mt-[60%]">Ничего не найдено</p>}
                <TypesList list={list} choose={handleChoose} data={data} />
            </>}
            
        </div>
    )
}

export default React.memo(Autotype);