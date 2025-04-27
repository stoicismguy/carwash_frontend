import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Badge, Separator, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui";
import { Phone, Clock, Star, MapPin, Settings, ChevronDown, Edit3 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import api from "@/api";
import Header from "@/shared/header";
import ServiceDialog from "./components/serviceDialog";
import CreateGroupDialog from "./components/createGroupDialog";
import CreateServiceDialog from "./components/createServiceDialog";
import DeactivateBranchDialog from "./components/deactivateDialog";
import { formatPhoneNumber } from "@/shared/utils";
import EditBranchDialog from "./components/editBranchDialog";


export interface IBranch {
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

interface IService {
    id: number;
    name: string;
    description: string;
    price: string;
    duration: string;
    group: number;
}

interface IServiceGroup {
    id: number;
    branch: number;
    name: string;
    services: IService[];
    services_count: number;
}

const ConfBranch = () => {
    const { id } = useParams<{ id: string }>();
    const [branch, setBranch] = useState<IBranch | null>(null);
    const [serviceGroups, setServiceGroups] = useState<IServiceGroup[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openGroups, setOpenGroups] = useState<{ [key: number]: boolean }>({});


    const fetchData = async () => {
        setIsLoading(true);
        const branchResponse = await api.get(`carwashes/branches/${id}/`);
        setBranch(branchResponse.data);
        const servicesResponse = await api.get(`services/${id}/`);
        setServiceGroups(servicesResponse.data);
        setIsLoading(false);
    };

    // Загрузка данных филиала и услуг
    useEffect(() => {
        fetchData();
    }, [id]);

    // Обработчик переключения активности
    const handleToggleActive = async () => {
        if (branch) {
            const newStatus = !branch.is_active;
            await api.patch(`carwashes/branches/${id}/`, {
                is_active: newStatus,
            });
            setBranch({ ...branch, is_active: newStatus });
        }
    };

    // Обработчик сворачивания/разворачивания групп
    const toggleGroup = (groupId: number) => {
        setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-lg text-muted-foreground">Загрузка...</p>
            </div>
        );
    }

    if (!branch) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-lg text-destructive">Филиал не найден</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Заголовок филиала */}
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold mb:text-2xl">{branch.address}</h1>
                        <div className="flex items-center gap-2">
                            <Badge
                                className={`mb:text-sm text-[14px] ${
                                    branch.is_active ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                                }`}
                            >
                                {branch.is_active ? "Активен" : "Неактивен"}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1 text-[14px] mb:text-sm">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                {branch.rating}
                            </Badge>
                        </div>
                    </div>

                    {/* Основной контент */}
                    <div className="bg-background border rounded-lg p-6 mb:p-4 mb-3">
                        <div className="text-xl font-semibold mb-4 mb:text-lg">Информация о филиале</div>
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Адрес</p>
                                        <p className="font-medium">{branch.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Телефон</p>
                                        <p className="font-medium">{formatPhoneNumber(branch.phone_number)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Время работы</p>
                                        <p className="font-medium">{`${branch.opening_time} - ${branch.closing_time}`}</p>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm text-muted-foreground">Описание</p>
                                <p className="mt-1">
                                    {branch.description ? branch.description : "Нет описания"}
                                </p>
                            </div>
                            <Separator />
                            <div>
                                <p className="text-sm text-muted-foreground">Дата создания</p>
                                <p className="mt-1">
                                    {new Date(branch.created_at).toLocaleDateString("ru-RU", {
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
                        <DeactivateBranchDialog carWash={branch} handleToggleActive={handleToggleActive} />
                        <EditBranchDialog branch={branch} refetch={fetchData} />
                    </div>

                    {/* Конфигуратор услуг */}
                    <div className="bg-background rounded-lg py-3 mb:py-4">
                        <div className="flex items-center justify-between mb-3 mb:flex-col mb:w-full">
                            <p className="text-xl font-semibold mb:text-lg mb:mb-1">Услуги</p>
                            <div className="flex gap-2 mb:flex-col mb:w-full">
                                <CreateGroupDialog branch={branch} />
                                <CreateServiceDialog branch={branch} groups={serviceGroups} refetch={fetchData} />
                            </div>
                        </div>
                        {serviceGroups.length === 0 ? (
                            <p className="text-muted-foreground mb:text-center mb:mt-5">Услуги отсутствуют</p>
                        ) : (
                            <div className="space-y-2">
                                {serviceGroups.map((group) => (
                                    <div key={group.id}>
                                        <div
                                            className="w-full bg-primary rounded-sm pl-3 p-2 flex items-center justify-between"
                                            onClick={() => toggleGroup(group.id)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-xl font-semibold text-primary-foreground whitespace-nowrap truncate">
                                                    {group.name}
                                                </h1>
                                                <Badge variant="outline" className="flex items-center text-primary bg-primary-foreground gap-1">
                                                    {group.services.length} услуги
                                                </Badge>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <motion.div
                                                    initial={{ rotate: 0 }}
                                                    animate={{ rotate: openGroups[group.id] ? 180 : 0 }}
                                                    transition={{ duration: 0.1, ease: "easeInOut" }}
                                                >
                                                    <ChevronDown size={25} className="cursor-pointer text-primary-foreground" />
                                                </motion.div>
                                            </div>
                                        </div>
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: openGroups[group.id] ? "auto" : 0 }}
                                            transition={{ duration: 0.1, ease: "easeInOut" }}
                                            className="w-full overflow-hidden"
                                        >
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="text-muted">
                                                        <TableHead className="w-[180px] text-muted-foreground">Название</TableHead>
                                                        <TableHead className="text-muted-foreground">Цена</TableHead>
                                                        <TableHead className="text-muted-foreground w-[400px] text-left mb:hidden">Описание</TableHead>
                                                        <TableHead className="text-right text-muted-foreground">Время</TableHead>
                                                        <TableHead className="w-[40px]"></TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {group.services.map((service) => (<ServiceDialog service={service} />))}
                                                </TableBody>
                                            </Table>
                                        </motion.div>
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

export default ConfBranch;