import { Avatar, AvatarFallback } from "@/components/ui";
import { LogIn, LogOut } from "lucide-react";

interface IAvatar {
    user: any,
    logout: () => void,
    login: () => void
}

const AvatarHeader = ({ user, login, logout }: IAvatar) => {
    return (
        <>
        {user ?
            <div className="h-full flex items-center gap-3 mb:gap-1">
                <div className="h-full flex items-center gap-2 px-2 hover:cursor-pointer hover:bg-secondary">
                    <Avatar className="h-9 w-9">
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback className="bg-primary text-primary-foreground">{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="h-full flex flex-col gap-0 items-start leading-none justify-center mb:hidden">
                        <p className="text-[12px] leading-none">{user.user_type}</p>
                        <p className="text-lg font-semibold leading-none">{user.name}</p>
                    </div>
                </div>
                <LogOut onClick={() => logout()} className="cursor-pointer" strokeWidth={1.5} size={20} />
            </div> : <LogIn onClick={() => login()} className="cursor-pointer" strokeWidth={1.5} size={20} />}
        </>
    );
}

export default AvatarHeader;