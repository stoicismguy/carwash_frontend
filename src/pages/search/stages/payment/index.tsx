import { Button, Checkbox, Label, Separator } from "@/components/ui";
import { useEffect, useState } from "react";
import { IPageProps, IService } from "../..";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { AlertCircle, CheckCircle2, Clock, MapPin } from "lucide-react";
import api from "@/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthContext";
interface IServiceInfo {
    services: IService[];
    total_price: number;
    total_duration: any;
    address: string;
}

const Payment = ({ page, handleStage, changeData, data }: IPageProps) => {

    const [licence, setLicence] = useState(false);
    const formattedDate = format(data.time || new Date(), "dd.MM.yyyy HH:mm", { locale: ru });
    const navigate = useNavigate();
    const { user } = useAuth();
    const currentUser = user(); 
    const [success, setSuccess] = useState(false);
    const [serviceInfo, setServiceInfo] = useState<IServiceInfo>({
        services: [],
        total_price: 0,
        total_duration: 0,
        address: ""
    });

    const fetchServices = async () => {
        await api.post("services/info/", {
            services: data.services.map(s => s.id)
        }).then(res => {
            setServiceInfo({
                services: res.data.services,
                total_price: res.data.total_price,
                total_duration: res.data.total_duration,
                address: res.data.address
            });
        });
    }
    const booking = async () => {
        console.log(data.services.map(s => s.id), data.time)
        await api.post(`bookings/${data.department}/booking/`, {
            services: data.services.map(s => s.id),
            datetime: data.time
        }).then(res => {
            setSuccess(true);
        });
    }

    useEffect(() => {
        fetchServices();
    }, []);

    if (success) {
        return (
            <div className="w-full px-40 pb-10 flex gap-10 flex-col items-center justify-center min-h-[60vh] mb:px-5">
                <CheckCircle2 className="w-70 h-70 text-green-600" strokeWidth={1} />
                <div className="flex flex-col gap-2 w-full items-center gap-10">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-semibold">Вы успешно записаны!</h1>
                        <div className="flex items-center gap-2">
                            <Clock strokeWidth={1.5} className="h-6 w-6 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">{data.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin strokeWidth={1.5} className="h-6 w-6 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">{serviceInfo.address}</p>
                        </div>
                    </div>
                    <Button 
                        size="lg" 
                        className="bg-green-600 min-w-70 hover:bg-green-600 text-white mb:w-full"
                        onClick={() => navigate('/profile')}
                    >
                        Готово
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full px-40 pb-10 flex gap-10 flex-col mb:px-5">
            <div className="flex flex-col gap-3">
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
                        <p className="font-semibold text-foreground">{serviceInfo.address}</p>
                        </div>
                    </div>
                </div>
                <div className="shadow-md border border-border rounded-lg bg-background p-6">
                    <div className="flex items-center gap-3">
                        <div className="grid grid-cols-1 gap-3 w-full">
                            {serviceInfo.services.map(service => (
                                <div key={service.id} className="flex items-center w-full justify-between bg-background rounded-lg">
                                    <p className="text-sm text-foreground">{service.name}</p>
                                    <p className="font-semibold text-foreground">{service.price} р.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Separator className="my-3" />
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">Итого</p>
                            <p className="font-semibold text-foreground">{serviceInfo.total_price} р.</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">Примерное время</p>
                            <p className="font-semibold text-foreground">
                                {typeof serviceInfo.total_duration === 'string' 
                                    ? (() => {
                                        const [hours, minutes] = serviceInfo.total_duration.split(':');
                                        const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
                                        return `${totalMinutes} мин`;
                                    })()
                                    : '0 мин'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="flex flex-col w-full items-center gap-2">
                <Button disabled={!(licence && currentUser)} size={"lg"} className="w-full" onClick={booking}>Оплатить</Button>
                <div className="flex gap-2">
                    <Checkbox id="licence" disabled={!currentUser} onCheckedChange={(c) => setLicence(Boolean(c))} />
                    <Label htmlFor="licence" className="font-normal">Я прочитал условия и согласен с правилами</Label>
                </div>
            </div>
        </div>
    )
}

export default Payment;