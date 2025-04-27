import { Button, Dialog, DialogContent, DialogHeader, DialogTrigger, Input, Label } from "@/components/ui";
import { useEffect, useState } from "react";
import api from "@/api";
import { useMask } from "@react-input/mask";
import { cn } from "@/lib/utils";
import { Loader2, MapPin, Pencil, Settings } from "lucide-react";
import { IBranch } from "..";
import { formatPhoneNumber } from "@/shared/utils";
import { da } from "date-fns/locale";

interface IProps {
    branch: IBranch;
    refetch: () => void
}


const EditBranchDialog = ({ branch, refetch }: IProps) => {

    const [bodytypes, setBodytypes] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<any>(branch);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const inputRef = useMask({
        mask: "+7 (___) ___-__-__",
        replacement: { _: /\d/ },
    });
    console.log(branch);

    const toggleBodytype = (id: number) => {
        if (data.bodytypes.includes(id)) {
            setData({...data, bodytypes: data.bodytypes.filter((item: number) => item !== id)});
        } else {
            setData({...data, bodytypes: [...data.bodytypes, id]});
        }
    }

    const validateData = (data: any) => {
        const errors: string[] = [];
        const phoneValue = inputRef.current?.value.replace(/[ -+()-]/g, "") || "";
        if (data.bodytypes.length === 0) {
          errors.push("bodytypes");
        }
        if (data.opening_time > data.closing_time || !data.opening_time || !data.closing_time) {
          errors.push("time");
        }
        if (phoneValue.length !== 11) {
          errors.push("phone");
        }
        if (!data.address) {
          errors.push("address");
        }
        setErrors(errors);
        return errors.length === 0;
      };

    useEffect(() => {
        api.get(`carwashes/conf/bodytypes/`).then((res) => {
            setBodytypes(res.data); 
        })
    }, [])

    const handleCreate = async () => {
        setLoading(true);
        setErrors([]);
        if (!validateData(data)) {
            setLoading(false);
            return;
        };
        const phoneValue = inputRef.current?.value.replace(/[ -+()-]/g, "") || "";
        await api.patch(`carwashes/branches/${branch.id}/`, {
            ...data,
            phone_number: phoneValue
        }).then(() => {
            refetch();
            setOpen(false);
        }).finally(() => {
            setLoading(false);
            setErrors([]);
        })
    }

    return (
        <Dialog open={open} onOpenChange={() => { setErrors([]); setData(branch); setOpen(!open)}}>
            <DialogTrigger asChild>
                <Button size="lg" className="mb:w-full">
                    <Pencil className="mr-2 h-4 w-4" />
                    Редактировать
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] mb:w-full mb:max-w-full">
                <DialogHeader className="font-semibold text-xl">Редактировать филиал</DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="address" className="text-sm font-medium">Адрес</Label>
                        <Input
                            id="address"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData({ ...data, address: e.target.value })}
                            placeholder="Адрес филиала"
                            className={cn("h-10", errors.includes("address") && "border-red-500 animate-shake transition-all")}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone_number" className="text-sm font-medium">Телефон</Label>
                        <Input
                            id="phone_number"
                            name="phone_number"
                            ref={inputRef}
                            value={formatPhoneNumber(data.phone_number)}
                            placeholder="+7 (___) ___-__-__"
                            onChange={(e) => setData({ ...data, phone_number: e.target.value })}
                            className={cn("h-10", errors.includes("phone") && "border-red-500 animate-shake transition-all")}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">Время работы</Label>
                        <div className="grid grid-cols-[1fr_30px_1fr] gap-4 items-center text-center">
                            <Input
                                id="opening_time"
                                name="opening_time"
                                type="time"
                                value={data.opening_time}
                                onChange={(e) => setData({ ...data, opening_time: e.target.value })}
                                placeholder="08:00"
                                className={cn("h-10", errors.includes("time") && "border-red-500 animate-shake transition-all")}
                            />
                            <p>До</p>
                            <Input
                                id="closing_time"
                                name="closing_time"
                                type="time"
                                value={data.closing_time}
                                onChange={(e) => setData({ ...data, closing_time: e.target.value })}
                                placeholder="20:00"
                                className={cn("h-10", errors.includes("time") && "border-red-500 animate-shake transition-all")}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">Типы кузова</Label>
                        <div className="flex flex-wrap gap-2">
                            {bodytypes.map((item) => (
                                <Button variant={data.bodytypes.includes(item.id) ? "default" : "outline"}
                                onClick={() => toggleBodytype(item.id)}
                                className={cn("h-10", errors.includes("bodytypes") && "border-red-500 animate-shake transition-all")}>{item.name}</Button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button
                        className="w-30" size={"lg"}
                        onClick={handleCreate}>{loading ? <Loader2 className="animate-spin" /> : "Добавить"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditBranchDialog;