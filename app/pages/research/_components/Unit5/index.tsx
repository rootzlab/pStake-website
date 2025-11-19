"use client";

import useGsapEntrance from "@/app/_hooks/useGsapEntrance";
import useGsapImmediate from "@/app/_hooks/useGsapImmediate";
import { MediumArticle, resolveArticleUrl } from "@/app/utils/medium";
import { formatArticleDate } from "@/app/utils/articleDate";
import { useLocale } from 'next-intl';
import { researchContent } from '@/app/content/research';
import type { Locale } from '@/i18n';

interface Props {
    articles: MediumArticle[];
}

const Meta = ({ dateLabel, readTime, dateAlt, readAlt }: { dateLabel: string; readTime: string | null; dateAlt: string; readAlt: string }) => {
    if (!dateLabel && !readTime) return null;
    return (
        <div className="flex gap-x-[15px] items-center pl-[12px] mt-[16px] text-[12px] tracking-[0.72px] mobile:text-[11px] mobile:pl-[10px] mobile:mt-[12px]">
            {dateLabel ? (
                <div className="flex">
                    <img src="/img/icon3.svg" className="size-[15px] mobile:size-[12px]" alt={dateAlt} />
                    <div className="text-[#160704] font-medium ml-[9px] opacity-60">{dateLabel}</div>
                </div>
            ) : null}
            {dateLabel && readTime ? (
                <svg className="size-[3px]" xmlns="" width="3" height="3" viewBox="0 0 3 3" fill="none">
                    <circle opacity="0.6" cx="1.5" cy="1.5" r="1.5" fill="#160704" />
                </svg>
            ) : null}
            {readTime ? (
                <div className="flex items-center">
                    <img src="/img/icon19.svg" className="size-[11px] mobile:size-[9px]" alt={readAlt} />
                    <div className="text-[#160704] font-medium ml-[9px] opacity-60">{readTime}</div>
                </div>
            ) : null}
        </div>
    );
};

const Unit5 = ({ articles }: Props) => {
    const cardsRef = useGsapEntrance({ delay: 0.15, start: "top 80%" });
    const gridTopRef = useGsapEntrance({ delay: 0.12, start: "top 75%" });
    const heroRef = useGsapImmediate({ delay: 0.2, duration: 0.8 });
    const locale = useLocale() as Locale;
    const content = researchContent[locale] ?? researchContent.en;

    const displayedArticles = articles.slice(0, 3);
    const gridTopArticles = articles.slice(3, 6);

    const renderCard = (article: MediumArticle) => {
        const dateLabel = formatArticleDate(article.pubDate, locale);
        const href = resolveArticleUrl(article);
        return (
            <a
                key={article.guid}
                href={href}
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <div className="p-[12px] border-[#DCDAD9] border border-solid rounded-[12px] mobile:p-[10px]">
                    {article.coverImage ? (
                        <div className="bg-[#727272] w-full h-[192px] mobile:h-[220px] rounded-[12px] overflow-hidden">
                            <img
                                src={article.coverImage}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="size-full bg-[#727272]"></div>
                    )}
                </div>
                <div className="relative items-center flex mt-[20px] tracking-[-0.42px] mobile:min-h-auto mobile:mt-[16px]">
                    <div className="line-clamp-2 text-[21px] pl-[12px] leading-[144%] font-medium mobile:text-[16px] mobile:pl-[10px] mobile:tracking-[-0.28px]">
                        {article.title}
                    </div>
                </div>
                <Meta dateLabel={dateLabel} readTime={null} dateAlt={content.articles.dateAlt} readAlt={content.articles.readAlt} />
            </a>
        );
    };

    const renderFallback = () => (
        <div className="w-full text-center py-[60px] text-[18px] text-[#160704] opacity-60">
            {content.articles.emptyState}
        </div>
    );

    return (
        <div className="pt-[115px] px-[115px]  border-b border-solid border-[rgba(22,7,4,0.12)] mobile:pt-[40px] mobile:px-[16px]">
            <div ref={heroRef} className="flex gap-x-[156px] items-end mobile:flex-col mobile:gap-y-[12px] mobile:items-start">
                <div className="flex items-start mobile:w-full translate-y-[-10px] mobile:translate-y-0">
                    <div className="w-[414px] text-[60px] tracking-[-1.2px] leading-[114%] font-[500] mobile:w-full mobile:text-[28px] mobile:leading-[34px]">
                        {content.articles.titlePrefix}
                        <span className="text-[#43AA8B] block">{content.articles.titleHighlight}</span>
                    </div>
                </div>
                <div className="flex flex-col justify-between mobile:w-full gap-y-[30px]">
                    <div className="max-w-full w-[479px] opacity-60 justify-start text-[#254441] text-[18px] font-medium leading-[144%] tracking-[-0.32px]">{content.articles.description}</div>
                    <a href="/pages/blog" className="w-max px-[22px] py-[12px] bg-[#43AA8B] rounded-[9px] shadow-[0px_0.6000000238418579px_1.2000000476837158px_0px_rgba(67,170,139,0.12)] shadow-[inset_0px_-0.6000000238418579px_0.9000000357627869px_0px_rgba(67,170,139,0.12)] inline-flex justify-center items-center gap-2.5 cursor-pointer transition-colors duration-200 hover:bg-[#3A9278]">
                        <div className="text-center text-[#F7F7F7] text-[15px] font-medium leading-[106%] tracking-[-0.3px]">{content.articles.buttonLabel}</div>
                    </a>
                    {/* <div className="flex">
                        <img src="/img/icon3.svg" className="size-[15px] mobile:size-[12px]" alt="" />
                        <div className="text-[#160704] font-medium ml-[9px] opacity-60 text-[12px] tracking-[0.72px] mobile:text-[11px] mobile:ml-[6px]">
                            UPCOMING EVENTS
                        </div>
                    </div> */}
                </div>
            </div>
            {displayedArticles.length ? (
                <div ref={cardsRef} className="flex justify-between mt-[75px] mobile:flex-col gap-[15px] mobile:gap-[39px] mobile:mt-[24px]">
                    {displayedArticles.map(renderCard)}
                </div>
            ) : null}

            {gridTopArticles.length ? (
                <div ref={gridTopRef} className="flex justify-between mt-[95px] mobile:flex-col gap-[15px] mobile:gap-[39px] mobile:mt-[24px]">
                    {gridTopArticles.map(renderCard)}
                </div>
            ) : null}

            {!displayedArticles.length && !gridTopArticles.length ? (
                <div ref={cardsRef} className="mt-[65px] mobile:mt-[24px]">
                    {renderFallback()}
                </div>
            ) : null}

            <a href="/pages/blog" className="pt-[15px] group mx-auto my-[68px] w-max px-[20px] pb-[12px] rounded-[9px] shadow-[0px_0.6000000238418579px_1.2000000476837158px_0px_rgba(67,170,139,0.12)] shadow-[inset_0px_-0.6000000238418579px_0.9000000357627869px_0px_rgba(67,170,139,0.12)] border border-1 border-solid border-[#43AA8B] flex justify-center items-center gap-2.5 cursor-pointer transition-colors duration-200 hover:bg-[#3A9278]">
                <div className="text-center text-[#43AA8B] tracking-[-0.3px] text-[15px] font-medium leading-[106%] group-hover:text-[#F7F7F7]">{content.articles.moreLabel}</div>
            </a>
        </div>
    );
};

export default Unit5;
