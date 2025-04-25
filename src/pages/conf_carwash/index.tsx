import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Badge, Separator, Input, Textarea, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui";
import { Phone, Mail, Globe, Star, Settings, Save, Power, PowerOff, MapPin, ChevronRight } from "lucide-react";
import api from "@/api";
import Header from "@/shared/header";
import { CreateBranchDialog, DeactivateDialog } from "./components";

interface ICarWash {
  id: number;
  name: string;
  phone_number: string;
  description: string;
  email: string;
  rating: string;
  is_active: boolean;
  logo: string | null;
  website: string | null;
  created_at: string;
  user: number;
}

interface IBranch {
  id: number;
  address: string;
  name: string;
  latitude: string;
  longitude: string;
  description: string;
  phone_number: string;
  is_active: boolean;
  opening_time: string;
  closing_time: string;
  rating: string;
  created_at: string;
  carwash: number;
  bodytypes: number[];
}

const ConfCarwash = () => {
    const { id } = useParams<{ id: string }>(); // Получаем id из URL
    const [carWash, setCarWash] = useState<ICarWash | null>(null);
    const [branches, setBranches] = useState<IBranch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<{ phone_number: string; description: string } | null>(null);
    const navigate = useNavigate();

  // Загрузка данных автомойки и филиалов
    useEffect(() => {
        const fetchData = async () => {
        try {
            setIsLoading(true);
            // Загрузка автомойки
            const carWashResponse = await api.get(`carwashes/${id}/`);
            setCarWash(carWashResponse.data);
            // Загрузка филиалов
            const branchesResponse = await api.get(`carwashes/${id}/branches/`);
            setBranches(branchesResponse.data.results);
        } catch (err) {
            setError("Ошибка загрузки данных");
        } finally {
            setIsLoading(false);
        }
        };
        fetchData();
    }, [id]);

  // Обработчик начала редактирования
    const handleEdit = () => {
        if (carWash) {
            setEditData({
                phone_number: carWash.phone_number,
                description: carWash.description,
            });
        setIsEditing(true);
        }
    };

  // Обработчик изменения полей
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setEditData((prev) => (prev ? { ...prev, [name]: value } : prev));
    };

    // Обработчик сохранения
    const handleSave = async () => {
        if (carWash && editData) {
            try {
                // Обновление данных на сервере
                await api.patch(`carwashes/${id}/`, {
                    phone_number: editData.phone_number,
                    description: editData.description,
                });
                // Обновление локальных данных
                setCarWash({
                    ...carWash,
                    phone_number: editData.phone_number,
                    description: editData.description,
                });
                    setIsEditing(false);
                    setEditData(null);
            } catch (err) {
                setError("Ошибка сохранения данных");
            }
        }
    };

    // Обработчик переключения активности
    const handleToggleActive = async () => {
        if (carWash) {
        try {
            const newStatus = !carWash.is_active;
            // Обновление статуса на сервере
            await api.patch(`carwashes/${id}/`, {
            is_active: newStatus,
            });
            // Обновление локальных данных
            setCarWash({
            ...carWash,
            is_active: newStatus,
            });
        } catch (err) {
            setError("Ошибка изменения статуса активности");
            }
        }
    };

    if (isLoading) {
        return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <p className="text-lg text-muted-foreground">Загрузка...</p>
        </div>
        );
    }

    if (error || !carWash) {
        return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <p className="text-lg text-destructive">{error || "Автомойка не найдена"}</p>
        </div>
        );
    }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Заголовок автомойки */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold mb:text-2xl">{carWash.name}</h1>
            <div className="flex items-center gap-2">
              <Badge
                className={`mb:text-sm text-[14px] ${
                  carWash.is_active ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                }`}
              >
                {carWash.is_active ? "Активна" : "Неактивна"}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 text-[14px] mb:text-sm">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                {carWash.rating}
              </Badge>
            </div>
          </div>

          {/* Основной контент */}
          <div className="bg-background border rounded-lg p-6 mb:p-4 mb-3">
            <div className="text-xl font-semibold mb-4 mb:text-lg">Информация об автомойке</div>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    {isEditing ? (
                      <Input
                        name="phone_number"
                        value={editData?.phone_number || ""}
                        onChange={handleInputChange}
                        className="mt-1 h-10 mb:h-9"
                      />
                    ) : (
                      <p className="font-medium">{carWash.phone_number}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{carWash.email}</p>
                  </div>
                </div>
                {carWash.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Веб-сайт</p>
                      <a
                        href={carWash.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        {carWash.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Описание</p>
                {isEditing ? (
                  <Textarea
                    name="description"
                    value={editData?.description || ""}
                    onChange={handleInputChange}
                    className="mt-1 min-h-[100px]"
                  />
                ) : (
                  <p className="mt-1 whitespace-pre-wrap">{carWash.description}</p>
                )}
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Дата создания</p>
                <p className="mt-1">
                  {new Date(carWash.created_at).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
          {/* Действия */}
          <div className="flex justify-end mb:flex-col gap-2 mb-3">
            <DeactivateDialog carWash={carWash} handleToggleActive={handleToggleActive} />
            <Button
              size="lg"
              className="mb:w-full"
              onClick={isEditing ? handleSave : handleEdit}
            >
              {isEditing ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Сохранить
                </>
              ) : (
                <>
                  <Settings className="mr-2 h-4 w-4" />
                  Настроить автомойку
                </>
              )}
            </Button>
          </div>

          {/* Список филиалов */}
          <div className="bg-background border rounded-lg p-6 mb:p-4">
            <div className="flex items-center justify-between mb-3">
                <div className="text-xl font-semibold mb:text-lg">Филиалы</div>
                <CreateBranchDialog />
            </div>
            
            {branches.length === 0 ? (
              <p className="text-muted-foreground">Филиалы отсутствуют</p>
            ) : (
              <div>
                {branches.map((branch, index) => (
                  <div key={branch.id} onClick={() => navigate(`/conf/branch/${branch.id}`)}>
                    <div className="px-0 py-3 mb:p-2 hover:bg-muted/50 transition flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-8 w-8 text-black" strokeWidth={1.5} />
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 mb:text-sm">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            {branch.rating}
                          </div>
                          <div>
                            <p className="font-semibold">{branch.address}</p>
                            <p className="text-sm text-muted-foreground">{branch.name}</p>
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={25} strokeWidth={1.3} />
                    </div>
                    {index < branches.length - 1 && <Separator className="my-2 mb:my-1" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default ConfCarwash;