import { Button, Checkbox, Input, Label, Popover, PopoverContent, PopoverTrigger, Skeleton } from "@/components/ui";
import { ChevronDown, ChevronRight, CircleX, Search, Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { IPageProps } from "..";

const Carwash = ({ page, handleStage, changeData, data }: IPageProps) => {

    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleChoose = () => {
        changeData({...data, carwash: inputValue });
    }

    return (
        <div className="w-full px-40 flex flex-col gap-15 mb:px-5">
            {/* кнопки с поиском */}
            <div className="w-full flex flex-col gap-2 mb:gap-1">
                <motion.div
                    animate={{ scale: focused ? 1.05 : 1, y: focused ? -5 : 0 }}
                    transition={{ duration: 0.2 }}
                    onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
                    className="w-full relative">
                    <Input
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        value={inputValue}
                        placeholder="Поиск автомоек" className="h-[45px] rounded-xl"></Input>
                        <motion.div
                            animate={{ opacity: inputValue ? 1 : 0 }}
                            onClick={() => setInputValue("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2">
                            <CircleX className="text-primary" size={20} />
                        </motion.div>
                </motion.div>
                
                {/* Для фильтров */}
                <div className="w-full flex gap-1 flex-wrap">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"} size={"lg"} className="rounded-full">Услуги <ChevronDown /></Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="max-w-max">
                            <div className="w-full flex flex-col gap-3">
                                <div className="w-full flex items-center space-x-2">
                                    <Checkbox id="service" />
                                    <Label htmlFor="service">Accept conditions</Label>
                                </div>
                                <div className="w-full flex items-center space-x-2">
                                    <Checkbox id="service1" />
                                    <Label htmlFor="service1">Accept conditions</Label>
                                </div>
                                <div className="w-full flex items-center space-x-2">
                                    <Checkbox id="service11" />
                                    <Label htmlFor="service11">Accept conditions</Label>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"} size={"lg"} className="rounded-full">Сортировать по <ChevronDown /></Button>
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
                    </Popover>
                </div>
            </div>
            <div className="w-full grid grid-cols-3 mb:grid-cols-2 gap-2">
                {Array(10).fill(0).map(() => (
                    <Skeleton className="w-full rounded-md p-2 bg-primary/20 h-[250px] flex align-bottom items-end">
                        {/* <Button className="w-full" onClick={() => {}}>Выбрать <ChevronRight /></Button> */}
                    </Skeleton>
                ))}
                
            </div>
            
        </div>
    )
}

export default Carwash;