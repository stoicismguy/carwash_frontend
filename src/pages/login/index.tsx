import { LoginTemplate } from "@/shared/loginTemplate"
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { useState } from "react";
import { useMask } from "@react-input/mask"
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [isInvalid, setIsInvalid] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [load, setLoad] = useState(false);

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
                <h1 className="text-2xl font-bold mb:text-3xl">Авторизация</h1>

                <Input type="text"
                    className={cn("h-10 mb:h-12", isInvalid ? "border-red-500 animate-shake transition-all" : "")}
                    placeholder="+7 (___) ___-__-__" ref={inputRef}
                    onChange={() => setIsInvalid(false)}/>

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
                    onClick={() => handlesSubmit(event)}>{load ? <LoaderCircle className="animate-spin"/> : "Вход"}</Button>
                <p className="text-sm text-center text-muted-foreground">Нет аккаунта? <a href="/register" className="hover:text-primary underline-offset-4 underline">Зарегистрироваться</a></p>
            </form>
        </LoginTemplate>
    );
}

export default Login;