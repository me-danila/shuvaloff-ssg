import { BellIcon, ListHeartIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import BookingForm from "@/components/sections/BookingForm";
import ContactsSection from "@/components/sections/ContactsSection";
import type { HeroImage } from "@/components/sections/HeroWithPictures";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import DesktopHeroGrid from "@/components/ui/grids/DesktopHeroGrid";
import SliderMobile from "@/components/ui/slider/SliderMobile";

export const metadata: Metadata = {
    title: "Консьерж-сервис — ACADEMIA Особняк Шувалова",
    description:
        "Персональный консьерж-сервис ACADEMIA Особняк Шувалова: организация отдыха, событий, трансфера и индивидуальных запросов",
};

const heroImages: [HeroImage, HeroImage, HeroImage, HeroImage] = [
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/da32b8b9bc44baddd8e44d8e60ddb347184d0876.jpg",
        alt: "Консьерж-служба",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/2-2.jpg",
        alt: "Романтический вечер",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/4-1.jpg",
        alt: "Академишка",
    },
    {
        src: "https://academia.spb.ru/wp-content/uploads/2026/03/3-2.jpg",
        alt: "АКАДЕМИА Туризма",
    },
];

export default function Concierge() {
    return (
        <main className="flex flex-col gap-4 xl:gap-10">
            <section className="flex flex-col gap-4 xl:gap-8 my-6 px-6 xl:text-center w-full xl:max-w-6xl xl:mx-auto">
                <h1>Консьерж сервис</h1>
                <p className="mx-auto xl:max-w-4xl">
                    Настоящее гостеприимство всегда больше, чем безупречный
                    сервис. Это искреннее желание сделать лучшее
                    из&nbsp;возможного, внимательность к&nbsp;деталям
                    и&nbsp;чуткость к&nbsp;вашим пожеланиям.
                    <br />
                    <br />
                    Консьерж-служба ACADEMIA Особняк SHUVALOFF всегда готова
                    помочь с&nbsp;решением любых, даже самых неожиданных, задач.
                </p>
                <SliderMobile images={heroImages} />
                <DesktopHeroGrid images={heroImages} />
            </section>
            <BookingForm />
            <section className="px-6 w-full xl:max-w-6xl xl:mx-auto">
                <p>
                    Мы&nbsp;подготовим полноценный сценарий отдыха под ваш
                    запрос, удобно соберем, забронируем и&nbsp;организуем
                    персональную программу отдыха: от&nbsp;завтрака в&nbsp;номер
                    с&nbsp;букетом свежих цветов до&nbsp;эксклюзивных экскурсий
                    с&nbsp;лучшими гидами и&nbsp;прогулок на&nbsp;яхте
                    по&nbsp;Финскому заливу или романтичного вечера
                    с&nbsp;фуршетом и&nbsp;игристым на&nbsp;роскошном катере.
                    <br />
                    <br />
                    Мы&nbsp;поможем решить любую задачу: от&nbsp;прогулки
                    с&nbsp;вашим питомцем и&nbsp;записи в&nbsp;ACADEMIA SPA
                    до&nbsp;поиска билетов в&nbsp;театр и&nbsp;особого украшения
                    номера для дорогого вам человека. Мы&nbsp;предоставим вам
                    VIP-трансфер и&nbsp;поможем организовать любое
                    мероприятие&nbsp;&mdash; от&nbsp;фотосессии и&nbsp;девичника
                    до&nbsp;изысканного банкета в&nbsp;ACADEMIA BAR SHUVALOFF.
                </p>
            </section>
            <section className="mx-6 xl:max-w-6xl xl:mx-auto xl:w-full">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <div className="bg-brand-blue-100 rounded-md p-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-4 xl:flex-row grow">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3 xl:flex-row xl:items-start">
                                    <BellIcon
                                        size={28}
                                        weight="fill"
                                        color="var(--color-brand-blue)"
                                        className="shrink-0 xl:mt-1"
                                    />
                                    <p className="xl:max-w-50">
                                        Доверьте консьерж‑менеджеру рутинные
                                        задачи:
                                    </p>
                                </div>
                                <Button
                                    href="https://t.me/+79668342743"
                                    target="_blank"
                                    variant="primary"
                                    className="max-xl:hidden xl:flex xl:mt-auto xl:self-start"
                                >
                                    Заказать
                                </Button>
                            </div>
                            <ul className="space-y-1 text-sm xl:text-base">
                                {[
                                    "Погулять с собакой",
                                    "Покормить домашнего питомца",
                                    "Заполнить холодильник продуктами",
                                    "Отнести вещи в химчистку",
                                    "Записать в салон красоты",
                                    "Записать на массаж в ACADEMIA SPA",
                                    "Купить абонемент в спортивный зал",
                                    "Заказать представительский трансфер",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="mt-2 w-1 h-1 rounded-full bg-brand-blue" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button
                            href="https://t.me/+79668342743"
                            target="_blank"
                            variant="primary"
                            className="xl:hidden"
                        >
                            Заказать
                        </Button>
                    </div>

                    <div className="bg-brand-blue-100 rounded-md p-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-4 xl:flex-row grow">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3 xl:flex-row xl:items-start">
                                    <ListHeartIcon
                                        size={28}
                                        weight="fill"
                                        color="var(--color-brand-blue)"
                                        className="shrink-0 xl:mt-1"
                                    />
                                    <p className="xl:max-w-50">
                                        Позвольте помочь вам со сценарием
                                        отдыха:
                                    </p>
                                </div>
                                <Button
                                    href="https://t.me/+79668342743"
                                    target="_blank"
                                    variant="primary"
                                    className="max-xl:hidden xl:flex xl:mt-auto xl:self-start"
                                >
                                    Заказать
                                </Button>
                            </div>
                            <ul className="space-y-1 text-sm xl:text-base">
                                {[
                                    "Забронировать ресторан",
                                    "Найти билеты на спектакль или концерт",
                                    "Вызвать сомелье",
                                    "Организовать девичник",
                                    "Украсить номер к празднику",
                                    "Заказать букет любимых цветов",
                                    "Организовать уникальную экскурсию",
                                    "Предоставить гайд «Топ событий на выходные»",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="mt-2 w-1 h-1 rounded-full bg-brand-blue" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button
                            href="https://t.me/+79668342743"
                            target="_blank"
                            variant="primary"
                            className="xl:hidden"
                        >
                            Заказать
                        </Button>
                    </div>
                </div>
            </section>
            <section className="max-xl:px-6 my-4 w-full xl:text-center xl:max-w-4xl xl:mx-auto">
                <h3 className="font-baskerville uppercase text-xl xl:text-2xl">
                    Специально для гостей особняка
                </h3>
                <p>
                    мы создали тематические гайды по лучшим маршрутам рядом с
                    особняком:
                </p>
                <div className="flex flex-col gap-3 mt-5 xl:flex-row">
                    <Button
                        href="https://yandex.ru/maps/-/CHVxyC~g"
                        target="_blank"
                        variant="primary-outline"
                        className="grow"
                        size="sm"
                        uppercase={false}
                    >
                        Для пробежек
                    </Button>
                    <Button
                        href="https://static.academia.spb.ru/files/Маршруты_прогулки_Шувалов.pdf"
                        target="_blank"
                        variant="primary-outline"
                        className="grow"
                        size="sm"
                        uppercase={false}
                    >
                        Для красивых прогулок поблизости
                    </Button>
                    <Button
                        href="https://static.academia.spb.ru/files/pet-route-shuvaloff.pdf"
                        target="_blank"
                        variant="primary-outline"
                        className="grow"
                        size="sm"
                        uppercase={false}
                    >
                        Для прогулок с питомцем
                    </Button>
                </div>
            </section>
            <Divider />
            <ContactsSection />
        </main>
    );
}
