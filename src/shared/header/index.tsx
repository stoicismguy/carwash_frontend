import React from "react";
import { Button, Drawer, DrawerClose, DrawerContent, DrawerTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui";
import { CircleHelp, LogIn, LogOut, Menu, CalendarClock } from "lucide-react";
import AvatarHeader from "./avatar";
import { IAuthContext, useAuth } from "@/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "@/shared/logo";

interface ILink {
    text: string,
    img: React.ReactElement,
    link: string,
}

const Header = () => {

    const [open, setOpen] = React.useState(false);
    const naviage = useNavigate();
    const { user, login, logout } = useAuth();

    const currentUser = user();

    const linkList: ILink[] = [
        {
            text: "FAQ",
            img: <CircleHelp size={20} />,
            link: "/faq"
        }
    ];

    return (
        <div className="w-full h-[55px] grid grid-cols-[2fr_1fr_2fr] px-12 mb:px-5 border-b-1">

            <div className="h-full flex items-center">
                {/* Для телефона бургер с выпадающей менюшкой */}
                {/* <DropdownMenu onOpenChange={() => {setOpen(!open)}}>
                    <DropdownMenuTrigger className="sm:hidden cursor-pointer" asChild>
                        <motion.div initial={{ rotate: 0 }} animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
                            <Menu />
                        </motion.div>  
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {linkList.map((link, index) => (
                            <DropdownMenuItem onClick={() => naviage(link.link)}>{link.img}{link.text}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu> */}

                <Drawer direction="left">
                    <DrawerTrigger className="sm:hidden cursor-pointer" asChild>
                        <Menu />
                    </DrawerTrigger>
                    <DrawerContent className="flex flex-col items-center !w-[250px]">
                        <div className="flex items-center h-[55px] w-full px-5">
                        <DrawerClose asChild>
                            <Menu />
                        </DrawerClose>
                        </div>
                        <div className="flex flex-col gap-0 w-full">
                            {linkList.map((link, index) => (
                                <div key={index} className="flex items-center gap-2 px-3 pl-4 py-3 border-b-1" onClick={() => naviage(link.link)}>{link.img}{link.text}</div>
                            ))}
                        </div>
                    </DrawerContent>
                </Drawer>

                {/* Для компа */}
                <div className="h-full w-full flex items-center gap-4 mb:hidden">
                    <Button variant={"link"} onClick={() => naviage("/faq")}>FAQ</Button>
                </div> 
            </div>

            <div className="w-full h-full flex items-center">
                <Logo color="black" className="text-2xl" />
            </div>

            <div className="w-full h-full flex items-center justify-end">
                <AvatarHeader user={currentUser} logout={logout} />
            </div>
            
        </div>
    )
}

export default React.memo(Header);