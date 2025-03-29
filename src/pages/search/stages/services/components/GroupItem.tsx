import { Button, Separator, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { cn } from "@/lib/utils";
import { IOrderData } from "@/pages/search";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";


interface IProps {
    item: any,
    choose: (value: any) => void,
    data: IOrderData
}

const GroupItem = ({ item, choose, data }: IProps) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-0">
            <div className="w-full bg-primary p-2 flex items-center justify-between" onClick={() => setOpen(!open)}>
                <h1 className="text-xl font-semibold text-primary-foreground whitespace-nowrap truncate">{item.name}</h1>
                <div className="flex gap-2 items-center">
                    <div className="flex text-primary font-semibold bg-primary-foreground p-1 w-6 h-6 items-center justify-center rounded-full">{item.services.length}</div>
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                    >
                        <ChevronDown size={25} className="cursor-pointer text-primary-foreground" />
                    </motion.div>
                </div>
            </div>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: open ? "auto" : 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="w-full overflow-hidden"
            >
                <Table>
                    <TableHeader>
                        <TableRow className="text-muted">
                            <TableHead className="w-[200px] text-muted-foreground">Название</TableHead>
                            <TableHead className="text-muted-foreground">Цена</TableHead>
                            <TableHead className="text-right text-muted-foreground">Время</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {item.services.map((service: any) => (
                            <TableRow key={service.id} className="h-11">
                                <TableCell className="text-md">{service.name}</TableCell>
                                <TableCell>₽{service.price}</TableCell>
                                <TableCell className="text-right">30 мин</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* {item.services.map((service: any, index: number) => (
                    <>
                        <div className="w-full p-2 flex items-center justify-between h-11">
                            <h1>{service.name}</h1>
                            <div className="grid grid-cols-2 w-50">
                                <div className="flex items-center justify-between">
                                    <Separator orientation={"vertical"} style={{ width: "1px" }}/>
                                    <h1>{service.price}</h1>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Separator orientation="vertical"/>
                                    <h1>{service.duration}</h1>
                                </div>  
                            </div>      
                        </div>
                        {index !== item.services.length - 1 && <Separator />}
                    </>
                ))} */}
            </motion.div>
        </div>
    )   
}

export default React.memo(GroupItem);