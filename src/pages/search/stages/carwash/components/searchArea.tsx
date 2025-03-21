import { Button, Drawer,
    DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, 
    DrawerTitle, DrawerTrigger, Input, 
    Label, Switch } from "@/components/ui";
import { useState } from "react";
import { motion } from "framer-motion";
import { CircleX, Settings2, Star, X } from "lucide-react";

// interface IProps {
//     focused: boolean,
//     inputValue: string,
//     setInputValue: (value: string) => void
// }

const SearchArea = () => {

    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");

    return (
        <div className="w-full flex items-center gap-2">
            <Drawer>
                <DrawerTrigger asChild>
                    <Settings2 size={35} strokeWidth={1.25}/>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="flex flex-row items-center justify-between">
                        <DrawerClose asChild>
                            <h1>Закрыть</h1>
                        </DrawerClose>
                        <DrawerTitle className="text-lg">Сортировать по</DrawerTitle>
                        <h1>Сбросить</h1>
                    </DrawerHeader>
                    <div className="w-full pb-90 px-3">
                        {/* <div className="w-full flex h-[40px] items-center justify-between">
                            <Label htmlFor="rate" className="text-md">С рейтингом выше 4.7<Star size={15}/></Label>
                            <Switch className="h-6 w-11" id="rate" />
                        </div> */}
                        <Button variant={"secondary"} size={"lg"} className="w-full flex items-center gap-2 justify-center"><h1>По рейтингу</h1><Star size={15}/></Button>
                    </div>
                    <DrawerFooter>
                        <Button className="w-full h-[50px] text-md">Применить</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            
            <motion.div
                animate={{ scale: focused ? 1.05 : 1, y: focused ? -5 : 0, width: focused ? "100%" : "" }}
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
            
        </div>
    );
}

export default SearchArea;