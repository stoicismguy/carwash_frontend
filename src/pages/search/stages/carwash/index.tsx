import { Button, Checkbox, Input, Label, Popover, PopoverContent, PopoverTrigger, Skeleton } from "@/components/ui";
import { Car, ChevronDown, ChevronRight, CircleX, Search, Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { CarwashList, SearchArea, Filters } from "./components";
import { IPageProps } from "../..";

const Carwash = ({ page, handleStage, changeData, data }: IPageProps) => {

    const handleChoose = () => {
        changeData({...data, carwash: "inputValue" });
    }

    return (
        <div className="w-full px-40 flex flex-col gap-5 mb:px-5">
            <div className="w-full flex flex-col gap-2 mb:gap-1">
                <SearchArea />
                {/* <Filters /> */}
            </div>
            <CarwashList data={Array(10).fill(0)} />
        </div>
    )
}

export default Carwash;