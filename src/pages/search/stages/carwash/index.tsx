import { Button, Checkbox, Input, Label, Popover, PopoverContent, PopoverTrigger, Skeleton } from "@/components/ui";
import { Car, ChevronDown, ChevronRight, CircleX, Search, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { CarwashList, SearchArea, Filters } from "./components";
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
        changeData({...data, carwash: value });
        handleStage(page.stage + 1);
    }

    return (
        <div className="w-full px-40 flex flex-col gap-5 mb:px-5">
            <div className="w-full flex flex-col gap-2 mb:gap-1">
                <SearchArea />
                {/* <Filters /> */}
            </div>
            <CarwashList data={list} choose={handleChoose} />
        </div>
    )
}

export default Carwash;