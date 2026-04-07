import type { Metadata } from "next";
import ContactsSection from "@/components/sections/ContactsSection";
import Button from "@/components/ui/Button";
import CardServiceBig from "@/components/ui/CardServiceBig";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { AllServices } from "@/data/ServicesData";

export const metadata: Metadata = {
    title: "Услуги отеля — ACADEMIA Особняк Шувалова",
    description:
        "Дополнительные услуги ACADEMIA Особняк Шувалова: трансфер, SPA, special-сервисы и персональные опции отдыха",
};

export default function Services() {
    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-4 m-6 xl:max-w-6xl xl:mx-auto">
                <FadeUp className="xl:text-center">
                    <h1>Мир ACADEMIA</h1>
                </FadeUp>
                <FadeUp
                    delay={0.1}
                    className="-mt-2 font-alistair text-2xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:text-center xl:-mt-4"
                >
                    Больше, чем сервис
                </FadeUp>
                <FadeUp delay={0.2} className="mt-2 xl:mt-4">
                    <p>
                        Чтобы сделать ваш отдых еще приятнее и&nbsp;удобнее,
                        добавьте нужные вам детали и&nbsp;нюансы
                        к&nbsp;классическому варианту сервиса. Выберите заранее
                        комфортный трансфер на&nbsp;автомобиле бизнес-класса,
                        ранний заезд или поздний выезд, букет любимых цветов
                        в&nbsp;номер и&nbsp;подходящую именно вам подушку
                        из&nbsp;меню. Дополните вашу программу отдыха сеансом
                        расслабления в&nbsp;СПА и&nbsp;неторопливым «Графским
                        завтраком», закажите изысканное украшение номера
                        по&nbsp;особому поводу или романтический ужин
                        в&nbsp;приватной атмосфере.
                        <br />
                        <br />
                        Мы&nbsp;создаем комфортную обстановку для семейного
                        отдыха с&nbsp;детьми, включая такие важные мелочи, как
                        детские халаты и&nbsp;тапочки. И&nbsp;мы&nbsp;всегда
                        рады принять вас с&nbsp;вашим питомцем, для которого
                        мы&nbsp;предусмотрели все необходимое: от&nbsp;миски
                        и&nbsp;лежанки до&nbsp;маршрутов прогулок поблизости.
                    </p>
                </FadeUp>
            </section>
            <StaggerContainer className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-6 xl:max-w-6xl xl:mx-auto">
                {AllServices.slice(0, 4).map((service) => (
                    <StaggerItem key={service.slug} className="flex">
                        <CardServiceBig
                            title={service.title}
                            imgUrl={service.imgUrl}
                            slug={service.slug}
                        />
                    </StaggerItem>
                ))}
            </StaggerContainer>
            <FadeUp className="mx-auto">
                <Button
                    href="/services/all/"
                    variant="primary"
                    className="max-w-fit"
                >
                    ВСЕ УСЛУГИ
                </Button>
            </FadeUp>
            <Divider />
            <ContactsSection />
        </main>
    );
}
