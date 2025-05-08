import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, Clock, Tag, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import api from "@/api";
import CreateReviewDialog from "./createReviewDialog";

interface IProps {
    record: any;
}

const HistoryItem = ({ record }: IProps) => {

    const [open, setOpen] = useState(false);
    const [review, setReview] = useState({
        rating_value: 0,
        description: ""
    });
    const [fetched, setFetched] = useState(false);

    const openChange = () => {
        setOpen(!open);
        if (!fetched) {
            getReview();
            setFetched(true);
        }
    }

    const getReview = async () => {
        await api.get(`carwashes/branches/${record.branch}/rating-exists/`).then((res) => {
            setReview(res.data);
            console.log(res.data);
        });
    }

    return (
        <Drawer direction="right" open={open} onOpenChange={openChange}>
            <DrawerTrigger asChild>
                <li className="border rounded-lg p-4 hover:bg-accent/20 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{record.address}</p>
                            <p className="text-sm text-muted-foreground">Дата: {record.datetime}</p>
                        </div>
                        <p
                            className={`text-sm px-2 py-1 rounded ${
                            record.status === "pending"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                            {record.status === "pending" ? "Запланирована" : "Завершена"}
                        </p>
                    </div>
                </li>
            </DrawerTrigger> 
            <DrawerContent className="!w-full p-5">
                <DrawerHeader className="flex items-center gap-2 p-0 py-4 flex-row">
                    <DrawerClose asChild>
                        <div className="flex items-center gap-2">
                            <ChevronLeft className="cursor-pointer" />
                            <p className="text-xl font-semibold">Информация о бронировании</p>
                        </div>
                    </DrawerClose>
                    
                </DrawerHeader>
                <div className="space-y-6 py-2">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-foreground">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <p>{record.address}</p>
                        </div>
                        <div className="flex items-center gap-2 text-foreground">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                            <p>{record.datetime}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
                            Услуги
                        </h3>
                        <ul className="space-y-2 rounded-lg border p-3">
                            {record.services?.map((service: any, index: number) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span className="text-foreground">{service.name}</span>
                                    <span className="font-medium text-foreground">{service.price} ₽</span>
                                </li>
                            ))}
                            <Separator className="my-2" />
                            <div className="flex justify-between items-center pt-1">
                                <span className="font-medium">Итого:</span>
                                <span className="font-bold">
                                    {record.services?.reduce((sum: number, service: any) => sum + (parseInt(service.price) || 0), 0)} ₽
                                </span>
                            </div>
                        </ul>
                    </div>
                    {review.rating_value ? (
                        <div className="flex flex-col gap-2">
                            <h1 className="text-md font-semibold mb-1">Ваш отзыв на филиал - {record.address}</h1>
                            <div className="flex items-center gap-1">
                                {[...Array(Math.round(review.rating_value) || 0)].map((_, i) => (
                                    <Star key={`filled-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />
                                ))}
                                {[...Array(5 - Math.round(review.rating_value))].map((_, i) => (
                                    <Star key={`empty-${i}`} size={16} className="text-yellow-400" />
                                ))}
                            </div>
                            {review.description ? (
                                <p className="text-sm text-muted-foreground mb-1">{review.description}</p>
                            ) : (
                                <p className="text-sm text-muted-foreground mb-1">Нет комментария</p>
                            )}
                        </div>
                    ) : (
                        <div className="flex justify-end">
                            <CreateReviewDialog branch={record.branch} address={record.address} refetch={getReview} />
                        </div>
                    )}
                    
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default HistoryItem;