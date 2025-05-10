import { Button, Drawer,
    DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, 
    DrawerTitle, DrawerTrigger, Input, 
    Label, Switch } from "@/components/ui";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlignLeft, CircleX, MapPin, Settings2, Star, ThumbsUp, X } from "lucide-react";

interface IProps {
    inputValue: string;
    setInputValue: (value: string) => void;
    fetch: (page?: number, inputValue?: string, orderby?: string) => Promise<void>;
}

interface IFilter {
    name: string,
    logo: React.ReactElement,
    value: string
}

const SearchArea = ({ inputValue, setInputValue, fetch }: IProps) => {

    const [focused, setFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState<number>(0);

    const filters: IFilter[] = [
        {
            name: "По умолчанию",
            logo: <AlignLeft size={20} />,
            value: "id"
        },
        {
            name: "По рейтингу",
            logo: <Star size={20} />,
            value: "-rating"
        },
        {
            name: "По популярности",
            logo: <ThumbsUp size={20} />,
            value: "rating_count"
        }
    ]

    const toggleSet = (index: number) => {
        setState(index);
        setOpen(false);
        fetch(1, inputValue, filters[index].value);
    }

    return (
        <div className="w-full flex items-center gap-2">
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Settings2 size={35} strokeWidth={1.25}/>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="flex flex-row items-center justify-between">
                        <DrawerClose asChild>
                            <h1>Закрыть</h1>
                        </DrawerClose>
                        <DrawerTitle className="text-lg">Cортировать</DrawerTitle>
                        <h1>Сбросить</h1>
                    </DrawerHeader>
                    <div className="w-full pb-30 flex flex-col gap-2 px-3">
                        {filters.map((filter, index) => (
                            <Button
                                variant={state === index ? "default" : "secondary"}
                                size={"lg"}
                                className="w-full flex items-center text-md gap-2 justify-center"
                                onClick={() => toggleSet(index)}><h1>{filter.name}</h1>{filter.logo}</Button>
                        ))}
                    </div>
                    <DrawerFooter>
                        {/* <Button className="w-full h-[50px] text-md">Применить</Button> */}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            
            <motion.div
                animate={{ scale: focused ? 1.00 : 1, y: focused ? 0 : 0, width: focused ? "100%" : "" }}
                transition={{ duration: 0.2 }}
                onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
                className="w-full relative">
                    <Input
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                fetch(1, inputValue);
                            }
                        }}
                        value={inputValue}
                        placeholder="Поиск автомоек" className="h-[45px] rounded-xl">
                    </Input>
                    <motion.div
                        animate={{ opacity: inputValue ? 1 : 0 }}
                        onClick={() => {
                            setInputValue("");
                            fetch(1, "");
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CircleX className="text-primary" size={20} />
                    </motion.div>
            </motion.div>
            
        </div>
    );
}

export default SearchArea;