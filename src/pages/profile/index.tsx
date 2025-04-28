import { useState } from "react";
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

// Интерфейс для предприятия
interface IBusiness {
    id: number;
    name: string;
    address: string;
}

const Profile = () => {
    const { user } = useAuth(); // Получаем пользователя из useAuth
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<IUser>(user);
    const inputRef = useMask({
            mask: "+7 (___) ___-__-__",
            replacement: { _: /\d/ },
        }); 

    const washHistory = [
        {
            id: 1,
            carWashName: "Автомойка на Ленина",
            date: "24.04.2025",
            status: "Завершена",
        },
        {
            id: 2,
            carWashName: "Мойка 24/7",
            date: "20.04.2025",
            status: "Запланирована",
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log("Сохраненные данные:", userData);
    };


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
                            className="h-12 mb:h-11"
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
                            className="h-12 mb:h-11"
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
                        <p className="text-muted-foreground">История записей на мойку:</p>
                        <ul className="space-y-4">
                            {washHistory.map((record) => (
                            <li key={record.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{record.carWashName}</p>
                                    <p className="text-sm text-muted-foreground">Дата: {record.date}</p>
                                </div>
                                <p
                                    className={`text-sm px-2 py-1 rounded ${
                                    record.status === "Завершена"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                >
                                    {record.status}
                                </p>
                                </div>
                            </li>
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