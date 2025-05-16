import { IOrderData } from "@/pages/search";
import React from "react";
import GroupItem from "./GroupItem";
import { Button } from "@/components/ui";
import { ChevronRight } from "lucide-react";


interface IProps {
    list: any[],
    choose: (value: any) => void,
    data: IOrderData
}

const ServicesList = ({ list, choose, data }: IProps) => {
    return (
        <div className="w-full flex flex-col mb:grid-cols-2 gap-4 mb:gap-2">
            {list.map((group) => (
                <GroupItem item={group} key={group.name} choose={choose} services={[]} openDefault={false}  />
            ))}
        </div>
    )
}

export default React.memo(ServicesList);