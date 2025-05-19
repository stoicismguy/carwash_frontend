import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Textarea } from "@/components/ui";
import { Star } from "lucide-react";
import { useState } from "react";
import api from "@/api";

interface IProps {
    branch: any;
    address: string;
    refetch: () => Promise<void>;
}

const CreateReviewDialog = ({ branch, address, refetch }: IProps) => {

    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const handleSubmit = async () => {
        if (!branch || !rating) {
            return;
        }
        await api.post(`carwashes/branches/${branch}/ratings/`, {
            rating_value: rating,
            description: description
        }).then((res) => {
            setOpen(false);
            refetch();
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="flex items-center gap-2">
                    Оставить отзыв
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Оставить отзыв</DialogTitle>
                    <div className="text-sm text-muted-foreground">{address}</div>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Star key={index} className={`h-8 w-8 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} onClick={() => setRating(index + 1)} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-sm text-muted-foreground">Комментарий</div>
                        <Textarea
                            placeholder="Оставьте свой отзыв"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleSubmit}>Отправить</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateReviewDialog;