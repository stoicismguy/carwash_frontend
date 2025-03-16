import { Button } from "@/components/ui";
import { LoaderCircle, RefreshCcw, RotateCw } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {

    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div>main</div>
            <Button className="w-20" onClick={() => setLoad(!load)}>{load ? <LoaderCircle className="animate-spin"/> : "Submit"}</Button>
            <Button variant={"outline"} className="h-10 w-10" onClick={() => setLoad(!load)}>{load ? <RotateCw className="animate-spin"/> : <RotateCw />}</Button>
            <Button onClick={() => navigate("/login")}>to login</Button>
        </>     
    )
}

export default Main;