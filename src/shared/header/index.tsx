import React from "react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui";
import { CircleHelp, LogIn, LogOut, Menu } from "lucide-react";
import AvatarHeader from "./avatar";
import { IAuthContext } from "@/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ILink {
    text: string,
    img: React.ReactElement,
    link: string,
}

const Header = ({ user, login, logout }: IAuthContext) => {

    const [open, setOpen] = React.useState(false);
    const naviage = useNavigate();

    const linkList: ILink[] = [
        {
            text: "FAQ",
            img: <CircleHelp />,
            link: "/faq"
        }
    ];

    return (
        <div className="w-full h-[55px] flex items-center justify-between pr-15 pl-10 mb:px-5 border-b-1">
            {/* <Button variant={"link"} >Стать партнером</Button> */}
            <DropdownMenu onOpenChange={() => {setOpen(!open)}}>
                <DropdownMenuTrigger className="sm:hidden" asChild>
                    <motion.div initial={{ rotate: 0 }} animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
                        <Menu className="cursor-pointer" />
                    </motion.div>  
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {linkList.map((link, index) => (
                        <DropdownMenuItem onClick={() => naviage(link.link)}>{link.img}{link.text}</DropdownMenuItem>
                    ))}
                    
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="h-full flex items-center mb:hidden">
                <Button variant={"link"} onClick={() => naviage("/faq")}>FAQ</Button>
            </div>
            
            <AvatarHeader user={user} login={() => {}} logout={logout} />
        </div>
    )
}

export default React.memo(Header);