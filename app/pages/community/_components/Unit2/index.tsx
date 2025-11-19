"use client";

import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import { useLocale } from 'next-intl';
import { communityContent } from '@/app/content/community';
import type { Locale } from '@/i18n';

const Unit2 = () => {

    const sectionRef = useGsapEntrance();
    const logosRef = useGsapEntrance({ delay: 0.12, start: "top 85%" });
    const locale = useLocale() as Locale;
    const content = communityContent[locale] ?? communityContent.en;

    return (
        <div ref={sectionRef} className="border-b border-solid border-[rgba(22,7,4,0.12)] pb-[36px] mobile:pb-[24px]">
            <div
                className="w-[1320px] px-[95px] pt-[72px] rounded-[12px] mx-auto pb-[72.5px]  bg-[rgba(255,76,51,0.03)] mt-[36px] border-solid border border-[rgba(22,7,4,0.09)] mobile:w-full mobile:px-[16px] mobile:pt-[40px] mobile:pb-[40px] mobile:mt-[24px]">
                <div className="relative mobile:border mobile:border-[#DCDAD9] mobile:border-solid mobile:rounded-[12px] mobile:overflow-hidden">
                    <div className="absolute size-full inset-0  border border-[#DCDAD9] border-solid rounded-[12px] bg-[#F0F0F0] mobile:hidden"></div>
                    <div className="relative flex gap-x-[291px] pl-[72px] h-[108px] bg-[#F7F7F7] rounded-[12px] items-center border-[#DCDAD9] border-[1px] border-solid pt-[5px] mobile:flex-col mobile:gap-x-0 mobile:gap-y-[12px] mobile:h-auto mobile:pl-[20px] mobile:pr-[20px] mobile:py-[20px] mobile:rounded-none mobile:border-0 mobile:border-b mobile:pt-[16px]">
                        <div className="text-[24px] text-[#160704] font-medium tracking-[-0.48px] mobile:text-[18px] mobile:tracking-[-0.36px] mobile:text-center">
                            <span className="text-[#FF4C33]">{content.exchanges.heading[0]}</span>
                            {content.exchanges.heading[1]}
                        </div>
                        <div className="text-[#160704]/60 text-[12px] font-medium uppercase tracking-[0.72px] mobile:text-[11px] mobile:text-center mobile:tracking-[0.6px]">
                            {content.exchanges.subtitle}
                        </div>
                    </div>
                    <div ref={logosRef} className="relative flex flex-wrap w-[calc(100%+3px)]">
                        <a href="https://www.bybit.com/en/trade/spot/PSTAKE/USDT" target="_blank" className="-mt-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%] opacity-100 hover:opacity-50 transition-opacity duration-200 cursor-pointer"><img className="w-full h-auto" src="/img/dex1.svg" alt="" /></a>
                        <a href="https://www.okx.com/en-au/trade-spot/pstake-usdt" target="_blank" className="-mt-px -ml-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%] opacity-100 hover:opacity-50 transition-opacity duration-200 cursor-pointer"><img className="w-full h-auto" src="/img/dex2.svg" alt="" /></a>
                        <a href="https://www.bitget.com/spot/PSTAKEUSDT" target="_blank" className="-mt-px mobile:-mt-px -ml-px mobile:ml-0 bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%] opacity-100 hover:opacity-50 transition-opacity duration-200 cursor-pointer"><img className="w-full h-auto" src="/img/dex3.svg" alt="" /></a>
                        <a href="https://www.coinw.com/spot/pstakeusdt" target="_blank" className="-mt-px mobile:-mt-px -ml-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%] opacity-100 hover:opacity-50 transition-opacity duration-200 cursor-pointer"><img className="w-full h-auto" src="/img/dex4.svg" alt="" /></a>
                        <a href="https://www.kucoin.com/trade/PSTAKE-USDT" target="_blank" className="-mt-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%] opacity-100 hover:opacity-50 transition-opacity duration-200 cursor-pointer"><img className="w-full h-auto" src="/img/dex5.svg" alt="" /></a>
                        <a href="https://bingx.com/en/spot/PSTAKEUSDT" target="_blank" className="-ml-px -mt-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%] opacity-100 hover:opacity-50 transition-opacity duration-200 cursor-pointer"><img className="w-full h-auto" src="/img/dex6.svg" alt="" /></a>
                        <a href="https://www.htx.com/trade/pstake_usdt" target="_blank" className="-ml-px mobile:ml-0 -mt-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%] opacity-100 hover:opacity-50 transition-opacity duration-200 cursor-pointer"><img className="w-full h-auto" src="/img/dex7.svg" alt="" /></a>
                        <a href="https://www.mexc.com/exchange/PSTAKE_USDT" target="_blank" className="-ml-px -mt-px bg-[#F7F7F7] rounded-[12px] relative w-[25%] mobile:w-[50%] opacity-100 hover:opacity-50 transition-opacity duration-200 cursor-pointer"><img className="w-full h-auto" src="/img/dex8.svg" alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Unit2
