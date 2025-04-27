import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from "@/components/ui";
import { useState } from "react";
import { IBranch } from "..";


interface IProps {
    branch: IBranch;
}


const CreateServiceDialog = ({ branch }: IProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                size={"lg"}
                variant={"outline"}>
                Создать услугу
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="font-semibold text-xl">Создать услугу</DialogHeader>
            </DialogContent>
        </Dialog>
    );
    
}

export default CreateServiceDialog;