import { Avatar, AvatarFallback } from "@/components/ui";
import { LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface IAvatar {
    user: any,
    logout: () => void,
}

const AvatarHeader = ({ user, logout }: IAvatar) => {

    const navigate = useNavigate();

    return (
        <>
        {user ?
            <div className="h-full flex items-center gap-3 mb:gap-1">
                <div className="h-full flex items-center gap-2 px-2 hover:cursor-pointer hover:bg-secondary mb:flex-row-reverse" onClick={() => navigate("/profile")}>
                    <Avatar className="h-9 w-9">
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback className="bg-primary text-primary-foreground">{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="h-full flex flex-col gap-0 items-start mb:hidden leading-none justify-center">
                        <p className="text-[12px] leading-none">{user.user_type === "business" ? "Бизнес" : "Пользователь"}</p>
                        <p className="text-lg font-semibold leading-none">{user.name}</p>
                    </div>
                </div>
                <LogOut onClick={() => {
                    logout();
                    navigate("/");
                    }} className="cursor-pointer" strokeWidth={1.5} size={20} />
            </div> : <LogIn onClick={() => navigate("/login")} className="cursor-pointer mr-3" strokeWidth={1.5} size={20} />}
        </>
    );
}

export default AvatarHeader;