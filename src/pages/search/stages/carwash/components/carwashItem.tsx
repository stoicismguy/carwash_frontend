import { Button, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, Skeleton } from "@/components/ui";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { Drawer } from "@/components/ui";
import { useEffect, useState } from "react";
import api from "@/api";
import ReviewItem from "./reviewItem";

interface IProps {
    item: any;
    choose: any;
    data: any;
}

export interface IReview {
    id: number;
    description: string;
    rating_value: number;
    created_at: string;
    user: any;
    branch: number;
}

const CarwashItem = ({item, choose, data}: IProps) => { 

    const [reviews, setReviews] = useState<IReview[]>([]);
    const [fetched, setFetched] = useState<boolean>(false);


    const fetchReviews = async () => {
        await api.get(`/carwashes/${item.id}/ratings/`).then((res) => {
            setReviews(res.data);
            setFetched(true);
        });
        
    }

    // useEffect(() => {
    //     fetchReviews();
    // }, []);

    return (
        <Drawer direction="right" onOpenChange={() => {
            if (!fetched) {
                fetchReviews();
            }
        }}>
            <DrawerTrigger asChild>
                <div
                    key={item.name}
                    className="w-full rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between items-start border min-h-[250px]"
                    >
                    <div className="flex flex-col gap-2 flex-grow-0 flex-shrink-0">
                        <h1 className="text-2xl font-semibold text-primary whitespace-nowrap truncate">{item.name}</h1>
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
                            <Star size={15} className="text-yellow-400 fill-yellow-400" />
                        </div>
                        <Button
                            className="w-full sm:h-9"
                            disabled={data.carwash === item.id}
                            onClick={() => choose({ value:item.id })}
                            size={"lg"}>
                            {data.carwash === item.id ? "Выбрано" : "Выбрать"}{data.carwash !== item.id && <ChevronRight size={16} />}
                        </Button>
                    </div>
                </div>
            </DrawerTrigger>
            <DrawerContent className="!w-full p-2">
                <div className="flex flex-col gap-2">
                    <div className="w-full relative">
                        <DrawerClose className="flex items-center absolute top-4 left-4 bg-primary-foreground p-1 rounded-full" asChild>
                            <ChevronLeft size={35} className="text-primary" />
                        </DrawerClose>  
                        {/* <img src={item.logo} alt="" className="w-full rounded-xl" />  */}
                        <img src={item.logo ? item.logo : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"} alt="" className="w-full rounded-xl" />
                    </div>
                    
                    <div className="w-full rounded-xl bg-muted p-4">
                        <p className="text-xl font-bold">{item.name}</p>
                        <p className="text-sm">{item.description}</p>
                    </div>
                    <div className="grid grid-cols-[2fr_3fr] gap-2 h-[50px]">
                        <div className="w-full rounded-xl bg-muted px-4 py-2 flex gap-2 justify-between">
                            <div className="flex flex-col gap-0 leading-5">
                                <div className="flex items-center gap-2">
                                    <Star size={15} className="text-yellow-400 fill-yellow-400" />
                                    <p>{item.rating}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {reviews.length} {reviews.length === 1 ? 'отзыв' : 
                                        reviews.length >= 2 && reviews.length <= 4 ? 'отзыва' : 'отзывов'}
                                    </p>
                                </div>
                            </div>
                            <div className="h-full w-min-w flex items-center">
                                <ChevronRight size={20} className="text-muted-foreground" />
                            </div>
                        </div>
                        <div className="w-full rounded-xl bg-muted p-4 flex items-center gap-2">
                            <MapPin size={25} className="text-muted-foreground" />
                            <p className="text-md">{item.branch_count} {item.branch_count === 1 ? 'филиал' : 
                               item.branch_count >= 2 && item.branch_count <= 4 ? 'филиала' : 'филиалов'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                        {reviews.map((review: IReview) => (
                            <ReviewItem item={review}/>
                        ))}
                        
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
        
    );
}

export default CarwashItem;