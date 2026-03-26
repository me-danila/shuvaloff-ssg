import DesktopHeroGrid from "@/components/ui/grids/DesktopHeroGrid";
import SliderMobile from "@/components/ui/slider/SliderMobile";

export type HeroImage = {
    src: string;
    alt: string;
};

type HeroWithPicturesProps = {
    title: string;
    subtitle: string;
    images: [HeroImage, HeroImage, HeroImage, HeroImage, HeroImage];
};

export default function HeroWithPictures({
    title,
    subtitle,
    images,
}: HeroWithPicturesProps) {
    return (
        <section className="xl:w-full xl:max-w-6xl xl:mx-auto xl:my-4">
            <div className="text-center m-4 xl:mb-8">
                <h1>{title}</h1>
                <p className="leading-5 mt-2 xl:w-2xl xl:mx-auto">{subtitle}</p>
            </div>
            <DesktopHeroGrid images={images} />
            <SliderMobile images={images} />
        </section>
    );
}
