import { LoginTemplate } from "@/shared/loginTemplate"
import { Button, Progress, Skeleton } from "@/components/ui";
import { Input } from "@/components/ui";
import { useState } from "react";
import { useMask } from "@react-input/mask"
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";

const Register = () => {
    const navigate = useNavigate();
    const [isInvalid, setIsInvalid] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(true);
    const [password, setPassword] = useState("");
    const [progress, setProgress] = useState(0);

    const [load, setLoad] = useState(false);
    const [tabValue, setTabValue] = useState("user");

    const inputRef = useMask({
        mask: "+7 (___) ___-__-__",
        replacement: { _: /\d/ },
    });

    const validatePhone = (value: string) => {
        const digits = value.replace(/\D/g, "");
        if (digits.length === 11) {
            return true;
        }
        return false;
    }

    const handlesSubmit = (event: any) => {
        event.preventDefault();
        setLoad(true);
        const phoneValue = inputRef.current?.value || "";
        const isValid = validatePhone(phoneValue);
        if (!isValid) {
            setIsInvalid(true);
            setTimeout(() => setIsInvalid(false), 500);
        }
        else {
           // Тут можно дальше логику авторизации пихать
           navigate("/");
        }
        setLoad(false);
    }

    const handePasswordChange = (value: string) => {
        setPassword(value);
        const hasLenght = value.length >= 8;
        const hasLetter = /[A-Za-z]/.test(value);
        const hasDigit = /\d/.test(value);
        const progress = ((hasLenght ? 1 : 0) + (hasLetter ? 1 : 0) + (hasDigit ? 1 : 0)) / 3 * 100;
        console.log(progress);
        setProgress(progress);
    }

    return (
        <LoginTemplate type="register">
            <form className="flex flex-col gap-3 mb:items-center mb:w-full">
                <h1 className="text-2xl font-bold mb:text-3xl">Регистрация</h1>

                <Tabs className="w-full" defaultValue="user" onValueChange={(value) => setTabValue(value)}>
                    <TabsList className="w-full h-10 mb:h-12">
                        <TabsTrigger className="cursor-pointer mb:text-[16px]" value="user">Водитель</TabsTrigger>
                        <TabsTrigger className="cursor-pointer mb:text-[16px]" value="buisness">Бизнес</TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* <Skeleton className="w-full h-10" /> */}

                <Input type="text"
                    className={cn("h-10 mb:h-12", isInvalid ? "border-red-500 animate-shake transition-all" : "")}
                    placeholder="+7 (___) ___-__-__" ref={inputRef}
                    onChange={() => setIsInvalid(false)}/>

                <Input type="text" className="h-10 mb:h-12"
                    placeholder={tabValue === "buisness" ? "Название компании" : "Фамилия Имя"} onInput={(e) => {console.log((e.target as HTMLInputElement).value)}}
                    maxLength={40} />
                <div className="w-full flex flex-col gap-1">
                    <div className="w-full flex items-center relative">
                        <Input type={passwordVisible ? "password" : "text"}
                            placeholder="Пароль" 
                            onChange={(e) => handePasswordChange(e.target.value)}
                            className="pr-9 h-10 mb:h-12 mb:pr-11" />

                        {!passwordVisible ? 
                            <Eye className="absolute right-3 text-muted-foreground w-5 mb:w-7"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                strokeWidth={1.5}/> : 
                            <EyeOff className="absolute right-3 text-muted-foreground w-5 mb:w-7"
                                onClick={() => setPasswordVisible(!passwordVisible)} strokeWidth={1.5}/>
                        }
                    </div>
                    {!(progress >= 80) && <p className="text-[12px] pl-1 text-muted-foreground">Минимум 8 символов, 1 буква и 1 цифра</p>}
                    {(progress !== 0) && <Progress max={100} value={progress} className={(progress > 80) ? "mt-2" : ""} color={progress < 40 ? "bg-red-500" : progress < 80 ? "bg-yellow-500" : "bg-green-500"} />}
                </div>
                
                
                <Button className="cursor-pointer h-10 font-bold mb:w-full mb:h-12 mb:text-lg" disabled={load}
                    onClick={() => handlesSubmit(event)}>{load ? <LoaderCircle className="animate-spin"/> : "Зарегистрироваться"}</Button>
                <p className="text-sm text-center text-muted-foreground">Уже есть аккаунт? <a href="/login" className="hover:text-primary underline-offset-4 underline">Войти</a></p>
            </form>
        </LoginTemplate>
    );
}

export default Register;