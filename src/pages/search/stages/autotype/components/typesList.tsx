import { cn } from "@/lib/utils";
import { IOrderData } from "@/pages/search";
import { Skeleton } from "@/components/ui";

import truk from "@/assets/bodytypes/truk.svg"
import lekovoi from "@/assets/bodytypes/lekovoi.svg"
import minivan from "@/assets/bodytypes/minivan.svg"
import special from "@/assets/bodytypes/special.svg"

interface IProps {
    list: any[],
    choose: (value: any) => void,
    data: IOrderData
}

const TypesList = ({ list, choose, data }: IProps) => {

    const pathes = [
        {
            name: "Легковой",
            path: lekovoi
        },
        {
            name: "Трак",
            path: truk
        },
        {
            name: "Минивэн",
            path: minivan
        },
        {
            name: "Спецтранспорт",
            path: special
        }
    ]

    return (
        <div className="w-full grid grid-cols-4 mb:grid-cols-2 gap-4 mb:gap-2">
            {list.map((item) => (
                <div
                    key={item.name}
                    onClick={() => choose({ value:item.id })}
                    className={cn("w-full rounded-xl flex flex-col items-center justify-between cursor-pointer p-3 shadow-md hover:shadow-lg transition-shadow border h-[200px] mb:h-[150px]", (data.autotype === item.id) && "border-primary shadow-primary/50")}
                    >
                    <div className="flex items-center h-full justify-center">
                        <img src={pathes.find(p => p.name === item.name)?.path} alt="" />
                    </div>
                    <p className="text-gray-600">{item.name}</p>
                </div>
                ))
            }
        </div>
    )
}

export default TypesList;