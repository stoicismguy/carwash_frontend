import { useEffect, useState } from "react";
import { CarwashList, SearchArea } from "./components";
import { IPageProps } from "../..";
import api from "@/api";
import PaginationMenu from "@/shared/paginationMenu";


interface IResponse {
    count: number;
    total_pages: number;
    current: number;
    next: string | null;
    previous: string | null;
    results: any[];
}

const Carwash = ({ page, handleStage, changeData, data }: IPageProps) => {

    const [response, setResponse] = useState<IResponse | null>(null);

    const fetchList = async (page?: number) => {
        await api.get(`carwashes/search/?page=${page ? page : ''}`).then((res) => {
            setResponse(res.data);
        })
    }

    useEffect(() => {
        fetchList();
    }, [])

    const handleChoose = ({ value }: any) => {
        changeData({...data, carwash: value }, page.stage);
        handleStage(page.stage + 1);
    }

    return (
        <div className="w-full px-40 pb-10 flex flex-col gap-5 mb:px-5">
            <div className="w-full flex flex-col gap-2 mb:gap-1">
                <SearchArea />
                {/* <Filters /> */}
            </div>
            <CarwashList data={data} list={response?.results} choose={handleChoose} />
            {response && <PaginationMenu current={response.current} total={response?.total_pages} fetch={fetchList} />}
        </div>
    )
}

export default Carwash;