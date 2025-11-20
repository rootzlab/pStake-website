"use client";

import useGsapImmediate from "@/app/_hooks/useGsapImmediate";
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { homeContent } from '@/app/content/home';
import type { Locale } from '@/i18n';

const Header = () => {
    const locale = useLocale() as Locale;
    const content = homeContent[locale] ?? homeContent.en;
    const { hero } = content;
    const heroRef = useGsapImmediate({ delay: 0.2, duration: 0.8, disableY: true });

    return (
        <div ref={heroRef} className="opacity-0 mt-[-20px] h-[670px] bg-[#160704] bg-[url(/img/bg1.jpg)] bg-cover mobile:h-[420px] mobile:bg-size-[auto_600px] mobile:bg-position-[center_-50px] rounded-[12px]">
            <div className="pt-[184px] mobile:pt-[135px]">
                <div className="text-[60px] text-center text-[#F7F7F7] font-medium tracking-[-1.7px] leading-[calc(130px/2)] mobile:text-[32px] mobile:tracking-[-0.6px] mobile:leading-[38px]">
                    {hero.titleLines.map((line, index) => (
                        <span key={`${line}-${index}`} className="block">
                            {line}
                        </span>
                    ))}
                </div>
                <div className="mt-[40px] text-center text-[#FFB4A3] [leading-trim:both] [text-edge:cap] ordinal slashed-zero [font-feature-settings:'salt'_on] text-[20px] font-normal leading-[150%] tracking-[-0.4px] mobile:text-[14px] mobile:leading-[20px] mobile:mt-[20px]">
                    <span className="text-[#FFB4A3] font-semibold">{hero.descriptionHighlight}</span>&nbsp;
                    {hero.description[0]}
                    <br />
                    {hero.description[1]}
                </div>

                <div className="flex gap-x-[15px] items-center justify-center mt-[55px] mobile:gap-x-[12px] mobile:mt-[40px]">
                    <Link href={hero.primaryCta.href} className="pt-[3px] text-[#160704] text-[15px] font-medium cursor-pointer flex items-center justify-center w-[114px] h-[41px] bg-[#F7F7F7] rounded-[9px] border-[rgba(247,247,247,0.48)] border-solid border [box-shadow:0_-0.1px_0.4px_0_#FFF_inset,0_-0.6px_0.9px_0_rgba(0,0,0,0.12)_inset,0_0.6px_1.2px_0_rgba(0,0,0,0.12)] mobile:w-[100px] mobile:h-[36px] mobile:text-[13px] leading-[1] mobile:leading-[1] transition-all duration-200 hover:bg-white hover:border-[rgba(247,247,247,0.80)] hover:scale-[1.02]">
                        {hero.primaryCta.label}
                    </Link>
                    <svg className="size-[4.5px] shrink-0" xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                        <circle cx="2.25" cy="2.25" r="2.25" fill="#FFB4A3" />
                    </svg>
                    <Link href={hero.secondaryCta.href} className="pt-[3px] text-[#F7F7F7] text-[15px] font-medium cursor-pointer flex items-center justify-center w-[114px] h-[41px] bg-[rgba(255,180,163,0.15)] rounded-[9px] border-[rgba(255,180,163,0.48)] border-solid border [box-shadow:0_-0.1px_0.4px_0_#FFF_inset,0_-0.6px_0.9px_0_rgba(0,0,0,0.12)_inset,0_0.6px_1.2px_0_rgba(0,0,0,0.12)] mobile:w-[100px] mobile:h-[36px] mobile:text-[13px] leading-[1] mobile:leading-[1] transition-all duration-200 hover:bg-[rgba(255,180,163,0.24)] hover:border-[rgba(255,180,163,0.70)] hover:scale-[1.02] hover:text-white">
                        {hero.secondaryCta.label}
                    </Link>
                </div>
            </div>
        </div>
    )

}


export default Header
