import { LoginTemplate } from "@/shared/loginTemplate"
import { Button, Skeleton } from "@/components/ui";
import { Input } from "@/components/ui";
import { useState } from "react";
import { useMask } from "@react-input/mask"
import { cn } from "@/lib/utils";
import { Building, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui";

const Register = () => {
    const navigate = useNavigate();
    const [isInvalid, setIsInvalid] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true);
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

    return (
        <LoginTemplate type="login">
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
                    placeholder={tabValue === "buisness" ? "Название компании" : "Имя фамилия"} onInput={(e) => {console.log(e.target.value)}}
                    maxLength={40} />

                <div className="w-full flex items-center relative">

                    <Input type={passwordVisible ? "password" : "text"}
                        placeholder="Пароль" 
                        className="pr-9 h-10 mb:h-12 mb:pr-11" />

                    {!passwordVisible ? 
                        <Eye className="absolute right-3 text-muted-foreground w-5 mb:w-7"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            strokeWidth={1.5}/> : 
                        <EyeOff className="absolute right-3 text-muted-foreground w-5 mb:w-7"
                            onClick={() => setPasswordVisible(!passwordVisible)} strokeWidth={1.5}/>
                    }
                </div>
                
                <Button className="cursor-pointer h-10 font-bold mb:w-full mb:h-12 mb:text-lg" disabled={load}
                    onClick={() => handlesSubmit(event)}>{load ? <LoaderCircle className="animate-spin"/> : "Зарегестрироваться"}</Button>
                <p className="text-sm text-center text-muted-foreground">Уже есть аккаунт? <a href="/login" className="hover:text-primary underline-offset-4 underline">Войти</a></p>
            </form>
        </LoginTemplate>
    );
}

export default Register;