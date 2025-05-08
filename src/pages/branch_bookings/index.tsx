import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Badge, Separator, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Skeleton, Popover, PopoverContent, PopoverTrigger, Calendar } from "@/components/ui";
import { Clock, MapPin, ArrowLeft, Check, X, Calendar as CalendarIcon, Filter, ChevronDown, ChevronRight } from "lucide-react";
import Header from "@/shared/header";
import api from "@/api";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { formatPhoneNumber } from "@/shared/utils";

interface IBooking {
    id: number;
    user: {
        id: number;
        name: string;
        phone: string;
    };
    branch: number;
    services: {
        id: number;
        name: string;
        price: number;
    }[];
    datetime: string;
    status: string;
    address: string;
}

interface IBranch {
    id: number;
    address: string;
    name: string;
}

const BranchBookings = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<IBooking[]>([]);
    const [branch, setBranch] = useState<IBranch | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState<Date>(new Date());
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});

    const formatDateToRequest = (date: Date) => {
        return format(date, "yyyy-MM-dd");
    };

    const fetchData = async (selectedDate: Date = date) => {
        setIsLoading(true);
        try {
            // Получаем информацию о филиале
            const branchResponse = await api.get(`carwashes/branches/${id}/`);
            setBranch(branchResponse.data);
            
            // Получаем бронирования по выбранной дате
            const bookingsResponse = await api.post(`bookings/${id}/booking/by-date/`, {
                date: formatDateToRequest(selectedDate)
            });
            setBookings(bookingsResponse.data);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleDateChange = (newDate: Date | undefined) => {
        if (newDate) {
            setDate(newDate);
            fetchData(newDate);
            setCalendarOpen(false);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge className="bg-yellow-500">Ожидает</Badge>;
            case "completed":
                return <Badge className="bg-green-500">Завершено</Badge>;
            case "cancelled":
                return <Badge className="bg-red-500">Отменено</Badge>;
            default:
                return <Badge className="bg-gray-500">Неизвестно</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return format(date, "dd MMMM yyyy, HH:mm", { locale: ru });
        } catch (error) {
            return dateString;
        }
    };

    const toggleRow = (bookingId: number) => {
        setExpandedRows(prev => ({
            ...prev,
            [bookingId]: !prev[bookingId]
        }));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto space-y-6">
                        <Skeleton className="h-10 w-[200px]" />
                        <Skeleton className="h-[400px] w-full" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Навигация назад */}
                    <Button 
                        variant="ghost" 
                        className="pl-0 flex items-center gap-1" 
                        onClick={() => navigate(`/conf/branch/${id}`)}
                    >
                        <ArrowLeft size={16} />
                        Вернуться к филиалу
                    </Button>

                    {/* Заголовок */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-6 w-6" />
                            <h1 className="text-3xl font-bold mb:text-2xl">Бронирования</h1>
                        </div>
                        {branch && (
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <p className="text-muted-foreground">{branch.address}</p>
                            </div>
                        )}
                    </div>

                    {/* Фильтр по дате */}
                    <div className="flex items-center gap-2">
                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "justify-start text-left font-normal flex items-center",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <Filter className="mr-2 h-4 w-4" />
                                    {date ? format(date, "dd MMMM yyyy", { locale: ru }) : "Выберите дату"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateChange}
                                    initialFocus
                                    locale={ru}
                                />
                            </PopoverContent>
                        </Popover>
                        <p className="text-sm text-muted-foreground">
                            Показаны бронирования на {format(date, "dd MMMM yyyy", { locale: ru })}
                        </p>
                    </div>

                    {/* Таблица бронирований */}
                    {bookings.length === 0 ? (
                        <div className="bg-background border rounded-lg p-6 mb:p-4 text-center">
                            <p className="text-muted-foreground">Бронирования на выбранную дату отсутствуют</p>
                        </div>
                    ) : (
                        <div className="bg-background border rounded-lg p-6 mb:p-4 overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[40px]"></TableHead>
                                        <TableHead className="w-[160px]">Дата и время</TableHead>
                                        <TableHead>Клиент</TableHead>
                                        <TableHead>Услуги</TableHead>
                                        <TableHead className="text-right">Цена</TableHead>
                                        <TableHead className="text-center">Статус</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        <>
                                            <TableRow 
                                                key={booking.id}
                                                className="cursor-pointer hover:bg-muted/50"
                                                onClick={() => toggleRow(booking.id)}
                                            >
                                                <TableCell>
                                                    <div className="flex justify-center">
                                                        {expandedRows[booking.id] ? 
                                                            <ChevronDown className="h-4 w-4 text-muted-foreground" /> : 
                                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {formatDate(booking.datetime)}
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p>{booking.user.name}</p>
                                                        <p className="text-sm text-muted-foreground">{formatPhoneNumber(booking.user.phone)}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{booking.services.length} {getServicesText(booking.services.length)}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {booking.services.reduce((total, service) => total + service.price, 0)} ₽
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {getStatusBadge(booking.status)}
                                                </TableCell>
                                            </TableRow>
                                            {expandedRows[booking.id] && (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="p-0">
                                                        <div className="bg-muted/30 p-4 animate-in fade-in">
                                                            <h3 className="font-medium mb-2">Список услуг:</h3>
                                                            <div>
                                                                {booking.services.map((service) => (
                                                                    <div key={service.id} className="flex justify-between items-center py-1.5 border-b border-border/50 last:border-0">
                                                                        <span className="text-foreground">{service.name}</span>
                                                                        <span className="font-medium text-primary">{service.price} ₽</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Вспомогательная функция для правильного склонения слова "услуга"
function getServicesText(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'услуг';
    }
    
    if (lastDigit === 1) {
        return 'услуга';
    }
    
    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'услуги';
    }
    
    return 'услуг';
}

export default BranchBookings; 