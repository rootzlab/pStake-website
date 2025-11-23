"use client";

import useGsapImmediate from "@/app/_hooks/useGsapImmediate";
import { useLocale } from 'next-intl';
import { communityContent } from '@/app/content/community';
import type { Locale } from '@/i18n';

const Header = () => {

    const heroRef = useGsapImmediate({ delay: 0.2, duration: 0.8, disableY: true });
    const locale = useLocale() as Locale;
    const content = communityContent[locale] ?? communityContent.en;

    return (
        <div ref={heroRef} className="opacity-0 mt-[-20px] h-[634px] bg-[#160704] bg-[url(/img/bg5.jpg)] bg-cover Header mobile:h-[500px] mobile:bg-size-[auto_500px] mobile:bg-center rounded-[12px]">
            <div className="pt-[170px] mobile:pt-[130px]">
                <div className="w-max mx-auto flex flex-col mobile:w-full mobile:px-[16px]">
                    <div className="flex items-center mobile:justify-center">
                        <div className="flex items-center gap-[43px] mobile:gap-[24px] [leading-trim:both] [text-edge:cap] text-[96px] mobile:text-[42px] font-medium leading-[114%] tracking-[-1.92px] bg-gradient-to-br from-[#F7F7F7] to-[#B8B8B8] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
                            <span>{content.header.titleParts[0]}</span>
                            <span className="[leading-trim:both] [text-edge:cap] [text-shadow:0_0_12px_rgba(254,61,17,0.25),_0_0_36px_rgba(254,61,17,0.25),_0_0_96px_#FE3D11] text-[96px] font-medium leading-[114%] tracking-[-1.92px] bg-gradient-to-br from-[#FE3D11] to-[#C42E0B] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] mobile:text-[42px]">{content.header.separator} </span>
                            <span>{content.header.titleParts[1]}</span>
                        </div>
                    </div>
                    <div className="w-[420px] mt-[51px] text-[17px] text-[#F7F7F7] leading-[1.5em] tracking-[-0.38px] mobile:w-full mobile:mt-[32px] mobile:text-[15px] mobile:text-center">
                        {content.header.description[0]}
                        <br />
                        {content.header.description[1]}
                        <br />
                        {content.header.description[2]}
                    </div>
                    <div className="self-end translate-x-[18px] translate-y-[-12px] mobile:self-center mobile:translate-x-0 mobile:translate-y-0 mobile:mt-[24px]">
                        <div className="  text-[18px] tracking-[-0.36px] leading-[1.5em]  w-[350px] text-[#F7F7F7] mobile:w-full mobile:text-[15px] mobile:text-center">
                            {content.header.tokenNote}
                        </div>
                        <div className="flex gap-x-[15px] items-center mt-[40px] mobile:justify-center mobile:mt-[32px] mobile:gap-x-[12px]">
                            <a href="https://coinmarketcap.com/currencies/pstake-finance" target="_blank" rel="noopener noreferrer" className="pt-[3px] text-[#F7F7F7] text-[15px] font-medium cursor-pointer flex items-center justify-center w-[137px] h-[41px] bg-[#FE3D11] rounded-[9px] border-solid border-[1px] border-[rgba(247,247,247,0.35)] [box-shadow:0_16px_5px_0_rgba(168,34,0,0.00),_0_10px_4px_0_rgba(168,34,0,0.03),_0_6px_4px_0_rgba(168,34,0,0.10),0_3px_3px_0_rgba(168,34,0,0.17),0_1px_1px_0_rgba(168,34,0,0.20)] transition-all duration-200 hover:scale-[1.02] hover:border-[rgba(247,247,247,0.45)] hover:[box-shadow:0_10px_12px_0_rgba(254,61,17,0.25)] hover:bg-[#FE5126] hover:opacity-90 mobile:text-[14px] mobile:w-[120px] mobile:h-[38px]">
                                {content.header.primaryCta}
                            </a>
                            <svg className="size-[4.5px] shrink-0" xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                                <circle cx="2.25" cy="2.25" r="2.25" fill="#FFB4A3" />
                            </svg>
                            <a href={content.header.secondaryHref} target="_blank" className="pt-[3px] text-[#F7F7F7] text-[15px] font-medium cursor-pointer flex items-center justify-center w-[121px] h-[41px] bg-[rgba(247,247,247,0.03)] rounded-[9px] border-[rgba(255,180,163,0.48)] border-solid border-[1px] [box-shadow:0_-0.1px_0.4px_0_#FFF_inset,_0_-0.6px_0.9px_0_rgba(0,0,0,0.12)_inset,_0_0.6px_1.2px_0_rgba(0,0,0,0.12)] transition-all duration-200 hover:bg-[rgba(247,247,247,0.08)] hover:border-[rgba(255,180,163,0.70)] hover:scale-[1.02] hover:opacity-90 mobile:text-[14px] mobile:w-[110px] mobile:h-[38px]">
                                {content.header.secondaryCta}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Header
