import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { ChevronRight, Settings } from "lucide-react";
import { Badge } from "@/components/ui";

const CarwashList = () => {

    const [carwashes, setCarwashes] = useState<any[]>([]);
    const navigate = useNavigate();

    const fetchList = async () => {
        await api.get(`carwashes/conf/carwashes/`).then((res) => {
            setCarwashes(res.data);
        })
    }

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="mt-3">
            {/* <h3 className="text-lg font-semibold mb-2">Предприятия</h3> */}
            <div className="grid gap-4">
                {carwashes.map((business) => (
                    <button
                    key={business.id}
                    onClick={() => navigate(`/conf/${business.id}`)}
                    className="w-full text-left bg-background border rounded-lg p-4 hover:bg-muted/50 transition mb:w-full"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="flex gap-2">
                                    <p className="font-semibold">{business.name}</p>
                                    <Badge className={`${business.is_active ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`} variant="secondary">{business.is_active ? "Активно" : "Не активно"}</Badge>
                                </div>
                                
                                <p className="text-sm text-muted-foreground">+{business.phone_number}</p>
                            </div>
                            <ChevronRight size={25} strokeWidth={1.3} />
                            {/* <p className="text-sm text-primary">Перейти</p> */}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CarwashList;
