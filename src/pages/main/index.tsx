import { Button } from "@/components/ui";
import { AlignHorizontalJustifyEnd, Aperture, Apple, 
    AudioLines, ChevronRight,SquareActivity, 
    SquareArrowDownRight, ZapOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineShadowText, Marquee } from "@/components/magicui";
import { motion } from "framer-motion";
import video from "@/assets/moiekb_wo_logo.mp4";
import { cn } from "@/lib/utils";

const Main = () => {

    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const NavWrapper = ({children, className}: any) => {
        return (<div className={cn("w-full flex items-center gap-4", className)}>{children}</div>);
    }

    return (
        <div className="w-full bg-primary h-[100%] pb-10">
            {/* Костыль чтобы цвет фона был темный */}
            <style>{'body { background-color: var(--primary); }'}</style>

            <div className="relative h-[700px] mb:h-[500px] overflow-hidden z-1 flex items-center">
                <video autoPlay loop muted playsInline className="object-cover w-full h-full">
                    <source src={video} type="video/mp4"/>
                </video>
                <div className="absolute z-10 top-0 w-full h-full bg-black/50 flex flex-col">
                    <div className="w-full h-[60px] text-primary-foreground backdrop-blur-md bg-primary/10 grid grid-cols-[2fr_1fr_2fr] px-10 mb:px-0">
                        <NavWrapper>
                            <Button onClick={() => navigate("/faq?q=partner")} variant={"link"} className="text-primary-foreground">Стать партнером</Button>
                        </NavWrapper>
                        <NavWrapper className="flex items-center">
                            <h1 className="text-primary-foreground mx-auto text-2xl sm:text-4xl font-bold flex">МОЙ<LineShadowText className="italic" shadowColor="white">ЕКБ</LineShadowText></h1>
                            {/* <Aperture className="text-primary-foreground w-9 h-9 mx-auto" strokeWidth={1}/> */}
                        </NavWrapper>
                        <NavWrapper className="flex justify-end">
                            <Button onClick={() => navigate("/search")} variant={"link"} className="text-primary-foreground mb:hidden">Искать автомойки</Button>
                            <Button variant={"secondary"} className="rounded-full mb:bg-transparent mb:text-primary-foreground" onClick={() => navigate("/register")}>Регистрация</Button>
                        </NavWrapper>
                    </div>
                    <div className="w-full h-full flex flex-col gap-0 items-center justify-center">
                        <h1 className="text-primary-foreground text-4xl sm:text-6xl font-bold">АВТОМОЙКИ В <LineShadowText className="italic" shadowColor="white">ЕКБ</LineShadowText></h1>
                        {/* <p className="text-lg text-primary-foreground sm:text-2xl">Во всего Екб собрали</p> */}
                        <Button variant={"secondary"} 
                            onClick={() => navigate("/search")}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            size={"lg"} className="mt-5 rounded-full flex items-center">
                                Записаться{isHovered ? <motion.div><ChevronRight /></motion.div> : <ChevronRight />}
                        </Button>
                    </div>
                </div>
            </div>
            <div className="relative w-full flex items-center overflow-hidden justify-center h-[60px] gap-8 text-primary-foreground">
                <div className="flex items-center w-full gap-8 justify-center mb:hidden">
                    <img src="https://static.tildacdn.com/tild6166-3935-4136-a662-373134643937/noroot.png" className="h-10 rounded-md" />
                    <img src="https://avatars.mds.yandex.net/get-altay/758957/2a00000187087b4408d8dce340de9b0dd41e/S_height" className="h-10 rounded-md" />
                    <img src="https://avatars.mds.yandex.net/get-altay/11492238/2a0000018e7520420c5be0924cb5085c6227/S_height" className="h-10 rounded-md" />
                    <img src="https://avatars.mds.yandex.net/get-altay/1680678/2a0000018543675c140170c30a74c5b5122b/S_height" className="h-10 rounded-md" />
                    <img src="https://avatars.mds.yandex.net/get-altay/4398559/2a0000018292422dfc3773a2820ce83dc284/S_height" className="h-10 rounded-md" />
                    <img src="https://avatars.mds.yandex.net/get-altay/9720991/2a0000018adcfcec910af144acf4b60b138b/S_height" className="h-10 rounded-md" />
                    <img src="https://avatars.mds.yandex.net/get-altay/9737178/2a0000018bc9c850b36664433047d22d470e/S_height" className="h-10 rounded-md" />
                </div>
                    
                <Marquee pauseOnHover className="[--duration:20s] sm:hidden">
                    <img src="https://static.tildacdn.com/tild6166-3935-4136-a662-373134643937/noroot.png" className="h-10" />
                    <img src="https://avatars.mds.yandex.net/get-altay/758957/2a00000187087b4408d8dce340de9b0dd41e/S_height" className="h-10" />
                    <img src="https://avatars.mds.yandex.net/get-altay/11492238/2a0000018e7520420c5be0924cb5085c6227/S_height" className="h-10 rounded-md" />
                    <img src="https://avatars.mds.yandex.net/get-altay/1680678/2a0000018543675c140170c30a74c5b5122b/S_height" className="h-10 rounded-md" />
                    <img src="https://avatars.mds.yandex.net/get-altay/4398559/2a0000018292422dfc3773a2820ce83dc284/S_height" className="h-10 rounded-md" />
                    <img src="https://avatars.mds.yandex.net/get-altay/9720991/2a0000018adcfcec910af144acf4b60b138b/S_height" className="h-10 rounded-md" />
                    <img src="https://avatars.mds.yandex.net/get-altay/9737178/2a0000018bc9c850b36664433047d22d470e/S_height" className="h-10 rounded-md" />
                    {/* <Aperture className="w-10 h-10" strokeWidth={1}/>
                    <SquareActivity className="w-10 h-10" strokeWidth={1}/>
                    <SquareArrowDownRight className="w-10 h-10"strokeWidth={1} />
                    <AudioLines className="w-10 h-10" strokeWidth={1}/>
                    <ZapOff className="w-10 h-10" strokeWidth={1}/>
                    <Apple className="w-10 h-10" strokeWidth={1}/>
                    <AlignHorizontalJustifyEnd className="w-10 h-10" strokeWidth={1}/> */}
                </Marquee>     
            </div>
            <div className="w-full grid grid-cols-2 gap-y-2 gap-x-2 px-40 pt-10 mb:px-4 mb:flex mb:flex-col mb:items-center">
                <div className="w-full h-[200px] bg-primary-foreground text-primary py-4 px-6 rounded-lg">
                    <h1 className="text-3xl font-bold">🧽 Отмоем твою тачилу</h1>
                    <p className="text-lg text-primary/60">Безболезненно, без лишних нервов и суеты.</p>
                </div>
                <div className="w-full h-[200px] bg-primary-foreground text-primary py-4 px-6 rounded-lg">
                    <h1 className="text-3xl font-bold">⚡️ Сияй на дороге!</h1>
                    <p className="text-lg text-primary/60">Чистая тачка без хлопот — найдём лучшую мойку за пару кликов.</p>
                </div>
                <div className="w-full h-[200px] bg-primary-foreground text-primary py-4 px-6 rounded-lg">
                    <h1 className="text-3xl font-bold">💯 Грязь? Не твой стиль!</h1>
                    <p className="text-lg text-primary/60">Доверь свою машину профи, а мы подберём ближайшую топ-мойку.</p>
                </div>
                <div className="w-full h-[200px] bg-primary-foreground text-primary py-4 px-6 rounded-lg">
                    <h1 className="text-3xl font-bold">🔥 Тачка как новая!</h1>
                    <p className="text-lg text-primary/60">Быстро, качественно, без очередей — твоя идеальная мойка уже ждёт.</p>
                </div>
            </div>
        </div>     
    )
}

export default Main;