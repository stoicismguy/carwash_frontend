import { LineShadowText } from "@/components/magicui";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";


interface IProps {
    className?: string;
    color: "black" | "white";
}

const Logo = ({ color, className }: IProps) => {
    const navigate = useNavigate();
    return (
        <h1 onClick={() => navigate("/search")}
            className={cn("mx-auto font-bold cursor-pointer flex",
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