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
    const [inputValue, setInputValue] = useState("");

    const fetchList = async (page?: number, inputValue?: string) => {
        await api.get(`carwashes/search/?page=${page ? page : ''}&${inputValue ? `&name=${inputValue}` : ''}`).then((res) => {
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
                <SearchArea inputValue={inputValue} setInputValue={setInputValue} fetch={fetchList} />
                {/* <Filters /> */}
            </div>
            {response?.results.length ?
                <>
                    <CarwashList data={data} list={response?.results} choose={handleChoose} />
                    {response && <PaginationMenu current={response.current} total={response?.total_pages} fetch={fetchList} inputValue={inputValue} />}
                </>
                : 
                <div className="w-full flex items-center justify-center mt-[40%] text-muted-foreground">По вашему запросу ничего не найдено</div>
            }
            
        </div>
    )
}

export default Carwash;