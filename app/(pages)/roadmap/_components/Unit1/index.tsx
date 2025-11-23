"use client";

import { useLocale } from 'next-intl';
import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import { socialHubContent, socialLinks } from '@/app/content/shared';
import type { Locale } from '@/i18n';

const Unit2 = () => {
    const sectionRef = useGsapEntrance();
    const cardsRef = useGsapEntrance({ delay: 0.15, start: "top 85%" });
    const locale = useLocale() as Locale;
    const copy = socialHubContent[locale] ?? socialHubContent.en;

    return (
        <div ref={sectionRef} className="pt-[100px] mb-[155px] border-t border-solid border-[#DCDAD9] mobile:pt-[40px] mobile:mb-[40px]">
            <div className="flex justify-between pl-[144px] pr-[379px] items-end mobile:flex-col mobile:gap-y-[12px] mobile:pl-0 mobile:pr-0 mobile:items-start">
                <div className="flex items-center mobile:w-full">
                    <div className="w-[450px] text-[48px] tracking-[-0.72px] leading-[54.72px] font-medium mobile:w-full mobile:text-[28px] mobile:leading-[34px] mobile:tracking-[-0.28px]">
                        {copy.heading}<br/>
                        <span className="text-[#FF4C33]">{copy.highlight}</span>
                    </div>
                </div>
                <div className="w-[263px] pt-[5px] mobile:w-full mobile:pt-0">
                    <div className="text-[18px] leading-[25.92px] mb-[5px] opacity-60 tracking-[-0.32px] mobile:text-[14px] mobile:leading-[20px] mobile:tracking-[-0.24px]">
                        {copy.description}
                    </div>
                </div>
            </div>
            <div ref={cardsRef} className="relative mt-[59px] w-[calc(376*3px+3px)] mx-auto flex flex-wrap mobile:mt-[24px] mobile:w-full mobile:flex-col">
                <div className="absolute h-full w-[calc(100%-2px)] -left-px top-0 border border-[#DCDAD9] border-solid rounded-[12px] bg-[#F0F0F0] mobile:left-0 mobile:w-full"></div>
                {socialLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-[194px] flex flex-col justify-between pl-[27px] pt-[30px] pr-[30px] pb-[34px] w-[calc(100%/3)] border border-[#DCDAD9] border-solid rounded-[12px] bg-[#F7F7F7] relative mobile:w-full -ml-px -mt-px mobile:ml-0"
                    >
                        <img src={link.icon} className="size-[48px] mobile:size-[40px]" alt=""/>
                        <div className="leading-[17px] text-[24px] text-[#254441] font-medium tracking-[-0.72px] mobile:text-[18px] mobile:leading-[22px] mobile:tracking-[-0.4px] mobile:mt-[16px] flex items-center gap-x-[15px]">
                            {link.labels[locale]}
                            {link.suffix ? (
                                <>
                                    <svg className="size-[4.5px]" xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                                        <circle cx="2.25" cy="2.25" r="2.25" fill="#254441"/>
                                    </svg>
                                    {link.suffix}
                                </>
                            ) : null}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}


export default Unit2
