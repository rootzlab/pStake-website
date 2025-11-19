"use client";

import useGsapImmediate from "@/app/_hooks/useGsapImmediate";
import { useLocale } from 'next-intl';
import { blogContent } from '@/app/content/blog';
import type { Locale } from '@/i18n';

const Header = () => {
    const heroRef = useGsapImmediate({ delay: 0.2, duration: 0.8, disableY: true });
    const ctaRef = useGsapImmediate({ delay: 0.2, duration: 0.8 });
    const locale = useLocale() as Locale;
    const { header } = blogContent[locale] ?? blogContent.en;

    return (
        <div ref={heroRef} className="opacity-0 h-[559px] mt-[78px] mobile:h-[420px] mobile:mt-[20px] relative">
            {/* Background layer with opacity and gradient fade */}
            <div
                className="absolute inset-0 bg-[url(/img/bg10.svg)] bg-size-[1515px_802px] mobile:bg-size-[auto_600px] bg-center opacity-60"
                style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
                }}
            />

            {/* Content layer */}
            <div className="relative pt-[140px] mobile:pt-[140px]">
                <div className="h-[155px] flex items-center justify-center">
                    <div className="text-[84px] text-center text-[#43AA8B] font-medium tracking-[-1.9px] leading-[95.76px] mobile:text-[36px] mobile:leading-[44px] mobile:tracking-[-0.6px]">
                        {header.titleLines[0]}<br/>
                        {header.titleLines[1]}&nbsp;
                        <img className=" mobile:size-[34px]  translate-y-[-9%] inline-block! size-[68px] pointer-events-none" src="/img/icon37.svg" alt={header.highlightIconAlt} style={{ imageRendering: 'auto', WebkitFontSmoothing: 'antialiased', backfaceVisibility: 'hidden' }}/>
                        &nbsp;{header.titleLines[2]}
                    </div>
                </div>
                <div ref={ctaRef} className="text-[#47AC8E] text-[15px] w-max px-[21px] border border-solid border-[#47AC8E] rounded-[9px] font-medium h-[42px] flex items-center justify-center text-center mx-auto leading-[30px] mt-[88px] tracking-[-0.3px] mobile:text-[13px] mobile:h-[36px] mobile:px-[16px] mobile:rounded-[8px] mobile:mt-[40px] pt-[3px] bg-[#F7F7F7]">
                    {header.ctaLabel}
                </div>
            </div>
        </div>
    )

}


export default Header
