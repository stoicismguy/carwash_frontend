import { Avatar, AvatarFallback } from "@/components/ui";
import { IReview } from "./carwashItem";
import { Star } from "lucide-react";

interface IProps {
    item: IReview;
}

const ReviewItem = ({ item }: IProps) => {
    return (
        <div className="rounded-xl bg-muted px-4 py-3">
            <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2 items-center">
                    <Avatar className="h-9 w-9">
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback className="bg-primary text-primary-foreground">Го</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col leading-none">
                        <h1 className="text-md font-semibold">Гошан</h1>
                        <p className="text-sm text-muted-foreground">Вчера, 09:33</p>
                    </div>
                </div>
                <div className="flex gap-1 items-center">
                    {Array(Math.round(item.rating_value)).fill(0).map((_, i) => <Star className="text-yellow-400 fill-yellow-400" />)}
                    {Array(5 - Math.round(item.rating_value)).fill(0).map((_, i) => <Star className="text-yellow-400" />)}
                </div>
            </div>
            <div className="w-full py-2">
                <p className="text-sm">{item.description}</p>
            </div>
        </div>
    );
}

export default ReviewItem;