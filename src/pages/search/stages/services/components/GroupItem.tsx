import { Button, Separator, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { cn } from "@/lib/utils";
import { IOrderData } from "@/pages/search";
import { Check, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IService } from "@/pages/search";


interface IProps {
    item: any,
    choose: (value: any) => void,
    services: IService[],
    openDefault: boolean
}

const GroupItem = ({ item, choose, services, openDefault }: IProps) => {

    const [open, setOpen] = useState(openDefault);

    return (
        <div className="flex flex-col gap-0">
            <div className="w-full bg-primary pl-3 p-2 flex items-center justify-between" onClick={() => setOpen(!open)}>
                <h1 className="text-xl font-semibold text-primary-foreground whitespace-nowrap truncate">{item.name}</h1>
                <div className="flex gap-2 items-center">
                    <div className={cn("flex text-primary font-semibold bg-primary-foreground p-1 w-6 h-6 items-center text-[14px] justify-center rounded-full", { hidden: services.filter((s) => s.group === item.id).length === 0 })}>{services.filter((s) => s.group === item.id).length}</div>
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
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead className="w-[200px] text-muted-foreground">Название</TableHead>
                            <TableHead className="text-muted-foreground">Цена</TableHead>
                            <TableHead className="text-right text-muted-foreground">Время</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {item.services.map((service: IService) => (
                            <TableRow className="h-11" onClick={() => {
                                choose(service)
                                // console.log(service)
                                }}>
                                <TableCell className="text-md">{services.some((item) => item.id === service.id) ? <Check className="text-muted-foreground" /> : <Check className="text-muted" />}</TableCell>
                                <TableCell className="text-md text-primary">{service.name}</TableCell>
                                <TableCell className="text-primary">₽{service.price}</TableCell>
                                <TableCell className="text-right text-primary">30 мин</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </motion.div>
        </div>
    )   
}

export default React.memo(GroupItem);