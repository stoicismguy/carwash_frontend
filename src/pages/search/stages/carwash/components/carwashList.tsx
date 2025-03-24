import { Button, Skeleton } from "@/components/ui";
import { ChevronRight, Star } from "lucide-react";

interface IProps {
    data: any[],
    choose: (value: any) => void
}

const CarwashList = ({ data, choose }: IProps) => {
    return (
        <div className="w-full grid grid-cols-3 mb:grid-cols-1 gap-4">
        {data.map((item) => (
            <div
                key={item.name}
                className="w-full rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between items-start border border-gray-200 min-h-[250px]"
                >
                <div className="flex flex-col gap-2 flex-grow-0 flex-shrink-0">
                    <h1 className="text-2xl font-semibold text-gray-800 whitespace-nowrap truncate">
                    {item.name}
                    </h1>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
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
                    <p className="text-md font-medium text-gray-700">{item.rating}</p>
                    <Star size={15} className="text-yellow-400" />
                    </div>
                    <Button
                        className="w-full sm:h-9"
                        onClick={() => choose({ value:item.id })}
                        size={"lg"}>
                        Выбрать<ChevronRight size={16} />
                    </Button>
                </div>
            </div>
        ))}
        </div>
    );
}

export default CarwashList;