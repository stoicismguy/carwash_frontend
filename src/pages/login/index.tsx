import { LoginTemplate } from "@/shared/loginTemplate"
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { useState } from "react";
import { useMask } from "@react-input/mask"
import { cn } from "@/lib/utils";

const Login = () => {

    const [isInvalid, setIsInvalid] = useState(false);

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

    const handlesSubmit = () => {
        const phoneValue = inputRef.current?.value || "";
        const isValid = validatePhone(phoneValue);
        if (!isValid) {
            setIsInvalid(true);
            setTimeout(() => setIsInvalid(false), 500);
        }
        else {
           // Тут можно дальше логику авторизации пихать 
        }
    }

    return (
        <LoginTemplate type="login">
            <div className="flex flex-col gap-3 mb:items-center mb:w-full">
                <h1 className="text-2xl font-bold mb:text-3xl">Авторизация</h1>
                <Input type="text"
                    className={cn("mb:h-12", isInvalid ? "border-red-500 animate-shake transition-all" : "")}
                    placeholder="+7 (___) ___-__-__" ref={inputRef}
                    onChange={() => setIsInvalid(false)}/>
                <Input type="password" placeholder="Пароль" className="mb:h-12" />
                <Button className="cursor-pointer font-bold mb:w-full mb:h-12 mb:text-lg" onClick={() => handlesSubmit()}>Вход</Button>
            </div>
        </LoginTemplate>
    );
}

export default Login;