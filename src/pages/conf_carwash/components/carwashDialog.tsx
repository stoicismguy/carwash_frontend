import { Button, Dialog, DialogTrigger, DialogContent, DialogHeader, Label, Input, Textarea, DialogFooter } from "@/components/ui";
import { Globe, Loader2, Mail, Pencil, Phone, Settings } from "lucide-react";
import { ICarWash } from "..";
import { useState } from "react";
import { useMask } from "@react-input/mask";
import { formatPhoneNumber } from "@/shared/utils";
import api from "@/api";
import { cn } from "@/lib/utils";


interface IProps {
    carwash: ICarWash,
    refetch: () => void,
    variant: "edit" | "create",
    className?: string
}

const CarwashDialog = ({ carwash, refetch, className, variant = "edit" }: IProps) => {

    const [data, setData] = useState<any>(carwash);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    
    const inputRef = useMask({
            mask: "+7 (___) ___-__-__",
            replacement: { _: /\d/ },
        });

    const validateData = (data: any) => {
        let isErrors = false;
        if (!data.name) {
            setErrors([...errors, "name"]);
            isErrors = true;
        }
        const phoneValue = inputRef.current?.value.replace(/[ -+()-]/g, "") || "";
        if (phoneValue.length !== 11) {
            setErrors([...errors, "phone"]);
            isErrors = true;
        };
        return !isErrors;
    }

    const handleSave = async () => {
        setLoading(true);
        setErrors([]);
        if (!validateData(data)) {
            setLoading(false);
            return;
        };
        if (variant == "edit") {
            await api.patch(`carwashes/${carwash.id}/`, {
                ...data,
                phone_number: inputRef.current?.value.replace(/[ -+()-]/g, "")
            }).then(() => {
                refetch();
                setOpen(false);
            }).catch((e) => {
                console.log(e);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            await api.post(`carwashes/`, {
                ...data,
                phone_number: inputRef.current?.value.replace(/[ -+()-]/g, "")
            }).then(() => {
                refetch();
                setOpen(false);
            }).catch((e) => {
                console.log(e);
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={(open) => {setOpen(open); setData(carwash); setErrors([])}}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className={cn("mb:w-full", className)}
                    variant={variant === "edit" ? "outline" : "default"}
                    >
                    
                    {variant === "edit" ? <><Pencil className="mr-2 h-4 w-4" />Редактировать</> : "Добавить"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] mb:w-full mb:max-w-full">
                <DialogHeader className="font-semibold text-xl">{variant === "edit" ? "Изменить информацию о автомойке" : "Добавить автомойку"}</DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-sm font-medium">Название</Label>
                        <Input
                            id="name"
                            name="name"
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            value={data.name}
                            placeholder="Название предприятия"
                            className={cn("h-10", errors.includes("name") ? "border-red-500 animate-shake transition-all" : "")}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-4 mb:grid-cols-1">
                        <div className="grid gap-2">
                            <Label htmlFor="phone" className="text-sm font-medium"><Phone className="mr-0 h-4 w-4" strokeWidth={1.5} />Телефон</Label>
                            <Input
                                id="phone"
                                name="phone"
                                ref={inputRef}
                                onChange={(e) => setData({ ...data, phone_number: e.target.value })}
                                value={formatPhoneNumber(data.phone_number)}
                                placeholder="+7 (___) ___-__-__"
                                className={cn("h-10", errors.includes("phone") ? "border-red-500 animate-shake transition-all" : "")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-sm font-medium"><Mail className="mr-0 h-4 w-4" strokeWidth={1.5} />Email</Label>
                            <Input
                                id="email"
                                name="email"
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                className="h-10"
                                value={data.email}
                                placeholder="Email"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="website" className="text-sm font-medium"><Globe className="mr-0 h-4 w-4" strokeWidth={1.5} />Вебсайт</Label>
                            <Input
                                id="website"
                                name="website"
                                className="h-10"
                                onChange={(e) => setData({ ...data, website: e.target.value })}
                                value={data.website}
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description" className="text-sm font-medium">Описание</Label>
                        <Textarea
                            id="description"
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            name="description"
                            value={data.description}
                            placeholder="Описание автомойки"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-31" size={"lg"} onClick={handleSave}>{loading ? <Loader2 className="animate-spin" /> : "Сохранить"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CarwashDialog;