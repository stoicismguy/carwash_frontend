import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from "@/components/ui";
import { ICarWash } from "..";
import { useEffect, useState } from "react";
import api from "@/api";

interface IProps {
    carwash: ICarWash
}


const CreateBranchDialog = ({ carwash }: IProps) => {

    const [bodytypes, setBodytypes] = useState<any[]>([]);
    const [selectedBodytypes, setSelectedBodytypes] = useState<number[]>([]);

    const toggleBodytype = (id: number) => {
        if (selectedBodytypes.includes(id)) {
            setSelectedBodytypes(selectedBodytypes.filter((item) => item !== id));
        } else {
            setSelectedBodytypes([...selectedBodytypes, id]);
        }
    }

    useEffect(() => {
        api.get(`carwashes/conf/bodytypes/`).then((res) => {
            setBodytypes(res.data);
        })
    }, [])

    return (
        <Dialog onOpenChange={() => setSelectedBodytypes([])}>
            <DialogTrigger asChild>
                <Button variant="outline">+ Добавить</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] mb:w-full mb:max-w-full">
                <DialogHeader>
                    <DialogTitle>Добавить филиал</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="address" className="text-sm font-medium">Адрес</Label>
                        <Input
                            id="address"
                            name="address"
                            placeholder="ул. Мира 32"
                            className="h-10"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone_number" className="text-sm font-medium">Телефон</Label>
                        <Input
                            id="phone_number"
                            name="phone_number"
                            placeholder="+79991234567"
                            className="h-10"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">Время работы</Label>
                        <div className="grid grid-cols-[1fr_30px_1fr] gap-4 items-center text-center">
                            <Input
                                id="opening_time"
                                name="opening_time"
                                placeholder="08:00"
                                className="h-10"
                            />
                            <p>До</p>
                            <Input
                                id="closing_time"
                                name="closing_time"
                                placeholder="20:00"
                                className="h-10"
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="carwash" className="text-sm font-medium">Автомойка</Label>
                        <Input
                            id="carwash"
                            name="carwash"
                            disabled
                            placeholder="Автомойка"
                            className="h-10"
                            value={carwash.name}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">Типы кузова</Label>
                        <div className="flex flex-wrap gap-2">
                            {bodytypes.map((item) => (
                                <Button variant={selectedBodytypes.includes(item.id) ? "default" : "outline"} onClick={() => toggleBodytype(item.id)} className="h-10">{item.name}</Button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button>Добавить</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBranchDialog;