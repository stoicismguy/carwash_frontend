import { cn } from "@/lib/utils";
import { IOrderData } from "@/pages/search";
import { Skeleton } from "@/components/ui";

interface IProps {
    list: any[],
    choose: (value: any) => void,
    data: IOrderData
}

const TypesList = ({ list, choose, data }: IProps) => {

    return (
        <div className="w-full grid grid-cols-4 mb:grid-cols-2 gap-4 mb:gap-2">
            {list.map((item) => (
                <div
                    key={item.name}
                    onClick={() => choose({ value:item.id })}
                    className={cn("w-full rounded-xl cursor-pointer p-3 shadow-md hover:shadow-lg transition-shadow border h-[200px] mb:h-[150px]", (data.autotype === item.id) && "border-primary shadow-primary/50")}
                    >
                    <img src={item.img} alt="" />
                    <p className="text-gray-600">{item.name}</p>
                </div>
                ))
            }
        </div>
    )
}

export default TypesList;