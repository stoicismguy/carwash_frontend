import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import redirect from "@/assets/undraw_redirect.svg"

export const GoLogin = () => {

    const navigate = useNavigate();
    const [count, setCount] = useState(5);

    useEffect(() => {
        // Запускаем интервал
        const timer = setInterval(() => {
          setCount((prevCount) => {
            const newCount = prevCount - 1; // Используем предыдущее значение
            if (newCount <= 0) {
              navigate("/login"); // Перенаправляем, когда дошли до 0
              clearInterval(timer); // Останавливаем интервал
            }
            return newCount; // Возвращаем новое значение
          });
        }, 1000);
    
        // Очищаем интервал при размонтировании
        return () => clearInterval(timer);
      }, [navigate]);

    return (
        <div className="flex flex-col gap-5 items-center justify-center mt-[5%]">
            <img src={redirect} alt="404" className="w-[20%]" />
            <p className="text-2xl">Вы будете перенаправлены на страницу авторизации</p>
            <div className="rounded-full w-[50px] h-[50px] flex items-center justify-center bg-primary text-primary-foreground">
                <p className="text-2xl">{count}</p>
            </div>
        </div>
    )
}