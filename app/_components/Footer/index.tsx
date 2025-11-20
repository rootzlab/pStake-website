"use client"
import Link from "next/link"
import { useTranslations } from 'next-intl';

const Footer = ({ className = "" }) => {
    const t = useTranslations();
    return (
        <div className={`h-[334px] mb-[24px] bg-[#160704] rounded-[12px] px-[114px] pt-[50px] mobile:h-auto mobile:px-[20px] mobile:py-[32px] ${className}`}>
            <div className="flex border-solid border-b border-[#F7F7F7]/12 pb-[55px] mobile:flex-col mobile:pb-[32px] mobile:gap-y-[28px]">
                <div className="mobile:flex mobile:justify-between mobile:items-start">
                    <Link href="/">
                        <img className="w-[185px] h-[36px] mobile:w-[140px] mobile:h-max" src="/img/icon1.svg" alt="" />
                    </Link>
                    <div className="mt-[30px] h-[33px] mobile:mt-0 mobile:h-auto">
                        <div className="w-[165px] mobile:text-right leading-[144%] font-medium text-[#F7F7F7] text-[15px] tracking-[-0.24px] mobile:text-center mobile:text-[14px]">
                            {t('footer.tagline')}
                        </div>
                    </div>
                </div>

                <div className="flex gap-x-[82px] ml-[158px] mobile:justify-between mobile:ml-0 mobile:w-full mobile:gap-x-[42px]">
                    <div className="flex flex-col gap-y-[34px] mobile:gap-y-[16px] mobile:items-start">
                        <div className="text-[#F7F7F7] leading-[1em] text-[15px] font-medium mt-[2px] mobile:text-[16px] mobile:mt-0">
                            {t('footer.ecosystem')}
                        </div>
                        <div className="text-[#F7F7F7]/60 font-medium text-[15px] leading-[1em] flex flex-col gap-y-[17px] mobile:gap-y-[12px] mobile:items-start mobile:text-[14px]">
                            <Link href="/pages/roadmap" className="text-[#F7F7F7]/60 hover:text-white transition-colors cursor-pointer">{t('nav.roadmap')}</Link>
                            <a href="https://forum.pstake.finance/" target="_blank" className="text-[#F7F7F7]/60 hover:text-white transition-colors cursor-pointer">{t('nav.governance')}</a>
                            <div className="text-[#F7F7F7]/60 hover:text-white transition-colors cursor-pointer">{t('footer.pressKit')}</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-[34px] mobile:gap-y-[16px] mobile:items-start">
                        <div className="text-[#F7F7F7] leading-[1em] text-[15px] font-medium mt-[2px] mobile:text-[16px] mobile:mt-0">
                            {t('footer.community')}
                        </div>
                        <div className="font-medium text-[15px] leading-[1em] flex flex-col gap-y-[17px] mobile:gap-y-[12px] mobile:items-start mobile:text-[14px]">
                            <a href="https://www.pstake.finance/community" target="_blank" className="text-[#F7F7F7]/60 hover:text-white transition-colors">
                                {t('nav.communityHub')}
                            </a>
                            <a href="/pages/blog" target="_blank" className="text-[#F7F7F7]/60 hover:text-white transition-colors">
                                {t('nav.blog')}
                            </a>
                            <a href="https://blog.pstake.finance/category/bitcoin-liquid-staking/?lang=en" target="_blank" className="text-[#F7F7F7]/60 hover:text-white transition-colors">
                                {t('footer.learn')}
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-[34px] mobile:gap-y-[16px] mobile:items-start">
                        <div className="text-[#F7F7F7] leading-[1em] text-[15px] font-medium mt-[2px] mobile:text-[16px] mobile:mt-0">
                            {t('footer.product')}
                        </div>
                        <div className="text-[#F7F7F7]/60 font-medium text-[15px] leading-[1em] flex flex-col gap-y-[17px] mobile:gap-y-[12px] mobile:items-start mobile:text-[14px]">
                            <Link href="/pages/research" className="text-[#F7F7F7]/60 hover:text-white transition-colors">
                                {t('nav.research')}
                            </Link>
                            <a href="https://app.btc.pstake.finance/?lang=en" target="_blank" className="text-[#F7F7F7]/60 hover:text-white transition-colors">
                                {t('nav.staking')}
                            </a>
                            <a href="https://bridge.persistence.one/?lang=en" target="_blank" className="text-[#F7F7F7]/60 hover:text-white transition-colors">
                                {t('nav.bridge')}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex-1 mobile:hidden"></div>
                <div className="flex self-start pb-[30px] gap-x-[9px] border-solid border-b border-[#F7F7F7]/12 mobile:self-center mobile:pb-0 mobile:border-b-0 mobile:flex-col mobile:gap-y-[16px] mobile:w-full mobile:items-center">
                    <div className="flex gap-x-[9px]">
                        <a href="https://x.com/pStakeFinance" target="_blank" className="group size-[42px] bg-[rgba(255,180,163,0.03)] border-[rgba(255,180,163,0.12)] border-solid border items-center justify-center flex [box-shadow:0_-0.1px_0.4px_0_#FFF_inset,0_-0.6px_0.9px_0_rgba(0,0,0,0.12)_inset,0_0.6px_1.2px_0_rgba(0,0,0,0.12)] rounded-[9px] mobile:size-[40px] transition-all duration-200 hover:bg-[rgba(255,180,163,0.10)] hover:border-[rgba(255,180,163,0.24)] hover:scale-[1.03]">
                            <img src="/img/icon22.svg" className="size-[12px] transition-all filter group-hover:brightness-125 group-hover:scale-105" alt="" />
                        </a>
                        <a href="https://t.me/pstakefinance" target="_blank" className="group size-[42px] bg-[rgba(255,180,163,0.03)] border-[rgba(255,180,163,0.12)] border-solid border items-center justify-center flex [box-shadow:0_-0.1px_0.4px_0_#FFF_inset,0_-0.6px_0.9px_0_rgba(0,0,0,0.12)_inset,0_0.6px_1.2px_0_rgba(0,0,0,0.12)] rounded-[9px] mobile:size-[40px] transition-all duration-200 hover:bg-[rgba(255,180,163,0.10)] hover:border-[rgba(255,180,163,0.24)] hover:scale-[1.03]">
                            <img src="/img/icon23.svg" className="size-[18px] transition-all filter group-hover:brightness-125 group-hover:scale-105" alt="" />
                        </a>
                        <a href="https://discord.com/invite/pstake" target="_blank" className="group size-[42px] bg-[rgba(255,180,163,0.03)] border-[rgba(255,180,163,0.12)] border-solid border items-center justify-center flex [box-shadow:0_-0.1px_0.4px_0_#FFF_inset,0_-0.6px_0.9px_0_rgba(0,0,0,0.12)_inset,0_0.6px_1.2px_0_rgba(0,0,0,0.12)] rounded-[9px] mobile:size-[40px] transition-all duration-200 hover:bg-[rgba(255,180,163,0.10)] hover:border-[rgba(255,180,163,0.24)] hover:scale-[1.03]">
                            <img src="/img/icon24.svg" className="size-[18px] transition-all filter group-hover:brightness-125 group-hover:scale-105" alt="" />
                        </a>
                    </div>
                    <a href="https://coinmarketcap.com/currencies/pstake-finance" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-[#F7F7F7] text-[15px] font-medium h-[42px] px-[21px] bg-[rgba(255,180,163,0.03)] border-[rgba(255,180,163,0.12)] border-solid border items-center justify-center flex [box-shadow:0_-0.1px_0.4px_0_#FFF_inset,0_-0.6px_0.9px_0_rgba(0,0,0,0.12)_inset,0_0.6px_1.2px_0_rgba(0,0,0,0.12)] rounded-[9px] mobile:w-full mobile:max-w-[240px] mobile:h-[44px] transition-all duration-200 hover:bg-[rgba(255,180,163,0.10)] hover:border-[rgba(255,180,163,0.24)] hover:scale-[1.03] hover:text-white">
                        $PSTAKE
                    </a>
                </div>
            </div>
            <div className="flex justify-between mobile:flex-col mobile:items-center mobile:gap-y-[16px] mobile:mt-[28px]">
                <div className="flex gap-x-[14px] text-[#F7F7F7] items-center mt-[36px] leading-[1em] text-[12px] tracking-[0.1px] mobile:mt-0">
                    <div className="opacity-[.54]">
                        {t('common.copyright')}
                    </div>
                    <svg className="size-[3px] shrink-0" xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
                        <circle opacity="0.3" cx="1.5" cy="1.5" r="1.5" fill="#F7F7F7" />
                    </svg>
                    <div className="opacity-[.54]">
                        {t('footer.rightsReserved')}
                    </div>
                </div>
                <div className="flex gap-x-[15px] text-[#F7F7F7] items-center mt-[34px] leading-[1em] text-[12px] tracking-[0.1px] mobile:mt-0">
                    <Link href="/pages/terms" className="opacity-[.54] hover:opacity-100 transition-colors cursor-pointer">
                        {t('footer.termsOfService')}
                    </Link>
                    <svg className="size-[3px] shrink-0" xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
                        <circle opacity="0.3" cx="1.5" cy="1.5" r="1.5" fill="#F7F7F7" />
                    </svg>
                    <Link href="/pages/privacy" className="opacity-[.54] hover:opacity-100 transition-colors cursor-pointer">
                        {t('footer.privacyPolicy')}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer