import { Button, CommandEmpty, CommandGroup, CommandInput, Command, CommandItem, CommandList, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, Label, Popover, PopoverContent, PopoverTrigger, Textarea, DialogFooter } from "@/components/ui";
import { useState } from "react";
import { IBranch } from "..";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { group } from "console";
import { da } from "date-fns/locale";
import api from "@/api";
import { set } from "date-fns";


interface IProps {
    branch: IBranch;
    groups: any[],
    refetch: () => void
}

interface IGroupList {
    groups: any[],
    cid: number,
    handleSelect: (id: number) => void,
    error: boolean
}

   
export const GroupList = ({ groups, cid, handleSelect, error }: IGroupList) => {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                    className={cn("w-[200px] justify-between h-10 font-normal", !cid && "text-muted-foreground", error && "border-red-500 animate-shake transition-all")}
                    >
                    {cid
                    ? groups.find((group) => group.id === cid)?.name
                    : "Выберите группу..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty><p className="text-muted-foreground">Создайте группу услуг</p></CommandEmpty>
                        <CommandGroup>
                        {groups.map((group) => (
                            <CommandItem
                                key={group.value}
                                className="cursor-pointer"
                                value={group.value}
                                onSelect={() => {
                                    handleSelect(group.id)
                                    setOpen(false)
                                }}
                                >
                            {group.name}
                            <Check
                                className={cn(
                                "ml-auto",
                                cid === group.id ? "opacity-100" : "opacity-0"
                                )}
                            />
                            </CommandItem>
                        ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}


const CreateServiceDialog = ({ branch, groups, refetch }: IProps) => {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const validateData = (data: any) => {
        const errors: string[] = [];
        if (!data.name) {
            errors.push("name");
        }
        if (!data.group) {
            errors.push("group");
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
        }
        await api.post(`services/groups/${data.group}/`, {
            ...data
        }).then(() => {
            refetch();
            setOpen(false);
        }).finally(() => {
            setLoading(false);
            setErrors([]);
        })
        
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                size={"lg"}
                variant={"outline"}>
                Создать услугу
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader className="font-semibold text-xl">Создать услугу</DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-right">Название</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}
                            className={cn("col-span-3 h-10", errors.includes("name") && "border-red-500 animate-shake transition-all")}
                            placeholder="Название услуги" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-right">Группа</Label>
                        <GroupList groups={groups} cid={data.group} error={errors.includes("group")} handleSelect={(id: number) => setData({ ...data, group: id })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="price" className="text-right">Цена</Label>
                            <Input id="price" value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })}
                                className={cn("col-span-3 h-10", errors.includes("price") && "border-red-500 animate-shake transition-all")}
                                placeholder="Цена" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="time" className="text-right">Длительность</Label>
                            <Input id="time" type="time" value={data.duration}
                            onChange={(e) => setData({ ...data, duration: e.target.value })}
                            className={cn("col-span-3 h-10", errors.includes("duration") && "border-red-500 animate-shake transition-all")} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description" className="text-right">Описание</Label>
                        <Textarea id="description" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} className="col-span-3 h-10" placeholder="Описание услуги" />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave} size={"lg"} className="w-30">{loading ? <Loader2 className="animate-spin" /> : "Создать"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
    
}

export default CreateServiceDialog;