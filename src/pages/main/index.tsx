import { Button } from "@/components/ui";
import { AlignHorizontalJustifyEnd, Aperture, Apple, 
    AudioLines, ChevronRight,SquareActivity, 
    SquareArrowDownRight, ZapOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineShadowText } from "@/components/magicui";
import { motion } from "framer-motion";
import video from "@/assets/audio_card.mp4";
import { cn } from "@/lib/utils";

const Main = () => {

    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const NavWrapper = ({children, className}: any) => {
        return (<div className={cn("w-full flex items-center gap-4", className)}>{children}</div>);
    }

    return (
        <div className="w-full bg-primary h-screen">
            <div className="relative h-[700px] mb:h-[500px] overflow-hidden z-1">
                <video autoPlay loop muted playsInline className="object-cover min-h-full origin-center">
                    <source src={video} type="video/mp4"/>
                </video>
                <div className="absolute z-10 top-0 w-full h-full bg-black/50 flex flex-col">
                    <div className="w-full h-[60px] text-primary-foreground backdrop-blur-md bg-primary/10 grid grid-cols-[1fr_50px_1fr] px-10">
                        <NavWrapper>
                            <Button variant={"link"} className="text-primary-foreground">Стать партнером</Button>
                        </NavWrapper>
                        <NavWrapper>
                            <Aperture className="text-primary-foreground w-9 h-9" strokeWidth={1}/>
                        </NavWrapper>
                        <NavWrapper className="flex justify-end">
                            <Button variant={"link"} className="text-primary-foreground">Искать автомойки</Button>
                            <Button variant={"secondary"} className="rounded-full" onClick={() => navigate("/register")}>Регистрация</Button>
                        </NavWrapper>
                    </div>
                    <div className="w-full h-full flex flex-col gap-0 items-center justify-center">
                        <h1 className="text-primary-foreground text-4xl sm:text-6xl font-bold">АВТОМОЙКИ В <LineShadowText className="italic" shadowColor="white">ЕКБ</LineShadowText></h1>
                        {/* <p className="text-lg text-primary-foreground sm:text-2xl">Во всего Екб собрали</p> */}
                        <Button variant={"secondary"} 
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            size={"lg"} className="mt-5 rounded-full flex items-center">
                                Записаться{isHovered ? <motion.div><ChevronRight /></motion.div> : <ChevronRight />}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center h-[60px] gap-8 text-primary-foreground">
                <Aperture className="w-10 h-10" strokeWidth={1}/>
                <SquareActivity className="w-10 h-10" strokeWidth={1}/>
                <SquareArrowDownRight className="w-10 h-10"strokeWidth={1} />
                <AudioLines className="w-10 h-10" strokeWidth={1}/>
                <ZapOff className="w-10 h-10" strokeWidth={1}/>
                <Apple className="w-10 h-10" strokeWidth={1}/>
                <AlignHorizontalJustifyEnd className="w-10 h-10" strokeWidth={1}/>
            </div>
        </div>     
    )
}

export default Main;