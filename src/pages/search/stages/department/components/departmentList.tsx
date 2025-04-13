import { Button } from "@/components/ui";
import { IOrderData } from "@/pages/search";
import { ChevronRight, Star } from "lucide-react";
import React from "react";


interface IProps {
    list: any[],
    choose: (value: any) => void,
    data: IOrderData
}

const DepartmentList = ({ list, choose, data }: IProps) => {
    return (
        <div className="w-full grid grid-cols-3 mb:grid-cols-1 gap-4">
            {list.map((item) => (
                <div
                key={item.name}
                className="w-full rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between items-start border min-h-[250px]"
                >
                <div className="flex flex-col gap-1 flex-grow-0 flex-shrink-0">
                    <div className="flex flex-col gap-0">
                        <h1 className="text-2xl font-semibold text-primary whitespace-nowrap truncate">{item.address}</h1>
                        <p className="text-md text-primary line-clamp-2">{item.name}</p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    {item.logo && (
                    <img
                        src={item.logo}
                        className="w-12 h-12 rounded-md object-cover"
                        alt={`${item.name} logo`}
                    />
                    )}
                </div>
                <div className="w-full flex flex-col gap-2 mt-auto">
                    <div className="flex gap-1 items-center">
                        <p className="text-md font-medium text-primary">{item.rating}</p>
                        <Star size={15} className="text-yellow-400" />
                    </div>
                    <Button
                        className="w-full sm:h-9"
                        disabled={data.department === item.id}
                        onClick={() => choose({ value:item.id })}
                        size={"lg"}>
                        {data.department === item.id ? "Выбрано" : "Услуги"}{data.department !== item.id && <ChevronRight size={16} />}
                    </Button>
                </div>
            </div>
            ))}
        </div>
    )
}

export default React.memo(DepartmentList);