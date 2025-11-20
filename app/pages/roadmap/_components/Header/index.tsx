"use client";

import { useLocale } from 'next-intl';
import useGsapImmediate from "@/app/_hooks/useGsapImmediate";
import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import { roadmapContent } from '@/app/content/roadmap';
import type { Locale } from '@/i18n';

const Header = () => {
    const heroRef = useGsapImmediate({ delay: 0.2, duration: 0.8, disableY: true });
    const ctaRef = useGsapEntrance({ delay: 0.15, start: "top 85%" });
    const locale = useLocale() as Locale;
    const { hero } = roadmapContent[locale] ?? roadmapContent.en;

    return (
        <div
            ref={heroRef}
            className="opacity-0 h-[600px] mt-[98px] mobile:h-[420px] mobile:mt-[20px] relative"
        >
            {/* Background layer with opacity and gradient fade */}
            <div
                className="absolute inset-0 bg-[url(/img/bg11.svg)] bg-size-[1515px_802px] mobile:bg-size-[auto_600px] bg-center opacity-40"
                style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
                }}
            />

            {/* Content layer */}
            <div className="relative pt-[118px] mobile:pt-[120px]">
                <div className="h-[155px] flex items-center justify-center mobile:h-auto">
                    <div className="text-[84px] text-center text-[#FF4C33] font-medium tracking-[-1.52px] leading-[95.76px] mobile:text-[36px] mobile:leading-[44px] mobile:tracking-[-0.6px]">

                        {hero.firstLine}<br/>
                        {hero.secondLinePrefix}
                        &nbsp;
                        <img className="inline-block! pointer-events-none size-[68px] mobile:size-[34px]" src="/img/icon38.svg" alt={hero.iconAlt} style={{ imageRendering: 'auto', WebkitFontSmoothing: 'antialiased', backfaceVisibility: 'hidden' }}/>
                        &nbsp;{hero.secondLineSuffix}

                    </div>
                </div>
                <div ref={ctaRef} className="text-[#FF4C33] text-[15px] w-max px-[21px] border border-solid border-[#FF4C33] rounded-[9px] font-medium h-[42px] flex items-center justify-center text-center mx-auto leading-[30px] mt-[88px] tracking-[-0.3px] mobile:text-[13px] mobile:h-[36px] mobile:px-[16px] mobile:rounded-[8px] mobile:mt-[40px] pt-[3px] bg-[#F7F7F7]">
                    {hero.ctaLabel}
                </div>
            </div>
        </div>
    )

}


export default Header
