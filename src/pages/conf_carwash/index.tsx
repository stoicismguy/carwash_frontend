import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Badge, Separator, Input, Textarea, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, Skeleton } from "@/components/ui";
import { Phone, Mail, Globe, Star, Settings, Save, Power, PowerOff, MapPin, ChevronRight } from "lucide-react";
import api from "@/api";
import Header from "@/shared/header";
import { CreateBranchDialog, DeactivateDialog } from "./components";
import { useMask } from "@react-input/mask";
import CarwashDialog from "./components/carwashDialog";
import { formatPhoneNumber } from "@/shared/utils";

export interface ICarWash {
    id: number;
    name: string;
    phone_number: string;
    description: string;
    email: string;
    rating: string;
    is_active: boolean;
    logo: string | null;
    website: string | null;
    created_at: string;
    user: number;
}

interface IBranch {
    id: number;
    address: string;
    name: string;
    latitude: string;
    longitude: string;
    description: string;
    phone_number: string;
    is_active: boolean;
    opening_time: string;
    closing_time: string;
    rating: string;
    created_at: string;
    carwash: number;
    bodytypes: number[];
}

const ConfCarwash = () => {
    const { id } = useParams<{ id: string }>(); // Получаем id из URL
    const [carWash, setCarWash] = useState<ICarWash | null>(null);
    const [branches, setBranches] = useState<IBranch[]>([]);
    const navigate = useNavigate();

    const inputRef = useMask({
        mask: "+7 (___) ___-__-__",
        replacement: { _: /\d/ },
    });

    const fetchData = async () => {
        // Загрузка автомойки
        const carWashResponse = await api.get(`carwashes/${id}/`);
        setCarWash(carWashResponse.data);
        // Загрузка филиалов
        const branchesResponse = await api.get(`carwashes/${id}/branches/`);
        setBranches(branchesResponse.data.results);
    };

    // Загрузка данных автомойки и филиалов
    useEffect(() => {
        fetchData();
    }, [id]);

    // Обработчик переключения активности
    const handleToggleActive = async () => {
        if (carWash) {
            const newStatus = !carWash.is_active;
            // Обновление статуса на сервере
            await api.patch(`carwashes/${id}/`, {
                is_active: newStatus,
            });
            // Обновление локальных данных
            setCarWash({
                ...carWash,
                is_active: newStatus,
            });
        }
    };

    if (!carWash) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Skeleton className="w-[600px] h-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Заголовок автомойки */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold mb:text-2xl">{carWash.name}</h1>
                        <div className="flex items-center gap-2">
                            <Badge
                                className={`mb:text-sm text-[14px] ${
                                    carWash.is_active ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                                }`}
                            >
                                {carWash.is_active ? "Активна" : "Неактивна"}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1 text-[14px] mb:text-sm">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                {carWash.rating}
                            </Badge>
                        </div>
                    </div>

                    {/* Основной контент */}
                    <div className="bg-background border rounded-lg p-6 mb:p-4 mb-3">
                        <div className="text-xl font-semibold mb-4 mb:text-lg">Информация об автомойке</div>
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                {carWash.phone_number && (
                                    <div className="flex items-start gap-2">
                                        <Phone className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground leading-none">Телефон</p>
                                            <p className="font-medium leading-8">{formatPhoneNumber(carWash.phone_number)}</p>
                                        </div>
                                    </div>
                                )}
                                {carWash.email && (
                                    <div className="flex items-start gap-2">
                                        <Mail className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground leading-none">Email</p>
                                            <p className="font-medium leading-8">{carWash.email}</p>
                                        </div>
                                    </div>
                                )}
                                {carWash.website && (
                                    <div className="flex items-start gap-2">
                                        <Globe className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground leading-none">Веб-сайт</p>
                                            <a
                                                href={carWash.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary font-medium hover:underline leading-8"
                                            >{carWash.website}</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm text-muted-foreground">Описание</p>
                                <p className="mt-1 whitespace-pre-wrap">{carWash.description}</p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm text-muted-foreground">Дата создания</p>
                                <p className="mt-1">
                                    {new Date(carWash.created_at).toLocaleDateString("ru-RU", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Действия */}
                    <div className="flex justify-end mb:flex-col gap-2 mb-3">
                        <DeactivateDialog carWash={carWash} handleToggleActive={handleToggleActive} />
                        <CarwashDialog carwash={carWash} refetch={fetchData} />
                    </div>

                    {/* Список филиалов */}
                    <div className="bg-background border rounded-lg py-6 mb:py-4">
                        <div className="flex items-center px-6 mb:px-4 justify-between mb-3">
                            <div className="text-xl font-semibold mb:text-lg">Филиалы</div>
                            <CreateBranchDialog carwash={carWash} refetch={fetchData} />
                        </div>
                        
                        {branches.length === 0 ? (
                            <p className="text-muted-foreground px-6 mb:px-4">Филиалы отсутствуют</p>
                        ) : (
                            <div>
                                {branches.map((branch, index) => (
                                    <div key={branch.id} onClick={() => navigate(`/conf/branch/${branch.id}`)} className="cursor-pointer">
                                        <div className="px-6 py-4 mb:px-4 hover:bg-muted/50 transition flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <MapPin className="h-8 w-8 text-black" strokeWidth={1.5} />
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1 mb:text-sm">
                                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                                        {branch.rating}
                                                    </div>
                                                    <div>
                                                        <div className="flex gap-2 items-center">
                                                            <p className="font-semibold">{branch.address}</p>
                                                            <Badge className={`mb:text-sm text-[14px] ${
                                                                branch.is_active ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                                                            }`}>{branch.is_active ? "Активен" : "Не активен"}</Badge>
                                                        </div>
                                                        
                                                        <p className="text-sm text-muted-foreground">{branch.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight size={25} strokeWidth={1.3} />
                                        </div>
                                        {index < branches.length - 1 && <div className="px-6"><Separator className="my-1 mb:my-1" /></div>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfCarwash;