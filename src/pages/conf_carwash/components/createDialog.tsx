import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from "@/components/ui";

const CreateBranchDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">+ Добавить</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Добавить филиал</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="address" className="text-sm font-medium">Адрес</Label>
                        <Input
                            id="address"
                            name="address"
                            placeholder="ул. Мира 32"
                            className="h-10"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone_number" className="text-sm font-medium">Телефон</Label>
                        <Input
                            id="phone_number"
                            name="phone_number"
                            placeholder="+79991234567"
                            className="h-10"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">Время работы</Label>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                id="opening_time"
                                name="opening_time"
                                placeholder="08:00"
                                className="h-10"
                            />
                            <Input
                                id="closing_time"
                                name="closing_time"
                                placeholder="20:00"
                                className="h-10"
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="carwash" className="text-sm font-medium">ID автомойки</Label>
                        <Input
                            id="carwash"
                            name="carwash"
                            placeholder="ID автомойки"
                            className="h-10"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-sm font-medium">Типы кузова</Label>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" className="h-10">Седан</Button>
                            <Button variant="outline" className="h-10">Внедорожник</Button>
                            <Button variant="outline" className="h-10">Хэтчбек</Button>
                            <Button variant="outline" className="h-10">Универсал</Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button>Добавить</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreateBranchDialog;