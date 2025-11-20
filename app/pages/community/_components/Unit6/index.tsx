"use client";

import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import { useLocale } from 'next-intl';
import { communityContent } from '@/app/content/community';
import type { Locale } from '@/i18n';

const Unit6 = () => {

    const heroRef = useGsapEntrance({ start: "top 95%" });
    const cardRef = useGsapEntrance({ delay: 0.2, start: "top 85%" });
    const locale = useLocale() as Locale;
    const { outreach } = communityContent[locale] ?? communityContent.en;

    return (
        <div ref={heroRef} className="relative mt-[96px] h-[603px] bg-[url(/img/bg4.jpg)] bg-size-[100%_100%] mb-[24px] mobile:mt-[60px] mobile:bg-size-[auto_100%] mobile:bg-center rounded-[12px] mobile:mb-[16px] mobile:h-[480px] overflow-hidden">
            <div className="pl-[145px] pr-[176px] pt-[96px] mobile:px-[20px] mobile:py-[40px]">
                <div className="flex">
                    <img src="/img/icon17.svg" className="size-[15px] mobile:size-[12px]" alt="" />
                    <div className="text-[#F7F7F7] text-[12px] font-medium ml-[9px] text-[12px] tracking-[0.72px] mobile:text-[11px] mobile:ml-[6px]">
                        {outreach.badge}
                    </div>
                </div>
                <div className="pt-[35px] flex justify-between mobile:pt-[24px] mobile:flex-col mobile:gap-y-[28px]">
                    <div className=" h-[165px] relative items-center flex mobile:h-auto mobile:w-full">
                        <div className="text-[72px] font-medium text-[#F7F7F7] leading-[82px] tracking-[-1.2px] mobile:text-[36px] mobile:leading-[44px] mobile:tracking-[-0.6px]">
                            {outreach.headingLines[0]}<br />
                            <span className="text-[#FE3D11]">{outreach.headingLines[1]}</span>&nbsp;
                            {outreach.headingLines[2]}
                        </div>
                    </div>
                    <div className="w-[349px] mt-[8px] mobile:w-full mobile:mt-0">
                        {outreach.paragraphs.map((paragraph, index) => (
                            <div
                                key={paragraph}
                                className={`text-[#F7F7F7] text-[15px] ${index === 0 ? 'opacity-70' : ''} leading-[144%] tracking-[-0.3px] ${
                                    index === 0 ? '' : 'w-[200px] mobile:w-full mt-[32px] mobile:mt-[20px]'
                                } mobile:text-[14px]`}
                            >
                                {paragraph}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div ref={cardRef} className=" absolute left-[115px] bottom-[-72px] w-[669px] h-[288px] p-[12px] rounded-[12px] outline-1 outline-offset-1 outline-[rgba(220,218,217,0.60)] bg-linear-to-b from-[rgba(247,247,247,0.18)] to-[rgba(247,247,247,0.09)] mobile:left-[5%] mobile:w-[90%] mobile:h-[240px]">
                <div className="self-stretch flex-1 p-[24px] size-full rounded-[12px] outline-1 outline-offset-1 outline-[rgba(220,218,217,0.48)] flex flex-col justify-start items-start gap-2.5 overflow-hidden">
                    <div data-property-1="Default" className=" max-w-full w-[597px] h-[96px] pl-[33.6px] pr-[38.4px] py-[38.4px] bg-linear-to-l from-[rgba(247,247,247,0.12)] to-[rgba(247, 247, 247, 0.00)] rounded-[9.60px] shadow-[0px_1.440000057220459px_2.880000114440918px_0px_rgba(0,0,0,0.12)] shadow-[inset_0px_-1.440000057220459px_2.1600000858306885px_0px_rgba(0,0,0,0.12)] shadow-[inset_0px_-0.24000000953674316px_0.9600000381469727px_0px_rgba(255,255,255,1.00)] outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-100/50 inline-flex justify-start items-center gap-[30px] group transition-all duration-200 hover:from-[rgba(247,247,247,0.18)] hover:to-[rgba(247,247,247,0.06)] hover:outline-[rgba(220,218,217,0.80)]">
                        <svg className="size-[39px]" xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21.2875 0C21.6465 4.71135e-07 21.9375 0.291015 21.9375 0.65V13.595L31.0925 4.44082C31.3464 4.18708 31.7578 4.18701 32.0117 4.44082L34.5397 6.96888C34.7934 7.2227 34.7934 7.63423 34.5397 7.88802L25.3652 17.0625H38.35C38.709 17.0625 39 17.3535 39 17.7125V21.2875C39 21.6465 38.709 21.9375 38.35 21.9375H25.3915L34.5456 31.0917C34.7994 31.3455 34.7995 31.757 34.5456 32.0108L32.0184 34.538C31.7646 34.7919 31.3523 34.7919 31.0984 34.538L21.9375 25.3771V38.35C21.9375 38.709 21.6465 39 21.2875 39H17.7125C17.3535 39 17.0625 38.709 17.0625 38.35V25.3644L7.88125 34.5456C7.62741 34.7995 7.21594 34.7995 6.96211 34.5456L4.43405 32.0184C4.18021 31.7646 4.18023 31.3523 4.43405 31.0984L13.595 21.9375H0.65C0.291016 21.9375 1.35573e-06 21.6465 0 21.2875V17.7125C-1.56917e-08 17.3535 0.291015 17.0625 0.65 17.0625H13.6229L4.44082 7.8804C4.18706 7.62656 4.18703 7.21508 4.44082 6.96126L6.96888 4.4332C7.22271 4.17952 7.63422 4.17948 7.88802 4.4332L17.0625 13.6077V0.65C17.0625 0.291016 17.3535 1.37144e-06 17.7125 0H21.2875ZM19.9596 15.9309C19.7057 15.6771 19.2943 15.6771 19.0404 15.9309L15.9377 19.0328C15.684 19.2865 15.6842 19.6981 15.9377 19.952L19.0404 23.0547C19.2943 23.3085 19.7057 23.3085 19.9596 23.0547L23.0623 19.952C23.3158 19.6981 23.316 19.2865 23.0623 19.0328L19.9596 15.9309Z" fill="#F7F7F7" />
                        </svg>
                        <a href="/pages/community" target="_blank" className="translate-y-[2px] text-center justify-start text-[#F7F7F7] text-[36px] font-medium leading-[106%] tracking-[-0.72px] mt-[2px] mobile:text-[24px]">{outreach.ctaLabel}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Unit6
