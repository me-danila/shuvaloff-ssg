import ContactsSection from "@/components/sections/ContactsSection";
import Button from "@/components/ui/Button";
import CardServiceBig from "@/components/ui/CardServiceBig";
import Divider from "@/components/ui/Divider";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { AllServices } from "@/data/ServicesData";
import { type Locale, localizeHref } from "@/lib/i18n/routing";

type ServicesCopy = {
    title: string;
    subtitle: string;
    description: React.ReactNode;
    allServicesButton: string;
};

const copyByLocale: Record<Locale, ServicesCopy> = {
    ru: {
        title: "Мир ACADEMIA",
        subtitle: "Больше, чем сервис",
        description: (
            <>
                Чтобы сделать ваш отдых еще приятнее и&nbsp;удобнее, добавьте
                нужные вам детали и&nbsp;нюансы к&nbsp;классическому варианту
                сервиса. Выберите заранее комфортный трансфер на&nbsp;автомобиле
                бизнес-класса, ранний заезд или поздний выезд, букет любимых
                цветов в&nbsp;номер и&nbsp;подходящую именно вам подушку
                из&nbsp;меню. Дополните вашу программу отдыха сеансом
                расслабления в&nbsp;СПА и&nbsp;неторопливым «Графским
                завтраком», закажите изысканное украшение номера по&nbsp;особому
                поводу или романтический ужин в&nbsp;приватной атмосфере.
                <br />
                <br />
                Мы&nbsp;создаем комфортную обстановку для семейного отдыха
                с&nbsp;детьми, включая такие важные мелочи, как детские халаты
                и&nbsp;тапочки. И&nbsp;мы&nbsp;всегда рады принять вас
                с&nbsp;вашим питомцем, для которого мы&nbsp;предусмотрели все
                необходимое: от&nbsp;миски и&nbsp;лежанки до&nbsp;маршрутов
                прогулок поблизости.
            </>
        ),
        allServicesButton: "ВСЕ УСЛУГИ",
    },
    en: {
        title: "The ACADEMIA World",
        subtitle: "More than Service",
        description: (
            <>
                To make your stay even more pleasant and convenient, add the
                details and nuances you need to the classic service option.
                Choose in advance a comfortable transfer in a business-class
                car, early check-in or late check-out, a bouquet of your
                favorite flowers in your room, and the pillow from the menu that
                suits you best. Complement your relaxation program with a
                session in the SPA and a leisurely "Count's Breakfast," order an
                exquisite room decoration for a special occasion, or a romantic
                dinner in a private atmosphere.
                <br />
                <br />
                We create a comfortable environment for family vacations with
                children, including such important little things as children's
                robes and slippers. And we are always happy to welcome you with
                your pet, for whom we have provided everything necessary: from a
                bowl and a bed to nearby walking routes.
            </>
        ),
        allServicesButton: "ALL SERVICES",
    },
};

export default function ServicesPage({ locale }: { locale: Locale }) {
    const copy = copyByLocale[locale];
    const services = AllServices[locale];

    return (
        <main className="flex flex-col gap-8">
            <section className="flex flex-col gap-4 m-6 xl:max-w-6xl xl:mx-auto">
                <FadeUp className="xl:text-center">
                    <h1>{copy.title}</h1>
                </FadeUp>
                <FadeUp
                    delay={0.1}
                    className="-mt-2 font-alistair text-2xl xl:text-[40px] xl:max-w-4xl xl:mx-auto xl:text-center xl:-mt-4"
                >
                    {copy.subtitle}
                </FadeUp>
                <FadeUp delay={0.2} className="mt-2 xl:mt-4">
                    <p>{copy.description}</p>
                </FadeUp>
            </section>
            <StaggerContainer className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-6 xl:max-w-6xl xl:mx-auto">
                {services.slice(0, 4).map((service) => (
                    <StaggerItem
                        key={service.slug || service.externalLink}
                        className="flex"
                    >
                        <CardServiceBig
                            title={service.title}
                            imgUrl={service.imgUrl}
                            slug={service.slug}
                            externalLink={service.externalLink}
                        />
                    </StaggerItem>
                ))}
            </StaggerContainer>
            <FadeUp className="mx-auto">
                <Button
                    href={localizeHref("/services/all/", locale)}
                    variant="primary"
                    className="max-w-fit"
                >
                    {copy.allServicesButton}
                </Button>
            </FadeUp>
            <Divider />
            <ContactsSection />
        </main>
    );
}
