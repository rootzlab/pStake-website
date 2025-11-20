"use client";

import useGsapImmediate from "@/app/_hooks/useGsapImmediate";
import { useLocale } from 'next-intl';
import { researchContent } from '@/app/content/research';
import type { Locale } from '@/i18n';

const Header = () => {
    const heroRef = useGsapImmediate({ delay: 0.2, duration: 0.8, disableY: true });
    const locale = useLocale() as Locale;
    const { header } = researchContent[locale] ?? researchContent.en;

    return (
        <div ref={heroRef} className="opacity-0 mt-[-20px] h-[632px] bg-[#160704] bg-[url(/img/bg7.jpg)] bg-cover mobile:h-[420px] mobile:bg-size-[auto_600px] mobile:bg-center rounded-[12px]">
            <div className="pt-[195px] mobile:pt-[140px]">
                <div className="h-[155px] flex items-center justify-center mobile:h-auto">
                    <div className="text-[84px] text-center text-[#F7F7F7] font-medium tracking-[-2.52px] leading-[95.76px] mobile:text-[36px] mobile:tracking-[-0.6px] mobile:leading-[44px]">
                        {header.titleLines[0]}<br/>
                        {header.titleLines[1]} 
                        &nbsp;
                        <img className="inline-block! size-[68px] mobile:size-[28px]" src="/img/icon17.svg" alt="research icon"/>    
                        &nbsp;{header.titleLines[2]}
                    </div>
                </div>
                <div className="text-[#D7F8EE] text-[20px] w-[456px]  text-center mx-auto leading-[30px] mt-[77px] tracking-[-0.4px] mobile:text-[14px] mobile:leading-[20px] mobile:mt-[40px] mobile:w-[300px]">
                    {header.subtitle}
                </div>
            </div>
        </div>
    )

}


export default Header
