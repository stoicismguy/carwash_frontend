import { useEffect, useState } from "react";
import { CarwashList, SearchArea } from "./components";
import { IPageProps } from "../..";
import api from "@/api";


const Carwash = ({ page, handleStage, changeData, data }: IPageProps) => {

    const [list, setList] = useState<any[]>([]);

    const fetchList = async () => {
        await api.get("carwashes/").then((res) => {
            setList(res.data);
        })
    }

    useEffect(() => {
        fetchList();
    }, [])

    const handleChoose = ({ value }: any) => {
        console.log(value);
        changeData({...data, carwash: value }, page.stage);
        handleStage(page.stage + 1);
    }

    return (
        <div className="w-full px-40 pb-10 flex flex-col gap-5 mb:px-5">
            <div className="w-full flex flex-col gap-2 mb:gap-1">
                <SearchArea />
                {/* <Filters /> */}
            </div>
            <CarwashList data={data} list={list} choose={handleChoose} />
        </div>
    )
}

export default Carwash;