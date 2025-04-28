import { Button, Checkbox, Label } from "@/components/ui";
import { useEffect, useState } from "react";
import { IPageProps, IService } from "../..";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Clock, MapPin } from "lucide-react";
import api from "@/api";


interface IServiceInfo {
    services: IService[];
    total_price: number;
    total_duration: any;
}

const Payment = ({ page, handleStage, changeData, data }: IPageProps) => {

    const [licence, setLicence] = useState(false);
    const formattedDate = format(data.time || new Date(), "dd.MM.yyyy HH:mm", { locale: ru });
    const [serviceInfo, setServiceInfo] = useState<IServiceInfo>({
        services: [],
        total_price: 0,
        total_duration: 0
    });

    const fetchServices = async () => {
        await api.post("services/info/", {
            services: data.services.map(s => s.id)
        }).then(res => {
            setServiceInfo({
                services: res.data.services,
                total_price: res.data.total_price,
                total_duration: res.data.total_duration
            });
        });
    }

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div className="w-full px-40 pb-10 flex gap-10 flex-col mb:px-5">
            <div className="flex flex-col gap-3">
                {/* <h1 className="text-2xl font-semibold">Ваша запись:</h1> */}
                <div className="flex flex-col gap-4">
                <div className="shadow-md border border-border rounded-lg bg-background p-6">
                    <div className="flex items-center gap-3">
                        <Clock strokeWidth={1.5} className="h-6 w-6 text-muted-foreground" />
                        <div>
                        <p className="text-sm text-muted-foreground">Дата и время</p>
                        <p className="font-semibold text-foreground">{formattedDate}</p>
                        </div>
                    </div>
                    {/* Место */}
                    <div className="flex items-center gap-3">
                        <MapPin strokeWidth={1.5} className="h-6 w-6 text-muted-foreground" />
                        <div>
                        <p className="text-sm text-muted-foreground">Место</p>
                        <p className="font-semibold text-foreground">123123</p>
                        </div>
                    </div>
                </div>
                <div className="shadow-md border border-border rounded-lg bg-background p-6">
                    <div className="flex items-center gap-3">
                        <div className="grid grid-cols-1 gap-3">
                            {serviceInfo.services.map(service => (
                                <div key={service.id} className="flex items-center justify-between bg-background p-2 rounded-lg border border-border">
                                    <p className="text-sm text-muted-foreground">{service.name}</p>
                                    <p className="font-semibold text-foreground">{service.price} р.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">Итого</p>
                        <p className="font-semibold text-foreground">{serviceInfo.total_price} р.</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">Примерное время</p>
                        <p className="font-semibold text-foreground">{serviceInfo.total_duration} ч.</p>
                    </div>
                </div>
            </div>
            </div>
            <div className="flex flex-col w-full items-center gap-2">
                <Button disabled={!licence} size={"lg"} className="w-full">Оплатить</Button>
                <div className="flex gap-2">
                    <Checkbox id="licence" onCheckedChange={(c) => setLicence(Boolean(c))} />
                    <Label htmlFor="licence" className="font-normal">Я прочитал условия и согласен с правилами</Label>
                </div>
            </div>
        </div>
    )
}

export default Payment;