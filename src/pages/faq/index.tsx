import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";
import Header from "@/shared/header";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FAQ = () => {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');
    const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (q === 'partner') {
            const element = document.getElementById('partner');
            element?.scrollIntoView({ behavior: 'smooth' });
            setOpenAccordion('partner');
        }
    }, [q]);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h1 className="text-3xl font-bold mb-8">Часто задаваемые вопросы</h1>
                    
                    <Accordion 
                        type="single" 
                        collapsible 
                        className="w-full"
                        value={openAccordion}
                        onValueChange={setOpenAccordion}
                    >
                        <AccordionItem value="about">
                            <AccordionTrigger>О нас</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>Мы - современный агрегатор автомоек в Екатеринбурге, который объединяет лучшие автомойки города в единую систему. Наша платформа предоставляет удобный способ записи на мойку автомобиля, позволяя клиентам выбирать подходящее время и место.</p>
                                    <p>Основные преимущества нашего сервиса:</p>
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li>Удобная система онлайн-записи 24/7</li>
                                        <li>Большой выбор автомоек по всему городу</li>
                                        <li>Прозрачные цены и отсутствие скрытых платежей</li>
                                        <li>Возможность выбора конкретного времени</li>
                                        <li>Мгновенное подтверждение записи</li>
                                        <li>История всех посещений</li>
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="partner" id="partner">
                            <AccordionTrigger>Как стать партнером?</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>Стать партнером нашей платформы очень просто. Следуйте пошаговой инструкции:</p>
                                    <ol className="list-decimal pl-4 space-y-4">
                                        <li className="space-y-2">
                                            <p className="font-semibold text-foreground">Регистрация бизнес-аккаунта</p>
                                            <p>Нажмите кнопку "Регистрация" в правом верхнем углу и выберите тип аккаунта "Бизнес". Заполните все необходимые данные о вашей компании.</p>
                                        </li>
                                        <li className="space-y-2">
                                            <p className="font-semibold text-foreground">Добавление предприятия</p>
                                            <p>После регистрации перейдите в раздел "Мои предприятия" и нажмите "Добавить предприятие". Укажите название, адрес и контактные данные вашей автомойки.</p>
                                        </li>
                                        <li className="space-y-2">
                                            <p className="font-semibold text-foreground">Настройка услуг</p>
                                            <p>В карточке предприятия добавьте все доступные услуги с указанием цены и примерного времени выполнения. Вы можете создать несколько категорий услуг.</p>
                                        </li>
                                        <li className="space-y-2">
                                            <p className="font-semibold text-foreground">Настройка расписания</p>
                                            <p>Установите рабочие часы и количество постов для мойки. Вы можете настроить разные графики работы для разных дней недели.</p>
                                        </li>
                                        <li className="space-y-2">
                                            <p className="font-semibold text-foreground">Подтверждение данных</p>
                                            <p>После заполнения всех данных нажмите "Отправить на проверку". Наша команда проверит информацию в течение 24 часов.</p>
                                        </li>
                                        <li className="space-y-2">
                                            <p className="font-semibold text-foreground">Начало работы</p>
                                            <p>После подтверждения данных вы получите доступ к панели управления, где сможете принимать заказы и управлять своим бизнесом.</p>
                                        </li>
                                    </ol>
                                    <p className="mt-4">Если у вас возникли вопросы в процессе регистрации, наша служба поддержки готова помочь вам 24/7.</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="support">
                            <AccordionTrigger>Поддержка</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>Наша команда поддержки всегда готова помочь вам с любыми вопросами. Вы можете связаться с нами следующими способами:</p>
                                    
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="font-semibold text-foreground">Телефон поддержки</h3>
                                            <p>+7 (999) 123-45-67</p>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="font-semibold text-foreground">Электронная почта</h3>
                                            <p>moiekb@support.ru</p>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="font-semibold text-foreground">Telegram</h3>
                                            <p>@moiekb_support</p>
                                        </div>
                                    </div>

                                    <p className="mt-4">Для быстрого решения вопроса вы также можете воспользоваться разделом "Помощь" в вашем личном кабинете, где собраны ответы на часто задаваемые вопросы.</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default FAQ;