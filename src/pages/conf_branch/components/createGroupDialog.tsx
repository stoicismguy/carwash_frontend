import api from "@/api";
import { Button, Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger, Input, Label, TableCell, TableRow, Textarea } from "@/components/ui";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { IBranch } from "..";
import { se } from "date-fns/locale";
import { set } from "date-fns";


interface IProps {
    branch: IBranch;
}

const CreateGroupDialog = ({ branch }: IProps) => {

    const [data, setData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string>("");

    const handleSave = async () => {
        setIsLoading(true);
        if (!branch) return;
        await api.post(`services/${branch.id}/groups/`, {
            ...data,
            branch: branch.id
        }).then(() => {
            setOpen(false);
        }).catch((e) => {
            setError(e.response.data.name[0]);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                variant="outline">
                + Создать группу
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="font-semibold">Создать группу услуг</DialogHeader>
                <div className="grid gap-2 py-1">
                    <Label htmlFor="name" className="text-sm font-medium">Название</Label>
                    <Input
                        id="name"
                        name="name"
                        onChange={(e) => {
                            setData({ ...data, name: e.target.value })
                            setError("");
                        }}
                        value={data.name}
                        placeholder="Название группы"
                        className="h-10"
                    />
                    {error && <Label htmlFor="name" className="text-sm text-red-500 font-medium">{error}</Label>}
                </div>
                <DialogFooter>
                    <Button className="w-30 mb:w-full" size={"lg"} disabled={isLoading} onClick={handleSave}>{isLoading ? <LoaderCircle className="animate-spin"/> : "Создать"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateGroupDialog;