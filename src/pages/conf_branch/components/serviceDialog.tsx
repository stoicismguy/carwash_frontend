import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger, Input, Label, TableCell, TableRow, Textarea } from "@/components/ui";
import { Edit3 } from "lucide-react";
import { useState } from "react";
import api from "@/api";

interface IProps {
    service: any
}

const ServiceDialog = ({ service }: IProps) => {

    const [data, setData] = useState<any>(service);
    const date = new Date(`1970-01-01T${service.duration}Z`);

    const handleSave = async () => {
        await api.patch(`services/groups/${service.id}/`, data);
    }

    return (
        <Dialog>
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
                        {date.getMinutes()} мин
                    </TableCell>
                    <TableCell className="text-md">
                        <Edit3 size={20} strokeWidth={1.5} />
                    </TableCell>
                </TableRow>
            </DialogTrigger>
            <DialogContent>
            <DialogHeader className="font-semibold">Изменить услугу</DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-sm font-medium">Название</Label>
                        <Input
                            id="name"
                            name="name"
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            value={data.name}
                            placeholder="Название услуги"
                            className="h-10"
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
                                className="h-10"
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
                                className="h-10"
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
                    <DialogClose asChild>
                        <Button size={"lg"} onClick={handleSave}>Сохранить</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ServiceDialog;