"use client";

import useGsapImmediate from "@/app/_hooks/useGsapImmediate";
import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import { useLocale } from 'next-intl';
import { homeContent } from '@/app/content/home';
import type { Locale } from '@/i18n';

const Unit2 = () => {

    const statsRef = useGsapImmediate({ delay: 0.4, duration: 0.8 });
    const narrativeRef = useGsapEntrance({ delay: 0.15, start: "top 80%" });
    const locale = useLocale() as Locale;
    const content = homeContent[locale] ?? homeContent.en;
    const unit1 = content.unit1;

    return (
        <div className="mt-[48px] border-b-[1px] border-solid border-[rgba(22,7,4,0.12)] pb-[60px] mobile:mt-[32px] mobile:pb-[40px]">
            <div
                ref={statsRef}
                className=" tracking-[-0.72px] pt-[6px] h-[168px] bg-white px-[185px] rounded-[12px] border-[#DCDAD9] border-solid border flex items-center justify-between mobile:h-auto mobile:px-[20px] mobile:py-[24px] mobile:flex-col mobile:gap-y-[20px]">
                {unit1.metrics.map((metric, index) => (
                    <div
                        key={`${metric.label}-${metric.value}`}
                        className={`flex flex-col gap-y-[26px] items-center mobile:w-full mobile:flex-row mobile:justify-between mobile:gap-y-0 ${
                            index < unit1.metrics.length - 1 ? 'mobile:pb-[16px] mobile:border-b mobile:border-[#DCDAD9]' : ''
                        }`}
                    >
                        <div className="text-[#160704] font-medium text-[48px] leading-[34px] mobile:text-[36px] mobile:leading-[28px]">
                            {metric.value}
                        </div>
                        <div className="text-[rgba(22,7,4,0.60)] text-[18px] leading-[13px]">
                            {metric.label}
                        </div>
                    </div>
                ))}
            </div>
            <div ref={narrativeRef} className="flex justify-between pl-[114px] pr-[154px] pt-[91px] mobile:flex-col mobile:px-[16px] mobile:pt-[40px] mobile:gap-y-[24px]">
                <div className="w-[400px] text-[36px] tracking-[-0.72px] leading-[calc(170px/4)] font-medium mobile:w-full mobile:text-[24px] mobile:tracking-[-0.4px] mobile:leading-[30px] text-[#160704]">
                    <span className="text-[#FF4C33]">{unit1.highlight}</span> {unit1.headline}
                </div>
                <div className="w-[516px] mobile:w-full">
                    <div className="flex">
                        <svg className="size-[15px] mobile:size-[12px]" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M8.1875 0C8.32557 1.81206e-07 8.4375 0.111929 8.4375 0.25V5.22852L11.959 1.70801C12.0566 1.61058 12.2149 1.61044 12.3125 1.70801L13.2842 2.68066C13.3817 2.7783 13.3818 2.93657 13.2842 3.03418L9.75586 6.5625H14.75C14.8881 6.5625 15 6.67443 15 6.8125V8.1875C15 8.32557 14.8881 8.4375 14.75 8.4375H9.7666L13.2871 11.958C13.3847 12.0556 13.3845 12.2139 13.2871 12.3115L12.3145 13.2842C12.2168 13.3816 12.0585 13.3817 11.9609 13.2842L8.4375 9.76074V14.75C8.4375 14.8881 8.32557 15 8.1875 15H6.8125C6.67443 15 6.5625 14.8881 6.5625 14.75V9.75586L3.03125 13.2871C2.93362 13.3846 2.77531 13.3846 2.67773 13.2871L1.70508 12.3145C1.60783 12.2169 1.60772 12.0585 1.70508 11.9609L5.22852 8.4375H0.25C0.111929 8.4375 5.21437e-07 8.32557 0 8.1875V6.8125C-6.03528e-09 6.67443 0.111929 6.5625 0.25 6.5625H5.23926L1.70801 3.03125C1.61043 2.93368 1.61055 2.77538 1.70801 2.67773L2.68066 1.70508C2.77831 1.60766 2.93662 1.60752 3.03418 1.70508L6.5625 5.2334V0.25C6.5625 0.111929 6.67443 5.27475e-07 6.8125 0H8.1875ZM7.67676 6.12695C7.57913 6.02932 7.42087 6.02932 7.32324 6.12695L6.12988 7.32031C6.0324 7.41796 6.0323 7.57625 6.12988 7.67383L7.32324 8.86719C7.42084 8.96463 7.57916 8.96463 7.67676 8.86719L8.87012 7.67383C8.9677 7.57625 8.9676 7.41796 8.87012 7.32031L7.67676 6.12695Z" fill="#160704" fillOpacity="0.6" />
                        </svg>
                        <div className="text-[#160704] font-medium ml-[9px] opacity-60 text-[12px] tracking-[0.72px] mobile:text-[11px] mobile:ml-[6px]">
                            {unit1.badge}
                        </div>
                    </div>
                    <div className="text-[18px] leading-[calc(26px)] mt-[14px] opacity-60 tracking-[-0.3px] mobile:text-[14px] mobile:leading-[20px] mobile:mt-[12px] text-[#160704]">
                        {unit1.paragraph}
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Unit2
