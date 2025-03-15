import svg404 from "@/assets/undraw_404.svg"

export const ErrorElement = () => {
    return (
        <div className="flex flex-col gap-5 items-center justify-center mt-[5%]">
            <img src={svg404} alt="404" className="w-[30%]" />
            <p className="text-2xl">Страница не найдена</p>
        </div>
    )
}