import { Button, Label, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui";
import { AlignLeft, ChevronDown, MapPin, Pin, Star } from "lucide-react";


const Filters = () => {
    const itemsClassname = "text-md"
    return (
        <div className="w-full flex gap-1 h-[50px] flex-wrap">
            {/* <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className="rounded-full">Сортировать по <ChevronDown /></Button>
                </PopoverTrigger>
                <PopoverContent align="center" className="w-[100%]">
                    <div className="w-full flex flex-col gap-1">
                        <div className="w-full flex items-center space-x-2">
                            <Label htmlFor="service"><Star className="text-muted-foreground" size={20}/>Рейтингу</Label>
                        </div>
                        <div className="w-full flex items-center space-x-2">
                            <Label htmlFor="service1">Accept conditions</Label>
                        </div>
                        <div className="w-full flex items-center space-x-2">
                            <Label htmlFor="service11">Accept conditions</Label>
                        </div>
                    </div>
                </PopoverContent>
            </Popover> */}
            <Select>
                <SelectTrigger className="max-w-max text-md rounded-full">
                    <SelectValue placeholder="Сортировать по" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem className={itemsClassname} value="default"><AlignLeft />По умолчанию</SelectItem>
                    <SelectItem className={itemsClassname} value="rating"><Star />По рейтингу</SelectItem>
                    <SelectItem className={itemsClassname} value="geo"><MapPin />По геолокации</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default Filters;