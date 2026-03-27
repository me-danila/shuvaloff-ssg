import DesktopHeroGrid from "@/components/ui/grids/DesktopHeroGrid";
import { FadeIn } from "@/components/ui/Motion";
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
                <FadeIn duration={0.7}>
                    <h1>{title}</h1>
                </FadeIn>
                <FadeIn delay={0.1} duration={0.7}>
                    <p className="leading-5 mt-2 xl:w-2xl xl:mx-auto">
                        {subtitle}
                    </p>
                </FadeIn>
            </div>
            <DesktopHeroGrid images={images} />
            <SliderMobile images={images} />
        </section>
    );
}
