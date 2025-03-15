import singUp from "@/assets/undraw_signup.svg"

interface ILoginTemplateProps {
    type: "login" | "register";
    children: React.ReactNode
}

export const LoginTemplate = ({ type, children }: ILoginTemplateProps) => {
    return (
        <div className="grid grid-cols-[1fr_3fr] w-[60%] m-auto mt-[5%] h-[100%] mb:flex mb:w-[90%] mb:m-auto mb:h-[100%] mb:mt-[40%]">
            <div className="w-full pt-[15%]">
                {children}
            </div>
            <div className="w-[100%] pl-[20%] h-full mb:hidden">
                {type === "login" ? <img src={singUp} alt="login_svg" className="m-auto w-full"/> : <img src="" alt="register_svg" />}
            </div>
        </div>
    )
}