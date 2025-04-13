import { Button, Skeleton } from "@/components/ui";
import { ChevronRight, Star } from "lucide-react";
import { IOrderData } from "@/pages/search";
import CarwashItem from "./carwashItem";

interface IProps {
    list?: any[],
    choose: (value: any) => void,
    data: IOrderData
}

const CarwashList = ({ data, list, choose }: IProps) => {
    return (
        <div className="w-full grid grid-cols-3 mb:grid-cols-1 gap-4">
            {list && list.map((item) => (
                <CarwashItem item={item} choose={choose} data={data} />
            ))}
        </div>
    );
}

export default CarwashList;