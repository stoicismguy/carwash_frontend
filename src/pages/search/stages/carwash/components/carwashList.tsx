import { Skeleton } from "@/components/ui";

interface IProps {
    data: any[]
}

const CarwashList = ({ data }: IProps) => {
    return (
        <div className="w-full grid grid-cols-3 mb:grid-cols-2 gap-2">
            {data.map(() => (
                <Skeleton className="w-full rounded-md p-2 bg-primary/20 h-[250px] flex align-bottom items-end">
                {/* <Button className="w-full" onClick={() => {}}>Выбрать <ChevronRight /></Button> */}
                </Skeleton>
            ))}  
        </div>
    );
}

export default CarwashList;