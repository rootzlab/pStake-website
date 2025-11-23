"use client";

import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import { useLocale } from 'next-intl';
import { communityContent } from '@/app/content/community';
import type { Locale } from '@/i18n';

const Unit7 = () =>{

    const heroRef = useGsapEntrance({ start: "top 95%" });
    const detailsRef = useGsapEntrance({ delay: 0.15, start: "top 85%" });
    const locale = useLocale() as Locale;
    const { governance } = communityContent[locale] ?? communityContent.en;


    return (
        <div className=" border-b-[1px] border-solid border-[rgba(22,7,4,0.12)] pb-[93px] mobile:pb-[60px]">
            <div ref={heroRef} className="w-[1464px] pl-[193px] pt-[99px] -ml-[49px] h-[635px] bg-[url(/img/bg6.jpg)] bg-size-[100%_100%] mobile:w-full mobile:pl-[20px] mobile:pr-[20px] mobile:pt-[48px] mobile:ml-0 mobile:h-auto mobile:pb-[48px] mobile:bg-size-[auto_100%] mobile:bg-center rounded-[12px]">
                <div className="flex">
                    <img src="/img/icon17.svg" className="size-[15px] mobile:size-[12px]" alt=""/>
                    <div className="text-[#F7F7F7] text-[12px] font-medium ml-[9px] mobile:text-[11px] mobile:ml-[6px]">
                        {governance.badge}
                    </div>
                </div>
                <div className="h-[132px] flex items-center  mt-[48px] mobile:h-auto mobile:mt-[28px]">
                    <div className="text-[#F7F7F7] text-[72px] font-medium leading-[114%] tracking-[-1.44px] mobile:text-[36px] mobile:leading-[44px] mobile:tracking-[-0.6px]">
                        What is <span className="text-[#FE3D11]">{governance.headingHighlight}</span><br/>
                        {governance.headingSuffix}
                    </div>
                </div>
                <div className="text-[#F7F7F7] text-[18px] font-medium leading-[1em] tracking-[-0.35px] mt-[102px] mobile:text-[16px] mobile:mt-[48px]">
                    {governance.intro}
                </div>
                <div className="text-[#F7F7F7]/70 text-[15px] w-[328px] font-medium tracking-[-0.26px] leading-[145%] mt-[28px] mobile:text-[14px] mobile:mt-[20px]">
                    {governance.details}
                </div>
            </div>
            <div ref={detailsRef} className="flex justify-between pl-[114px] pr-[154px] pt-[100px] items-end mobile:flex-col mobile:pl-0 mobile:pr-0 mobile:pt-[60px] mobile:items-start mobile:gap-y-[32px]">
                <div className="h-[154px] flex items-center mobile:h-auto mobile:w-full">
                    <div className="w-[530px] text-[36px] tracking-[-0.65px] leading-[120%] font-medium mobile:w-full mobile:text-[24px] mobile:tracking-[-0.48px] mobile:leading-[130%]">
                        {governance.history[0]}&nbsp;
                        <span className="text-[#FE3D11]">{governance.history[1]}</span>&nbsp;
                        {governance.history[2]}&nbsp;
                        <span className="text-[#FE3D11]">{governance.history[3]}</span>&nbsp;
                        {governance.history[4]}
                    </div>
                </div>
                <div className="w-[402px] translate-y-[5px] mobile:w-full mobile:translate-y-0">
                    <div className="flex">
                        <img src="/img/icon3.svg" className="size-[15px] mobile:size-[12px]" alt=""/>
                        <div className="text-[#160704] font-medium ml-[9px] opacity-60 text-[12px] tracking-[0.72px] mobile:text-[11px] mobile:ml-[6px]">
                            {governance.whyBadge}
                        </div>
                    </div>
                    <div className="text-[18px] leading-[144%] mt-[15px] opacity-60 text-[#160704] font-medium tracking-[-0.32px] mobile:text-[15px] mobile:mt-[12px]">
                        {governance.whyText}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Unit7
