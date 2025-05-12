import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger, Input, Label, TableCell, TableRow, Textarea } from "@/components/ui";
import { Edit3, Loader2 } from "lucide-react";
import { useState } from "react";
import api from "@/api";
import { set } from "date-fns";
import { cn } from "@/lib/utils";

interface IProps {
    service: any
}

const ServiceDialog = ({ service }: IProps) => {

    const [data, setData] = useState<any>(service);
    const date = new Date(`1970-01-01T${service.duration}`);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const validateData = (data: any) => {
        const errors: string[] = [];
        if (!data.name) {
            errors.push("name");
        }
        if (!data.price) {
            errors.push("price");
        }
        if (!data.duration) {
            errors.push("duration");
        }
        setErrors(errors);
        return errors.length === 0;
    }

    const handleSave = async () => {
        setLoading(true);
        setErrors([]);
        if (!validateData(data)) {
            setLoading(false);
            return;
        };
        await api.patch(`services/groups/${service.id}/`, data).then(() => {
            setErrors([]);
            setOpen(false);
        }).finally(() => {
            setLoading(false);
        });
    }

    const handleDelete = async () => {
        await api.delete(`services/groups/${service.id}/`);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <TableRow key={service.id} className="h-11">
                    <TableCell
                        style={{ maxWidth: "180px", textWrap: "wrap" }}
                        className="text-md text-primary overflow-hidden text-ellipsis"
                    >
                        {service.name}
                    </TableCell>
                    <TableCell className="text-primary">₽{service.price}</TableCell>
                    <TableCell className="text-primary mb:hidden">{service.description}</TableCell>
                    <TableCell className="text-right text-primary">
                        {date.getMinutes() + date.getHours() * 60} мин
                    </TableCell>
                    <TableCell className="text-md">
                        <Edit3 size={20} strokeWidth={1.5} />
                    </TableCell>
                </TableRow>
            </DialogTrigger>
            <DialogContent>
            <DialogHeader className="font-semibold text-xl">Изменить услугу</DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-sm font-medium">Название</Label>
                        <Input
                            id="name"
                            name="name"
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            value={data.name}
                            placeholder="Название услуги"
                            className={cn("h-10", errors.includes("name") && "border-red-500 animate-shake transition-all")}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                        <div className="grid gap-2">
                            <Label htmlFor="price" className="text-sm font-medium">Цена</Label>
                            <Input
                                id="price"
                                name="price"
                                onChange={(e) => setData({ ...data, price: e.target.value })}
                                value={data.price}
                                placeholder="Цена услуги ₽"
                                className={cn("h-10", errors.includes("price") && "border-red-500 animate-shake transition-all")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="duration" className="text-sm font-medium">Длительность</Label>
                            <Input
                                id="duration"
                                name="duration"
                                type="time"
                                value={data.duration}
                                onChange={(e) => setData({ ...data, duration: e.target.value })}
                                className={cn("h-10", errors.includes("duration") && "border-red-500 animate-shake transition-all")}
                                placeholder="Длительность услуги"
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description" className="text-sm font-medium">Описание</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Описание для услуги"
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            value={data.description}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant={"destructive"} className="w-23 mb:w-full" size={"lg"} onClick={handleDelete}>Удалить</Button>
                    <Button size={"lg"} className="w-35 mb:w-full" onClick={handleSave}>{loading ? <Loader2 className="animate-spin" /> : "Сохранить"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ServiceDialog;