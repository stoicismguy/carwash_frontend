import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui";
import { Power, PowerOff } from "lucide-react";

interface IProps {
    carWash: any,
    handleToggleActive: any
}


const DeactivateDialog = ({carWash, handleToggleActive }: IProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                variant={carWash.is_active ? "destructive" : "outline"}
                size="lg"
                className="mb:w-full"
                >
                {carWash.is_active ? (
                    <>
                    <PowerOff className="mr-2 h-4 w-4" />
                    Деактивировать
                    </>
                ) : (
                    <>
                    <Power className="mr-2 h-4 w-4" />
                    Активировать
                    </>
                )}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>Вы уверены?</DialogHeader>
                <DialogDescription>
                    {carWash.is_active ? "Деактивированный филиал НЕ будет отображаться в поиске, но имеющиеся записи не будут отменены" : "Активированный филиал будет отображаться в поиске и сможет получать заказы"}
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                        variant={carWash.is_active ? "destructive" : "default"}
                        className="mb:w-full"
                        onClick={handleToggleActive}
                        size={"lg"}
                        >
                        {carWash.is_active ? (
                            <>
                            Да, Деактивировать
                            </>
                        ) : (
                            <>
                            Да, Активировать
                            </>
                        )}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline" size={"lg"} onClick={() => {}}>Отменить</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeactivateDialog;