import { DatePicker } from "@/shared/datePicker"
import { IPageProps } from "../.."
import { use, useState } from "react"
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@/components/ui"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useSearchParams } from "react-router-dom"


const Datetime = ({ page, handleStage, changeData, data }: IPageProps) => {

    const [date, setDate] = useState<Date>();
    const [openCalender, setOpenCalender] = useState(false);

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
                        setOpenCalender(false);
                    }}
                    initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Datetime;