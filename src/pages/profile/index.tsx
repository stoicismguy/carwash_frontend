import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Pencil, Save } from "lucide-react";
import Header from "@/shared/header";
import { useAuth, IUser } from "@/AuthContext";
import { CarwashList } from "./components";
import { formatPhoneNumber } from "@/shared/utils";
import { useMask } from "@react-input/mask";
import api from "@/api";
import HistoryItem from "./components/historyItem";
import { cn } from "@/lib/utils";

// Интерфейс для предприятия
interface IBusiness {
    id: number;
    name: string;
    address: string;
}

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<IUser>(user);
    const [history, setHistory] = useState<any[]>([]);
    const { updateUser } = useAuth();
    const [error, setError] = useState<boolean>(false);
    const inputRef = useMask({
            mask: "+7 (___) ___-__-__",
            replacement: { _: /\d/ },
        });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => (prev ? { ...prev, [name]: value } : prev));
        if (error) setError(false);
    };

    const handleSave = () => {
        const phone = inputRef.current?.value.replace(/\D/g, '');
        if (!phone 
            || phone.length != 11 
            || !userData.name) {
            setError(true);
            return;
        }
        api.patch(`users/`, {
            name: userData.name,
            phone_number: phone,
        }).then(res => {
            setUserData(res.data);
            setIsEditing(false);
            updateUser(res.data);
        });
    };

    const fetchHistory = async () => {
        await api.get(`bookings/history/`).then(res => {
            setHistory(res.data);
        });
    }

    useEffect(() => {
        fetchHistory();
    }, []);
return (
    <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-1 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
            {/* Основной контейнер вместо Card */}
            <div className="bg-background pt-2 px-4 pb-4 rounded-lg">
            {/* Заголовок профиля */}
                <div className="flex flex-row items-center justify-between gap-4 mb:pb-4">
                    <div className="flex flex-row items-center gap-4 relative">
                    <div className="relative">
                        <Avatar className="h-24 w-24 md:h-32 md:w-32">
                        <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                            {userData.name.charAt(0)}
                        </AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">{userData.name}</h2>
                        <p className="text-sm text-muted-foreground">
                        {userData.user_type === "business" ? "Бизнес" : "Водитель"}
                        </p>
                    </div>
                    </div>
                </div>
                {/* Контент профиля */}
                <div className="mt-2">
                    <Separator className="my-2" />
                    <Tabs defaultValue="info" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-12 mb:h-11">
                        <TabsTrigger value="info" className="text-base">
                        Информация
                        </TabsTrigger>
                        {userData.user_type === "business" ? <TabsTrigger value="carwashes" className="text-base">
                            Предприятия
                        </TabsTrigger> : <TabsTrigger value="history" className="text-base">
                            История
                        </TabsTrigger>}
                        
                    </TabsList>
                    <TabsContent value="info" className="mt-4">
                        <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Имя</Label>
                            <Input
                            id="name"
                            name="name"
                            className={cn("h-12 mb:h-11", error ? "border-red-500 animate-shake transition-all" : "")}
                            value={userData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone_number">Телефон</Label>
                            <Input
                            id="phone_number"
                            name="phone_number"
                            className={cn("h-12 mb:h-11", error ? "border-red-500 animate-shake transition-all" : "")}
                            placeholder="+7 (___) ___-__-__"
                            value={formatPhoneNumber(userData.phone_number)}
                            ref={inputRef}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            />
                        </div>
                        {/* Кнопка редактирования */}
                        <Button
                            variant={isEditing ? "outline" : "default"}
                            onClick={() => {
                            if (isEditing) handleSave();
                            else setIsEditing(true);
                            }}
                            className="flex mt-1 w-70 mb:w-full"
                            size={"lg"}
                        >
                            {isEditing ? (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Сохранить
                            </>
                            ) : (
                            <>
                                <Pencil className="mr-2 h-4 w-4" /> Редактировать
                            </>
                            )}
                        </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="history" className="mt-4">
                        <div className="space-y-4">
                        {/* <p className="text-muted-foreground">История записей на мойку:</p> */}
                        <ul className="space-y-4">
                            {history.map((record) => (
                                <HistoryItem record={record} refetch={fetchHistory} />
                            ))}
                        </ul>
                        </div>
                    </TabsContent>
                    <TabsContent value="carwashes" className="mt-4">
                        <CarwashList />
                    </TabsContent>
                    </Tabs>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
};

export default Profile;