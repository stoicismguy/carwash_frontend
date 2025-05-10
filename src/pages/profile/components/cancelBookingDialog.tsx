import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui";
import api from "@/api";

interface IProps {
    record: any;
    close: () => void;
    refetch: () => void;
}

export default function CancelBookingDialog({ record, close, refetch }: IProps) {

    const cancelBooking = async () => {
        await api.delete(`bookings/${record.id}/`);
        refetch();
        close();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" size="lg">Отменить</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Отменить бронирование</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Вы уверены, что хотите отменить бронирование?
                </DialogDescription>
                <DialogFooter>
                    <Button variant="outline" size="lg" onClick={close}>Назад</Button>
                    <Button variant="destructive" size="lg" onClick={cancelBooking}>Отменить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}