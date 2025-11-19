"use client";

import { useLocale } from 'next-intl';
import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import { roadmapContent, type RoadmapListItemContent, type RoadmapPhaseContent, type RichTextSegment } from '@/app/content/roadmap';
import type { Locale } from '@/i18n';

const renderSegments = (segments: RichTextSegment[]) => (
    segments.map((segment, index) => {
        if (segment.type === 'lineBreak') {
            return <br key={`br-${index}`}/>;
        }
        if (segment.type === 'highlight') {
            return <span key={`highlight-${index}`} className="text-[#F7F7F7]">{segment.value}</span>;
        }
        return <span key={`text-${index}`}>{segment.value}</span>;
    })
);

const renderList = (items: RoadmapListItemContent[], level: number = 0) =>
    items.map((item, index) => (
        <div key={`${level}-${index}`} className={`flex gap-x-[12px] ${level > 0 ? "mt-[40px]" : ""} mobile:gap-x-[8px] ${level > 0 ? "mobile:mt-[12px]" : ""}`}>
            <div className="text-[18px] leading-[25.92px] font-medium text-[rgba(247,247,247,0.70)] mobile:text-[16px] mobile:leading-[22px]">
                <div className="dot">
                    {renderSegments(item.segments)}
                </div>
                {item.children && item.children.length > 0 && (
                    <div className="mt-[12px] pl-[29px] mobile:mt-[8px] mobile:pl-[10px]">
                        {renderList(item.children, level + 1)}
                    </div>
                )}
            </div>
        </div>
    ));

const renderLabel = (label: string | string[]) => {
    if (Array.isArray(label)) {
        return label.map((line, idx) => (
            <span key={`${line}-${idx}`} className="block">
                {line}
            </span>
        ));
    }
    return label;
};

const Item = ({ phase }: { phase: RoadmapPhaseContent }) => {

    const cardRef = useGsapEntrance({ start: "top 85%" });
    const { title, timeRange, label, milestones, position } = phase;

    return (
        <div ref={cardRef} className="relative w-[450px] px-[48px] pt-[60px] pb-[78px] bg-[#160704] rounded-[12px] mobile:w-full mobile:px-[20px] mobile:pt-[40px] mobile:pb-[44px]">
            <img
                className={`${position === "right" ? "left-[50px] -translate-x-[100%] rotate-180 origin-center -top-[48px]":"right-[50px] translate-x-[100%] -top-[28px]"} w-[185px] h-[87px] absolute mobile:hidden`}
                src="/img/icon40.svg"
                alt=""
            />
            <div className="text-[#FF4C33] text-[42px] font-medium leading-[34px] tracking-[-1px] mobile:text-[32px] mobile:leading-[36px] mobile:tracking-[-0.64px]">
                {title}
            </div>
            <div className="flex gap-x-[15px] text-[#F7F7F7] text-[24px] leading-[21px] items-center font-medium mt-[25px] tracking-[0.72px] mobile:gap-x-[12px] mobile:text-[18px] mobile:leading-[24px] mobile:mt-[20px]">
                <img className="size-[19.2px]" src="/img/icon39.svg" alt="" />
                {timeRange}
            </div>
            <div className="h-[1px] bg-[#F7F7F7]/12 mt-[35px] mobile:mt-[20px]"></div>
            <div className="text-[#F7F7F7] text-[24px] leading-[114%] font-medium mt-[38px] tracking-[-0.48px] mobile:text-[20px] mobile:leading-[28px] mobile:mt-[32px] mobile:tracking-[-0.4px]">
                {renderLabel(label)}
            </div>
            <div className="mt-[35px] flex flex-col gap-y-[35px] tracking-[-0.3px] pl-[10px] mobile:mt-[28px] mobile:gap-y-[24px] mobile:pl-[6px]">
                {renderList(milestones)}
            </div>
        </div>
    )
}

const Unit2 = () => {

    const locale = useLocale() as Locale;
    const content = roadmapContent[locale] ?? roadmapContent.en;

    const leftPhases = content.phases.filter((phase) => phase.position === 'left');
    const rightPhases = content.phases.filter((phase) => phase.position === 'right');

    return (
        <>
            {/* 移动端布局：按原始顺序线性显示 */}
            <div className="flex md:hidden flex-col gap-y-[40px] px-[16px] pt-[20px]">
                {content.phases.map((phase) => (
                    <Item key={`mobile-${phase.title}`} phase={phase}/>
                ))}
            </div>

            {/* PC端布局：左右分栏显示 */}
            <div className="hidden md:flex justify-between px-[115px] mt-[-86px]">
                <div className="flex flex-col gap-y-[95px]">
                    {leftPhases.map((phase) => (
                        <Item key={`desktop-left-${phase.title}`} phase={phase}/>
                    ))}
                </div>
                <div className="mt-[-108px] w-[12px] h-[3605px] relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-[linear-gradient(to_bottom,_#FF4C33_0%,_#FF4C33_85%,rgba(255,76,51,0)_100%)]"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-px bg-[linear-gradient(to_bottom,_#FF4C33_0%,_#FF4C33_85%,rgba(255,76,51,0)_100%)]"></div>
                </div>
                <div className="flex flex-col gap-y-[95px] pt-[192px]">
                    {rightPhases.map((phase) => (
                        <Item key={`desktop-right-${phase.title}`} phase={phase}/>
                    ))}
                </div>
            </div>
        </>
    )
}


export default Unit2;
