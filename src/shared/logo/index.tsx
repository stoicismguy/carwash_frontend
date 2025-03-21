import { LineShadowText } from "@/components/magicui";
import { cn } from "@/lib/utils";


interface IProps {
    className?: string;
    color: "black" | "white";
}

const Logo = ({ color, className }: IProps) => {
    return (
        <h1 className={cn("mx-auto font-bold flex",
            className, 
            (color === "black" ? "text-primary" : "text-primary-foreground"))}>
                МОЙ
                <LineShadowText
                    className="italic"
                    shadowColor={color}>
                        ЕКБ
                </LineShadowText>
        </h1>
    );
}

export default Logo;