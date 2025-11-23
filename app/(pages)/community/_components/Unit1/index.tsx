"use client";

import useGsapImmediate from "@/app/_hooks/useGsapImmediate";
import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import { useLocale } from 'next-intl';
import { communityContent } from '@/app/content/community';
import type { Locale } from '@/i18n';

const Unit2 = () => {

    const metricsRef = useGsapImmediate({ delay: 0.4, duration: 0.8 });
    const backersRef = useGsapEntrance({ delay: 0.15, start: "top 80%" });
    const locale = useLocale() as Locale;
    const content = communityContent[locale] ?? communityContent.en;

    return (
        <div className="mt-[48px] border-b border-solid border-[rgba(22,7,4,0.12)] pb-[96px] mobile:mt-[32px] mobile:pb-[60px]">
            <div
                ref={metricsRef}
                className="h-[168px] bg-white pl-[172px] pr-[172px] tracking-[-0.3px] pt-[6px] rounded-[12px] border border-[#DCDAD9] border-solid flex items-center justify-between mobile:h-auto mobile:px-[20px] mobile:py-[32px] mobile:flex-col mobile:gap-y-[28px]">
                {content.metrics.stats.map((metric, index) => (
                    <div
                        key={`${metric.label}-${metric.value}`}
                        className={`flex flex-col gap-y-[26px] items-center mobile:gap-y-[16px] mobile:w-full mobile:py-[16px] ${
                            index < content.metrics.stats.length - 1 ? 'mobile:border-b mobile:border-solid mobile:border-[rgba(22,7,4,0.12)]' : ''
                        } ${index === 1 ? 'pr-[25px]' : ''} ${index === 2 ? 'pr-[10px]' : ''}`}
                    >
                        <div className="text-[#160704] font-medium text-[48px] leading-[34px] mobile:text-[32px] mobile:leading-[24px]">
                            {metric.value}
                        </div>
                        <div className="text-[rgba(22,7,4,0.60)] text-[18px] leading-[13px] mobile:text-[14px]">
                            {metric.label}
                        </div>
                    </div>
                ))}
            </div>
            <div ref={backersRef} className=" border-b-[1px] border-solid border-[rgba(22,7,4,0.12)] pb-[96px] mobile:pb-[60px]">
                <div
                    className="w-[1320px] px-[95px] pt-[82px] rounded-[12px] mx-auto mobile:w-full mobile:px-0 mobile:pt-[48px]">
                    <div className="flex mobile:justify-center">
                        <svg className="size-[15px] mobile:size-[12px]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M8.1875 0C8.32557 1.81206e-07 8.4375 0.111929 8.4375 0.25V5.22852L11.959 1.70801C12.0566 1.61058 12.2149 1.61044 12.3125 1.70801L13.2842 2.68066C13.3817 2.7783 13.3818 2.93657 13.2842 3.03418L9.75586 6.5625H14.75C14.8881 6.5625 15 6.67443 15 6.8125V8.1875C15 8.32557 14.8881 8.4375 14.75 8.4375H9.7666L13.2871 11.958C13.3847 12.0556 13.3845 12.2139 13.2871 12.3115L12.3145 13.2842C12.2168 13.3816 12.0585 13.3817 11.9609 13.2842L8.4375 9.76074V14.75C8.4375 14.8881 8.32557 15 8.1875 15H6.8125C6.67443 15 6.5625 14.8881 6.5625 14.75V9.75586L3.03125 13.2871C2.93362 13.3846 2.77531 13.3846 2.67773 13.2871L1.70508 12.3145C1.60783 12.2169 1.60772 12.0585 1.70508 11.9609L5.22852 8.4375H0.25C0.111929 8.4375 5.21437e-07 8.32557 0 8.1875V6.8125C-6.03528e-09 6.67443 0.111929 6.5625 0.25 6.5625H5.23926L1.70801 3.03125C1.61043 2.93368 1.61055 2.77538 1.70801 2.67773L2.68066 1.70508C2.77831 1.60766 2.93662 1.60752 3.03418 1.70508L6.5625 5.2334V0.25C6.5625 0.111929 6.67443 5.27475e-07 6.8125 0H8.1875ZM7.67676 6.12695C7.57913 6.02932 7.42087 6.02932 7.32324 6.12695L6.12988 7.32031C6.0324 7.41796 6.0323 7.57625 6.12988 7.67383L7.32324 8.86719C7.42084 8.96463 7.57916 8.96463 7.67676 8.86719L8.87012 7.67383C8.9677 7.57625 8.9676 7.41796 8.87012 7.32031L7.67676 6.12695Z" fill="#160704" fillOpacity="0.6" />
                        </svg>
                        <div className="text-[#160704] font-medium text-[12px] tracking-[0.72px] ml-[9px] opacity-60 mobile:text-[13px] mobile:ml-[6px]">
                            {content.backedBadge}
                        </div>
                    </div>
                    <div className="relative flex flex-wrap mt-[18px] mobile:mt-[16px] w-[calc(100%+3px)]">
                        <div className="absolute mobile:w-[calc(100%-1px)] w-[calc(100%-3px)] h-full inset-0 border border-[#DCDAD9] border-solid rounded-[12px] bg-[#F0F0F0]"></div>
                        <div className="bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%]"><img className="w-full h-auto" src="/img/icon4.svg" alt="" /></div>
                        <div className="-ml-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%]"><img className="w-full h-auto" src="/img/icon5.svg" alt="" /></div>
                        <div className="mobile:-mt-px -ml-px mobile:ml-0 bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%]"><img className="w-full h-auto" src="/img/icon6.svg" alt="" /></div>
                        <div className="mobile:-mt-px -ml-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%]"><img className="w-full h-auto" src="/img/icon7.svg" alt="" /></div>
                        <div className="-mt-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%]"><img className="w-full h-auto" src="/img/icon8.svg" alt="" /></div>
                        <div className="-ml-px -mt-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%]"><img className="w-full h-auto" src="/img/icon9.svg" alt="" /></div>
                        <div className="-ml-px mobile:ml-0 -mt-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%]"><img className="w-full h-auto" src="/img/icon10.svg" alt="" /></div>
                        <div className="-ml-px -mt-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%]"><img className="w-full h-auto" src="/img/icon11.svg" alt="" /></div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Unit2
