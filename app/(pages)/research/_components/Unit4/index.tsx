"use client";

import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import { useLocale } from 'next-intl';
import { researchContent } from '@/app/content/research';
import type { Locale } from '@/i18n';

const Unit4 = () => {

    const heroRef = useGsapEntrance({ start: "top 90%" });
    const statsRef = useGsapEntrance({ delay: 0.15, start: "top 85%" });
    const locale = useLocale() as Locale;
    const { fund } = researchContent[locale] ?? researchContent.en;

    return (
        <div className="pb-[120px] border-b border-solid border-[rgba(22,7,4,0.12)] mobile:pb-[40px]">
            <div
                ref={heroRef}
                className="bg-[url(/img/bg8.jpg)] bg-size-[100%_auto] bg-no-repeat w-[1464px] mobile:pb-[26px] -ml-[54px] mt-[71px] mobile:w-full mobile:ml-0 mobile:mt-[40px] mobile:bg-cover rounded-[12px]">
                <div className="pl-[198px] pr-[252px] pt-[96px] mobile:px-[26px] mobile:pt-[40px]">
                    <div className="flex">
                        <img src="/img/icon17.svg" className="size-[15px] mobile:size-[12px]" alt=""/>
                        <div className="text-[#F7F7F7] text-[12px] font-medium ml-[9px] mobile:text-[11px] mobile:ml-[6px]">
                            {fund.badge}
                        </div>
                    </div>
                    <div className="pt-[35px] flex justify-between mobile:pt-[24px] mobile:flex-col mobile:gap-y-[24px]">
                        <div className=" h-[165px] relative items-center flex mobile:h-auto mobile:w-full mobile:justify-center">
                            <div className="text-[72px] tracking-[-1.44px]  w-[523px] font-medium text-[#F7F7F7] leading-[82px] mobile:text-[36px] mobile:w-full mobile:leading-[42px] mobile:tracking-[-0.72px]">
                                <span className="text-[#FE3D11]">{fund.highlight}</span> {fund.title}
                            </div>
                        </div>
                        <div className="w-[328px] mt-[6px] mobile:w-full mobile:mt-0">
                            {fund.paragraphs.map((paragraph, index) => (
                                <div
                                    key={paragraph}
                                    className={`mobile:text-justify text-[#F7F7F7] text-[15px] tracking-[-0.3px] ${index === 0 ? 'opacity-70' : ''} leading-[144%] mobile:text-[14px] ${
                                        index === 0 ? '' : 'w-[250px] mt-[32px] mobile:mt-[20px] mobile:w-full mobile:text-[14px]'
                                    }`}
                                >
                                    {paragraph}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div
                    ref={statsRef}
                    className="mt-[85px] bg-[#F7F7F7] h-[418px] mx-[168px] rounded-[12px] border-[#DCDAD9] border-solid border-[1px] p-[12px] mobile:mt-[40px] mobile:h-auto mobile:mx-[26px] mobile:p-[8px]">
                    <div
                        className="h-[216px] bg-[url(/img/bg9.jpg)] bg-size-[100%_100%] flex items-center justify-center mobile:h-[160px] rounded-[12px]">
                        <div
                            className="rounded-[24px] border-[1px] border-[rgba(67,170,139,0.48)] flex items-center gap-x-[20px] justify-center border-solid bg-[rgba(67,170,139,0.48)] h-[86px] w-[444px] [background:linear-gradient(180deg,rgba(67,170,139,0.00)_0%,rgba(67,170,139,0.06)_100%),rgba(255,255,255,0.03)] backdrop-blur-[8px] [box-shadow:0_-0.2px_0.8px_0_rgba(255,255,255,0.50)_inset,_0_-1.2px_1.8px_0_rgba(0,0,0,0.12)_inset,_0_1.2px_2.4px_0_rgba(0,0,0,0.12)] mobile:h-[60px] mobile:w-full mobile:max-w-[320px] mobile:gap-x-[12px] group transition-all duration-200 hover:[background:linear-gradient(180deg,rgba(67,170,139,0.00)_0%,rgba(67,170,139,0.10)_100%),rgba(255,255,255,0.06)] hover:border-[rgba(67,170,139,0.70)] hover:scale-[1.02]">
                            <img src="/img/icon17.svg" className="size-[39px] mobile:size-[28px] group-hover:brightness-110 group-hover:scale-[1.02]" alt=""/>
                            <a href="https://blog.pstake.finance/2025/08/07/pstake-foundation-opens-applications-for-50m-ai-web3-innovation-fund/" target="_blank" className="pt-[3px] text-[36px] text-[#F7F7F7] font-medium tracking-[-0.72px] mobile:text-[20px] mobile:tracking-[-0.4px] hover:text-white group-hover:text-white">
                                {fund.ctaLabel}
                            </a>
                        </div>
                    </div>
                    <div
                        className=" pt-[4px] justify-between h-[168px] pl-[94px] tracking-[-0.22px] pr-[118px] mt-[10px] bg-white rounded-[12px] border-[#DCDAD9] border-solid border-[1px] flex items-center mobile:h-auto mobile:px-[16px] mobile:py-[24px] mobile:mt-[8px] mobile:flex-wrap mobile:gap-[20px]">
                        {fund.stats.map((stat,index) => (
                            <div
                                key={`${stat.label}-${stat.value}`}
                                className={`flex flex-col gap-y-[26px] items-center mobile:w-[calc(50%-10px)] mobile:gap-y-[16px] ${
                                    index === 1 ? 'pl-[22px]' : ''
                                } ${index === 2 ? 'pr-[22px]' : ''}`}
                            >
                                <div className="text-[#160704] font-medium text-[48px] leading-[34px] mobile:text-[32px] mobile:leading-[28px]">
                                    {stat.value}
                                </div>
                                <div className="text-[rgba(22,7,4,0.60)] text-[18px] leading-[13px] mobile:text-[14px] mobile:leading-[16px]">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Unit4
