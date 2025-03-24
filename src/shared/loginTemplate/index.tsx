import singUp from "@/assets/undraw_signup.svg"
import login from "@/assets/undraw_login.svg"
import { cn } from "@/lib/utils";
import Logo from "../logo";

interface ILoginTemplateProps {
    type: "login" | "register";
    children: React.ReactNode
}

export const LoginTemplate = ({ type, children }: ILoginTemplateProps) => {
    return (
        <>
            <div className="w-full h-[55px] flex items-center border-b-1"><Logo color="black" className="text-2xl"/></div>
            <div className="grid grid-cols-[3fr_8fr] w-[60%] m-auto h-[100%] mb:flex mb:w-[90%] mb:m-auto mb:h-[100%]">
                <div className={cn("w-full pt-[60%]", type === "register" ? "mb:pt-[35%]" : "")}>
                    {children}
                </div>
                <div className="w-[100%] pl-[20%] pt-[15%] h-full mb:hidden">
                    {type === "login" ? <img src={login} alt="login_svg" className="m-auto w-full"/> : <img src={singUp} alt="login_svg" className="m-auto w-full"/>}
                </div>
            </div>
        </>
    )
}