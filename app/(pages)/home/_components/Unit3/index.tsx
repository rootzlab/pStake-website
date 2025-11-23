"use client";

import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import { useLocale } from 'next-intl';
import { homeContent } from '@/app/content/home';
import type { Locale } from '@/i18n';

const CARD_STYLES = [
    {
        icon: '/img/icon12.svg',
        gradient: '[background:linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgba(255,76,51,0.12)_100%)]',
        highlightClass: 'text-[#FE3D11]'
    },
    {
        icon: '/img/icon14.svg',
        gradient: '[background:linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgba(194,135,232,0.12)_100%)]',
        highlightClass: 'text-[#C287E8]'
    },
    {
        icon: '/img/icon15.svg',
        gradient: '[background:linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgba(67,170,139,0.12)_100%)]',
        highlightClass: 'text-[#43AA8B]'
    },
    {
        icon: '/img/icon16.svg',
        gradient: '[background:linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgba(22,7,4,0.12)_100%)]',
        highlightClass: ''
    }
];

const Unit3 = () => {
    const locale = useLocale() as Locale;
    const content = homeContent[locale] ?? homeContent.en;
    const unit3 = content.unit3;

    const headingRef = useGsapEntrance();
    const cardsRef = useGsapEntrance({ delay: 0.1, start: "top 85%" });
    const footerRef = useGsapEntrance({ delay: 0.15, start: "top 80%" });

    return (
        <div className="pt-[120px] pb-[77px] border-b-[1px] border-solid border-[rgba(22,7,4,0.12)] mobile:pt-[40px] mobile:pb-[40px]">
            <div ref={headingRef} className="w-[1129px] mx-auto mobile:w-full">
                <div className="flex justify-between items-end mobile:flex-col mobile:items-start mobile:gap-y-[12px]">
                    <div className="h-[74px] relative w-[465px] mobile:h-auto mobile:w-full">
                        <div className="text-[36px] absolute top-1/2 -translate-y-1/2 font-medium leading-[120%] mobile:text-[24px] mobile:static mobile:translate-y-0 mobile:leading-[30px]">
                            <span className="text-[#FF4C33] tracking-[-0.72px] mobile:tracking-[-0.48px]">{unit3.headingHighlight}</span>
                            <br />
                            <span className="tracking-[-0.62px] mobile:tracking-[-0.4px] text-[#160704]">{unit3.headingTitle}</span>
                        </div>
                    </div>
                    <div className="flex mobile:w-full">
                        <img src="/img/icon3.svg" className="size-[15px] mobile:size-[12px]" alt="" />
                        <div className="text-[#160704] font-medium ml-[9px] opacity-60 text-[12px] tracking-[0.72px] mobile:text-[11px] mobile:ml-[6px]">
                            {unit3.badge}
                        </div>
                    </div>
                </div>
            </div>
            <div ref={cardsRef} className="relative w-[1129px] mx-auto mt-[67px] flex flex-1 mobile:w-full mobile:mt-[24px] mobile:flex-wrap mobile:gap-[12px]">
                <div className="absolute top-0 left-0 size-full border-[#DCDAD9] border border-solid rounded-[12px] bg-[#F0F0F0]"></div>
                {unit3.cards.map((card, index) => {
                    const style = CARD_STYLES[index % CARD_STYLES.length];
                    return (
                        <div
                            key={`${card.title}-${card.highlight}`}
                            className={`relative bg-[#F7F7F7] ${index > 0 ? '-ml-px' : ''} h-[602px] p-[11px] flex-1 border-[#DCDAD9] border border-solid rounded-[12px] mobile:p-[8px] mobile:w-[calc(50%-6px)] mobile:flex-none mobile:h-[452px]`}
                        >
                            <div className={`size-full border-[#DCDAD9] relative border border-solid rounded-[12px] px-[23px] py-[24px] ${style.gradient} mobile:px-[16px] mobile:py-[20px]`}>
                                <img src={style.icon} className="size-[30px] mobile:size-[24px]" alt="" />
                                <div className="text-[30px] uppercase leading-[120%] mt-[30px] font-light tracking-[-0.72px] mobile:text-[20px] mobile:mt-[20px] mobile:tracking-[-0.4px] text-[#160704]">
                                    <span className={`${style.highlightClass}`}>{card.highlight}</span>
                                    <br />
                                    {card.title}
                                </div>
                                <div className="text-[18px] leading-[144%] mt-[33px] tracking-[-0.4px] font-medium text-[#160704] mobile:text-[14px] mobile:mt-[24px] mobile:tracking-[-0.24px]">
                                    {card.description}
                                </div>
                                <img src="/img/icon13.svg" className="w-[142px] absolute bottom-[24px] left-[24px] mobile:w-[100px] mobile:bottom-[16px] mobile:left-[16px]" alt="" />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div ref={footerRef} className="mt-[83px] w-[1129px] mx-auto justify-between flex pr-[138px] pl-[30px] mobile:mt-[40px] mobile:w-full mobile:flex-col mobile:pr-0 mobile:pl-0 mobile:gap-y-[24px]">
                <div className="mobile:w-full">
                    <div className="flex">
                        <img src="/img/icon3.svg" className="size-[15px] mobile:size-[12px]" alt="" />
                        <div className="text-[#160704] font-medium ml-[9px] opacity-60 text-[12px] tracking-[0.72px] mobile:text-[11px] mobile:ml-[6px]">
                            {unit3.footerBadge}
                        </div>
                    </div>
                    <div className="text-[#160704] text-[18px] mt-[14px] opacity-60 font-medium leading-[144%] tracking-[-0.32px] mobile:text-[14px] mobile:mt-[12px] mobile:tracking-[-0.24px]">
                        {unit3.footerLeft[0]}
                        <br />
                        {unit3.footerLeft[1]}
                    </div>
                </div>
                <div className="text-[#160704] text-[18px] mt-[6px] opacity-60 font-medium leading-[144%] w-[418px] tracking-[-0.32px] mobile:text-[14px] mobile:mt-0 mobile:w-full mobile:tracking-[-0.24px]">
                    {unit3.footerRight}
                </div>
            </div>
        </div>
    );
};

export default Unit3;
