import { DatePicker } from "@/shared/datePicker"
import { IPageProps } from "../.."
import { useEffect, useState } from "react"
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@/components/ui"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import api from "@/api"


const Datetime = ({ page, handleStage, changeData, data }: IPageProps) => {

    const [date, setDate] = useState<Date>();
    const [openCalender, setOpenCalender] = useState(false);
    const [slots, setSlots] = useState<any[]>([]);


    const formatDateToLocalISOString = (date: any) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы с 0, поэтому +1
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

    const fetchSlots = async (date_current: any) => {
        const servicesIds = data.services.map((s: any) => s.id);
        console.log(date_current, servicesIds)
        if (!date_current) {
            return
        }
        await api.post(`bookings/${data.department}/hours/`, {
            date: formatDateToLocalISOString(date_current),
            services: servicesIds
        }).then((res) => {
            setSlots(res.data);
        })
    }

    useEffect(() => {
        if (data.time) {
            console.log(data.time)
            const current = new Date(data.time);
            setDate(current);
            fetchSlots(current);
        }
    }, [data])


    const handleChoose = ({ value }: any) => {
        console.log(value);
        changeData({...data, time: value }, page.stage);
        handleStage(page.stage + 1);
    }

    return (
        <div className="w-full px-40 pb-10 flex flex-col gap-5 mb:px-5">
            <Popover open={openCalender} onOpenChange={setOpenCalender}>
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "w-full h-[45px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon />
                    {date ? format(date, "PPP", { locale: ru}) : <span>Выберите дату</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    locale={ru}
                    mode="single"
                    selected={date}
                    disabled={(date) => date < new Date() || [0, 6].includes(date.getDay())} 
                    onSelect={(e) => {
                        setDate(e);
                        fetchSlots(e);
                        setOpenCalender(false);
                    }}
                    initialFocus
                    />
                </PopoverContent>
            </Popover>
            <div className={`grid grid-cols-6 mb:grid-cols-3 gap-2 grid-flow-col grid-rows-9`}>
                {slots.map((item) => (
                    <Button variant={item.start === data.time ? "default" : "outline"} size={"lg"} onClick={() => handleChoose({ value: item.start})}>
                        {item.display.slice(0, -3)}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default Datetime;